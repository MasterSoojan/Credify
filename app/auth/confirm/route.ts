import { cookies } from 'next/headers';
import { createAuthClient } from '@/lib/supabase/server';
import { authRedirect } from '@/lib/auth/redirect';
import { createRecoveryProof } from '@/lib/auth/recovery-proof';

/** Used by the explicitly configured Supabase confirmation/recovery email templates. */
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const tokenHash = params.get('token_hash');
  const type = params.get('type');
  try {
    if (!tokenHash || tokenHash.length > 256 || (type !== 'signup' && type !== 'recovery'))
      throw new Error('Invalid confirmation link.');
    const client = await createAuthClient();
    const { data, error } = await client.auth.verifyOtp({ token_hash: tokenHash, type });
    if (error || !data.user || !data.session) throw new Error('Expired confirmation link.');
    if (type === 'recovery') {
      const proof = createRecoveryProof(
        data.user.id,
        data.session.access_token,
        process.env.AUTH_COOKIE_SECRET || '',
      );
      (await cookies()).set('credify-recovery', proof, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 900,
      });
    }
    return authRedirect(type === 'recovery' ? '/reset-password/update' : '/profile');
  } catch {
    return authRedirect('/login?notice=expired-link');
  }
}
