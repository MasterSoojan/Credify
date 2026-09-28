import { createAuthClient } from '@/lib/supabase/server';
import { authRedirect } from '@/lib/auth/redirect';

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get('code');
  try {
    if (!code || code.length > 2048) throw new Error('Missing code.');
    const client = await createAuthClient();
    const { error } = await client.auth.exchangeCodeForSession(code);
    if (error) throw error;
    // A caller-controlled `next` parameter must never grant password-recovery permission.
    return authRedirect('/profile');
  } catch {
    return authRedirect('/login?notice=expired-link');
  }
}
