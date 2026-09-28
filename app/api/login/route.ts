import { apiError, assertSameOrigin, json, readJson, ApiError } from '@/lib/http';
import { loginSchema } from '@/lib/auth-schemas';
import { createAuthClient } from '@/lib/supabase/server';
import { limitAuth } from '@/lib/rate-limit';
import { throwForAuthServiceError } from '@/lib/auth/errors';

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const input = await readJson(request, loginSchema);
    const client = await createAuthClient();
    await limitAuth(input.email, 'login');
    const { error } = await client.auth.signInWithPassword(input);
    throwForAuthServiceError(error);
    if (error)
      throw new ApiError(
        401,
        'INVALID_CREDENTIALS',
        'Sign-in failed. Check your email, password, and email confirmation.',
      );
    return json({ message: 'Signed in successfully.' });
  } catch (error) {
    return apiError(error);
  }
}
