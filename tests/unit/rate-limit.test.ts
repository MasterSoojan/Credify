import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { consumeLimits, limitAi } from '@/lib/rate-limit';
beforeEach(() => {
  vi.stubEnv('UPSTASH_REDIS_REST_URL', '');
  vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', '');
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});
it('fails closed for production without shared limits', async () => {
  vi.stubEnv('NODE_ENV', 'production');
  await expect(consumeLimits([{ key: 'test', maximum: 1, seconds: 30 }])).rejects.toMatchObject({
    status: 503,
  });
});
it('never permits paid AI through the development-only fallback', async () => {
  vi.stubEnv('NODE_ENV', 'development');
  await expect(limitAi('user')).rejects.toMatchObject({ status: 503 });
});
it('enforces all development windows before incrementing any', async () => {
  vi.stubEnv('NODE_ENV', 'development');
  const limits = [{ key: `test-${crypto.randomUUID()}`, maximum: 1, seconds: 60 }];
  await expect(consumeLimits(limits)).resolves.toBeUndefined();
  await expect(consumeLimits(limits)).rejects.toMatchObject({ status: 429 });
});
it.each([0, 1, 'invalid'])('validates Redis quota result %s', async (result) => {
  vi.stubEnv('UPSTASH_REDIS_REST_URL', 'https://limiter.example');
  vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', 'test-token');
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue(new Response(JSON.stringify({ result }), { status: 200 })),
  );
  const call = consumeLimits([{ key: 'test', maximum: 1, seconds: 30 }], true);
  if (result === 1) await expect(call).resolves.toBeUndefined();
  else await expect(call).rejects.toMatchObject({ status: result === 0 ? 429 : 503 });
});
it('treats an unavailable limiter as unavailable, not unlimited', async () => {
  vi.stubEnv('UPSTASH_REDIS_REST_URL', 'https://limiter.example');
  vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', 'test-token');
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
  await expect(limitAi('user')).rejects.toMatchObject({ status: 503 });
});
