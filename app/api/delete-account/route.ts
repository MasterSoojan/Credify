import { z } from 'zod';
import { apiError, assertSameOrigin, json, readJson, ApiError } from '@/lib/http';
import { requireUser, createAdminClient } from '@/lib/supabase/server';
import { limitAuth } from '@/lib/rate-limit';
import { cookies } from 'next/headers';
import { throwForAuthServiceError } from '@/lib/auth/errors';

export async function DELETE(request: Request) {
  try {
    assertSameOrigin(request);
    const { client, user } = await requireUser();
    const { password, confirmation } = await readJson(
      request,
      z
        .object({ password: z.string().min(1).max(128), confirmation: z.literal('DELETE') })
        .strict(),
    );
    if (!user.email || confirmation !== 'DELETE')
      throw new ApiError(400, 'INVALID_INPUT', 'Confirm deletion to continue.');
    await limitAuth(user.email, 'delete');
    const { error: passwordError } = await client.auth.signInWithPassword({
      email: user.email,
      password,
    });
    throwForAuthServiceError(passwordError);
    if (passwordError)
      throw new ApiError(401, 'INVALID_CREDENTIALS', 'Your password is incorrect.');
    // The target comes from verified Auth, never from user-supplied email/id fields.
    const { error } = await createAdminClient().auth.admin.deleteUser(user.id);
    if (error)
      throw new ApiError(
        503,
        'DELETION_FAILED',
        'Your account could not be deleted. Please try again later.',
      );
    await client.auth.signOut({ scope: 'local' });
    (await cookies()).delete('credify-recovery');
    return json({ message: 'Your account and profile have been deleted.' });
  } catch (error) {
    return apiError(error);
  }
}
