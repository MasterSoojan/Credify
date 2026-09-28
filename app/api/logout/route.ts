import { apiError, assertSameOrigin, json, ApiError } from '@/lib/http';
import { createAuthClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const client = await createAuthClient();
    const { error } = await client.auth.signOut();
    if (error)
      throw new ApiError(503, 'LOGOUT_FAILED', 'Sign-out could not complete. Please try again.');
    (await cookies()).delete('credify-recovery');
    return json({ message: 'Signed out.' });
  } catch (error) {
    return apiError(error);
  }
}
