import { z } from 'zod';
import { apiError, assertSameOrigin, json, readJson, ApiError } from '@/lib/http';
import { emailSchema } from '@/lib/auth-schemas';
import { createAuthClient } from '@/lib/supabase/server';
import { getSiteUrl } from '@/lib/config';
import { limitAuth } from '@/lib/rate-limit';

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const { email } = await readJson(request, z.object({ email: emailSchema }).strict());
    const client = await createAuthClient();
    await limitAuth(email, 'recovery');
    const { error } = await client.auth.resetPasswordForEmail(email, {
      redirectTo: `${getSiteUrl()}/reset-password/update`,
    });
    if (error)
      throw new ApiError(
        503,
        'RECOVERY_UNAVAILABLE',
        'We could not send a recovery email. Please try again later.',
      );
    return json({
      message: 'If an account exists, a password reset link has been sent to its email address.',
    });
  } catch (error) {
    return apiError(error);
  }
}
