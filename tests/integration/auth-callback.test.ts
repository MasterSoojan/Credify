import { afterEach, beforeEach, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  verifyOtp: vi.fn(),
  exchangeCodeForSession: vi.fn(),
  set: vi.fn(),
}));
vi.mock('@/lib/supabase/server', () => ({
  createAuthClient: async () => ({ auth: mocks }),
}));
vi.mock('next/headers', () => ({ cookies: async () => mocks }));
import { GET as confirm } from '@/app/auth/confirm/route';
import { GET as callback } from '@/app/auth/callback/route';
import { verifyRecoveryProof } from '@/lib/auth/recovery-proof';

const secret = 'callback-test-secret-with-at-least-32-characters';
beforeEach(() => {
  vi.stubEnv('SITE_URL', 'http://localhost:3000');
  vi.stubEnv('AUTH_COOKIE_SECRET', secret);
  mocks.verifyOtp.mockResolvedValue({
    data: { user: { id: 'alice' }, session: { access_token: 'session' } },
    error: null,
  });
  mocks.exchangeCodeForSession.mockResolvedValue({ error: null });
});
afterEach(() => vi.unstubAllEnvs());

it('issues recovery permission only after a verified recovery token', async () => {
  const response = await confirm(
    new Request('http://localhost:3000/auth/confirm?token_hash=token&type=recovery'),
  );
  expect(response.headers.get('location')).toBe('http://localhost:3000/reset-password/update');
  expect(mocks.verifyOtp).toHaveBeenCalledExactlyOnceWith({
    token_hash: 'token',
    type: 'recovery',
  });
  const [name, proof, options] = mocks.set.mock.calls[0];
  expect(name).toBe('credify-recovery');
  expect(verifyRecoveryProof(proof, 'alice', 'session', secret)).toBe(true);
  expect(options).toMatchObject({ httpOnly: true, sameSite: 'lax', maxAge: 900 });
  expect(response.headers.get('cache-control')).toBe('no-store');
  expect(response.headers.get('referrer-policy')).toBe('no-referrer');
});
it('keeps confirmation and normal callbacks separate from recovery', async () => {
  const signup = await confirm(
    new Request('http://localhost:3000/auth/confirm?token_hash=token&type=signup'),
  );
  const normal = await callback(
    new Request('http://localhost:3000/auth/callback?code=code&next=/reset-password/update'),
  );
  expect(signup.headers.get('location')).toBe('http://localhost:3000/profile');
  expect(normal.headers.get('location')).toBe('http://localhost:3000/profile');
  expect(mocks.set).not.toHaveBeenCalled();
});
it('does not grant permission for failed verification or cache the failure redirect', async () => {
  mocks.verifyOtp.mockResolvedValueOnce({ data: {}, error: {} });
  const response = await confirm(
    new Request('http://localhost:3000/auth/confirm?token_hash=used&type=recovery'),
  );
  expect(response.headers.get('location')).toBe('http://localhost:3000/login?notice=expired-link');
  expect(mocks.set).not.toHaveBeenCalled();
  expect(response.headers.get('cache-control')).toBe('no-store');
  expect(response.headers.get('referrer-policy')).toBe('no-referrer');
});
it('rejects unrelated token types before contacting Auth', async () => {
  await confirm(new Request('http://localhost:3000/auth/confirm?token_hash=token&type=invite'));
  expect(mocks.verifyOtp).not.toHaveBeenCalled();
  expect(mocks.set).not.toHaveBeenCalled();
});
