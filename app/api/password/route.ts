import { z } from 'zod';
import { apiError, assertSameOrigin, json, readJson, ApiError } from '@/lib/http';
import { passwordSchema } from '@/lib/auth-schemas';
import { requireUser } from '@/lib/supabase/server';
import { limitAuth } from '@/lib/rate-limit';
import { cookies } from 'next/headers';
import { verifyRecoveryProof } from '@/lib/auth/recovery-proof';
import { throwForAuthServiceError } from '@/lib/auth/errors';

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const { client, user } = await requireUser();
    const { password, currentPassword } = await readJson(
      request,
      z
        .object({ password: passwordSchema, currentPassword: z.string().max(128).optional() })
        .strict(),
    );
    if (!user.email)
      throw new ApiError(401, 'UNAUTHENTICATED', 'Sign in with your email to continue.');
    await limitAuth(user.email, 'password');
    const store = await cookies();
    // Recovery permission is set only by the verified recovery callback and bound to this user.
    const {
      data: { session },
    } = await client.auth.getSession();
    const recovery = verifyRecoveryProof(
      store.get('credify-recovery')?.value,
      user.id,
      session?.access_token || '',
      process.env.AUTH_COOKIE_SECRET || '',
    );
    if (!recovery) {
      if (!currentPassword)
        throw new ApiError(400, 'PASSWORD_REQUIRED', 'Enter your current password.');
      const { error } = await client.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });
      throwForAuthServiceError(error);
      if (error)
        throw new ApiError(401, 'INVALID_CREDENTIALS', 'Your current password is incorrect.');
    }
    const { error } = await client.auth.updateUser({ password });
    throwForAuthServiceError(error);
    if (error)
      throw new ApiError(
        400,
        'PASSWORD_UPDATE_FAILED',
        'Your password could not be changed. Try a different password or request a new recovery link.',
      );
    store.delete('credify-recovery');
    await client.auth.signOut({ scope: 'others' });
    return json({ message: 'Your password has been changed.' });
  } catch (error) {
    return apiError(error);
  }
}
