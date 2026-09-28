import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
const dependencies = vi.hoisted(() => ({ review: vi.fn(), auth: vi.fn(), quota: vi.fn() }));
vi.mock('@/lib/verification/gemini', () => ({ reviewWithGemini: dependencies.review }));
vi.mock('@/lib/supabase/server', () => ({ requireUser: dependencies.auth }));
vi.mock('@/lib/rate-limit', () => ({ limitAi: dependencies.quota }));
import { POST } from '@/app/api/verify/route';
import { ApiError } from '@/lib/http';

beforeEach(() => {
  vi.stubEnv('SITE_URL', 'http://localhost:3000');
  vi.stubEnv('CREDIFY_AI_ENABLED', 'false');
  dependencies.auth.mockResolvedValue({ user: { id: 'test-user' } });
  dependencies.quota.mockResolvedValue(undefined);
});
afterEach(() => vi.unstubAllEnvs());
function request(body: unknown, origin = 'http://localhost:3000') {
  return new Request('http://localhost:3000/api/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: origin },
    body: JSON.stringify(body),
  });
}
function enableAi() {
  for (const [key, value] of Object.entries({
    CREDIFY_AI_ENABLED: 'true',
    CREDIFY_AUTH_ENABLED: 'true',
    NEXT_PUBLIC_SUPABASE_URL: 'https://test.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'test-key',
    GEMINI_API_KEY: 'test-key',
    UPSTASH_REDIS_REST_URL: 'https://test.redis.example',
    UPSTASH_REDIS_REST_TOKEN: 'test-token',
    AUTH_COOKIE_SECRET: 'test-secret-at-least-thirty-two-characters',
  }))
    vi.stubEnv(key, value);
}

describe('verification HTTP contract', () => {
  it('returns local findings without any provider call', async () => {
    const response = await POST(
      request({ type: 'text', text: 'Please pay a registration fee to secure your new position.' }),
    );
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({
      status: 'attention',
      source: 'local',
      type: 'text',
    });
    expect(dependencies.review).not.toHaveBeenCalled();
    expect(response.headers.get('cache-control')).toBe('no-store');
  });
  it('rejects invalid mode and cross-origin requests before any provider call', async () => {
    expect((await POST(request({ type: 'unsupported' }))).status).toBe(400);
    expect(
      (await POST(request({ type: 'email', email: 'a@example.com' }, 'https://attacker.example')))
        .status,
    ).toBe(403);
    expect(dependencies.review).not.toHaveBeenCalled();
  });
  it('returns unavailable for disabled AI without inventing a score', async () => {
    const response = await POST(
      request({
        type: 'text',
        text: 'Please review this job offer for the new marketing role.',
        useAi: true,
      }),
    );
    expect(response.status).toBe(503);
    expect(await response.json()).not.toHaveProperty('trustScore');
    expect(dependencies.auth).not.toHaveBeenCalled();
  });
  it('requires authentication and a quota before using AI', async () => {
    enableAi();
    dependencies.auth.mockRejectedValueOnce(new ApiError(401, 'UNAUTHENTICATED', 'Sign in.'));
    expect(
      (
        await POST(
          request({
            type: 'text',
            text: 'Please review this job offer for the new marketing role.',
            useAi: true,
          }),
        )
      ).status,
    ).toBe(401);
    expect(dependencies.review).not.toHaveBeenCalled();
    dependencies.quota.mockRejectedValueOnce(new ApiError(429, 'RATE_LIMITED', 'Limit reached.'));
    expect(
      (
        await POST(
          request({
            type: 'text',
            text: 'Please review this job offer for the new marketing role.',
            useAi: true,
          }),
        )
      ).status,
    ).toBe(429);
    expect(dependencies.review).not.toHaveBeenCalled();
  });
  it('preserves a failed provider call as a failure', async () => {
    enableAi();
    dependencies.review.mockRejectedValueOnce(
      new ApiError(502, 'ANALYSIS_UNAVAILABLE', 'Unavailable.'),
    );
    const response = await POST(
      request({
        type: 'text',
        text: 'Please review this job offer for the new marketing role.',
        useAi: true,
      }),
    );
    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({
      error: { code: 'ANALYSIS_UNAVAILABLE', message: 'Unavailable.' },
    });
  });
});
