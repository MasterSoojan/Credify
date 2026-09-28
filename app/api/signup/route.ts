import { apiError, assertSameOrigin, json, readJson, ApiError } from '@/lib/http';
import { signupSchema } from '@/lib/auth-schemas';
import { createAuthClient } from '@/lib/supabase/server';
import { getSiteUrl } from '@/lib/config';
import { limitAuth } from '@/lib/rate-limit';
import { throwForAuthServiceError } from '@/lib/auth/errors';

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const input = await readJson(request, signupSchema);
    const client = await createAuthClient();
    await limitAuth(input.email, 'signup');
    const { error } = await client.auth.signUp({
      email: input.email,
      password: input.password,
      options: {
        data: { display_name: input.name },
        emailRedirectTo: `${getSiteUrl()}/auth/callback`,
      },
    });
    throwForAuthServiceError(error);
    if (error)
      throw new ApiError(
        400,
        'SIGNUP_FAILED',
        'We could not create an account. Check your details or try signing in.',
      );
    return json(
      {
        message:
          'Check your email to confirm your account. If you already have an account, sign in or reset your password.',
      },
      201,
    );
  } catch (error) {
    return apiError(error);
  }
}
