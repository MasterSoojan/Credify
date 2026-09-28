import { afterEach, beforeEach, expect, it, vi } from 'vitest';
const mocks = vi.hoisted(() => ({
  auth: {
    signInWithPassword: vi.fn(),
    signUp: vi.fn(),
    resetPasswordForEmail: vi.fn(),
    updateUser: vi.fn(),
    signOut: vi.fn(),
    getSession: vi.fn(),
  },
  requireUser: vi.fn(),
  client: vi.fn(),
  quota: vi.fn(),
  deleteUser: vi.fn(),
  cookies: { get: vi.fn(), delete: vi.fn() },
}));
vi.mock('@/lib/supabase/server', () => ({
  createAuthClient: mocks.client,
  requireUser: mocks.requireUser,
  createAdminClient: () => ({ auth: { admin: { deleteUser: mocks.deleteUser } } }),
}));
vi.mock('@/lib/rate-limit', () => ({ limitAuth: mocks.quota }));
vi.mock('next/headers', () => ({ cookies: async () => mocks.cookies }));
import { POST as login } from '@/app/api/login/route';
import { POST as signup } from '@/app/api/signup/route';
import { POST as reset } from '@/app/api/reset-password/route';
import { POST as logout } from '@/app/api/logout/route';
import { POST as password } from '@/app/api/password/route';
import { DELETE as deleteAccount } from '@/app/api/delete-account/route';
import { ApiError } from '@/lib/http';
import { createRecoveryProof } from '@/lib/auth/recovery-proof';
const secret = 'test-secret-with-at-least-thirty-two-characters';
function request(body: unknown, method = 'POST') {
  return new Request('http://localhost:3000/api/account', {
    method,
    headers: { Origin: 'http://localhost:3000', 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}
beforeEach(() => {
  vi.stubEnv('SITE_URL', 'http://localhost:3000');
  vi.stubEnv('AUTH_COOKIE_SECRET', secret);
  for (const action of Object.values(mocks.auth)) action.mockResolvedValue({ error: null });
  mocks.auth.getSession.mockResolvedValue({
    data: { session: { access_token: 'verified-session' } },
  });
  mocks.client.mockResolvedValue({ auth: mocks.auth });
  mocks.requireUser.mockResolvedValue({
    client: { auth: mocks.auth },
    user: { id: 'actual-user', email: 'alice@example.com' },
  });
  mocks.quota.mockResolvedValue(undefined);
  mocks.deleteUser.mockResolvedValue({ error: null });
  mocks.cookies.get.mockReturnValue(undefined);
});
afterEach(() => vi.unstubAllEnvs());

it('passes the original password to Auth without trimming it or returning tokens', async () => {
  const response = await login(
    request({ email: 'Alice@example.com', password: '  correct password  ' }),
  );
  expect(response.status).toBe(200);
  expect(mocks.auth.signInWithPassword).toHaveBeenCalledWith({
    email: 'alice@example.com',
    password: '  correct password  ',
  });
  expect(await response.json()).toEqual({ message: 'Signed in successfully.' });
});
it('does not report a successful login when Auth rejects it', async () => {
  mocks.auth.signInWithPassword.mockResolvedValueOnce({
    error: { message: 'sensitive internal error' },
  });
  const response = await login(request({ email: 'a@example.com', password: 'wrong' }));
  expect(response.status).toBe(401);
  expect(JSON.stringify(await response.json())).not.toContain('sensitive');
});
it.each([
  [{ name: 'AuthRetryableFetchError', status: 0 }, 503],
  [{ name: 'AuthApiError', status: 503 }, 503],
  [{ name: 'AuthApiError', status: 429 }, 429],
])('distinguishes provider failure from incorrect credentials', async (error, status) => {
  mocks.auth.signInWithPassword.mockResolvedValueOnce({ error });
  expect((await login(request({ email: 'alice@example.com', password: 'correct' }))).status).toBe(
    status,
  );
});
it('uses Auth signup with name metadata and returns a confirmation step', async () => {
  const response = await signup(
    request({ email: 'alice@example.com', password: 'a-long-password', name: 'Alice' }),
  );
  expect(response.status).toBe(201);
  expect(mocks.auth.signUp).toHaveBeenCalledWith(
    expect.objectContaining({
      options: {
        data: { display_name: 'Alice' },
        emailRedirectTo: 'http://localhost:3000/auth/callback',
      },
    }),
  );
  expect((await response.json()).message).toContain('confirm');
});
it('rejects weak signup passwords before calling Auth', async () => {
  expect(
    (await signup(request({ email: 'a@example.com', password: 'short', name: 'A' }))).status,
  ).toBe(400);
  expect(mocks.auth.signUp).not.toHaveBeenCalled();
});
it('keeps reset requests distinct from password changes', async () => {
  expect(
    (await reset(request({ email: 'alice@example.com', newPassword: 'not-accepted-here' }))).status,
  ).toBe(400);
  expect((await reset(request({ email: 'alice@example.com' }))).status).toBe(200);
  expect(mocks.auth.resetPasswordForEmail).toHaveBeenCalledWith('alice@example.com', {
    redirectTo: 'http://localhost:3000/reset-password/update',
  });
  expect(mocks.auth.updateUser).not.toHaveBeenCalled();
});
it('requires current credentials for a normal password change', async () => {
  expect((await password(request({ password: 'a-new-long-password' }))).status).toBe(400);
  expect(mocks.auth.updateUser).not.toHaveBeenCalled();
  expect(
    (await password(request({ currentPassword: 'old', password: 'a-new-long-password' }))).status,
  ).toBe(200);
  expect(mocks.auth.updateUser).toHaveBeenCalledWith({ password: 'a-new-long-password' });
  expect(mocks.cookies.delete).toHaveBeenCalledWith('credify-recovery');
});
it('does not update a password if reauthentication fails', async () => {
  mocks.auth.signInWithPassword.mockResolvedValueOnce({ error: {} });
  expect(
    (await password(request({ currentPassword: 'wrong', password: 'a-new-long-password' }))).status,
  ).toBe(401);
  expect(mocks.auth.updateUser).not.toHaveBeenCalled();
});
it('accepts only a signed session-bound recovery proof', async () => {
  mocks.cookies.get.mockReturnValue({ value: 'actual-user' });
  expect((await password(request({ password: 'a-new-long-password' }))).status).toBe(400);
  mocks.cookies.get.mockReturnValue({
    value: createRecoveryProof('actual-user', 'verified-session', secret),
  });
  expect((await password(request({ password: 'a-new-long-password' }))).status).toBe(200);
  expect(mocks.auth.signInWithPassword).not.toHaveBeenCalled();
});
it('requires a verified user before changing or deleting an account', async () => {
  mocks.requireUser.mockRejectedValue(new ApiError(401, 'UNAUTHENTICATED', 'Sign in.'));
  expect(
    (await password(request({ currentPassword: 'old', password: 'a-new-long-password' }))).status,
  ).toBe(401);
  expect(
    (await deleteAccount(request({ password: 'old', confirmation: 'DELETE' }, 'DELETE'))).status,
  ).toBe(401);
  expect(mocks.deleteUser).not.toHaveBeenCalled();
});
it('rejects caller-supplied deletion targets and deletes only the verified user', async () => {
  expect(
    (
      await deleteAccount(
        request({ password: 'old', confirmation: 'DELETE', userId: 'victim' }, 'DELETE'),
      )
    ).status,
  ).toBe(400);
  expect(mocks.deleteUser).not.toHaveBeenCalled();
  expect(
    (await deleteAccount(request({ password: 'old', confirmation: 'DELETE' }, 'DELETE'))).status,
  ).toBe(200);
  expect(mocks.deleteUser).toHaveBeenCalledExactlyOnceWith('actual-user');
});
it('never claims deletion succeeded after an admin failure', async () => {
  mocks.deleteUser.mockResolvedValueOnce({ error: { message: 'provider detail' } });
  expect(
    (await deleteAccount(request({ password: 'old', confirmation: 'DELETE' }, 'DELETE'))).status,
  ).toBe(503);
  expect(mocks.auth.signOut).not.toHaveBeenCalled();
});
it('clears recovery permission when signing out', async () => {
  expect((await logout(request({}))).status).toBe(200);
  expect(mocks.cookies.delete).toHaveBeenCalledWith('credify-recovery');
});
