import { apiError, assertSameOrigin, json, readJson, ApiError } from '@/lib/http';
import { profileSchema } from '@/lib/auth-schemas';
import { requireUser } from '@/lib/supabase/server';

export async function GET() {
  try {
    const { client, user } = await requireUser();
    const { data, error } = await client
      .from('users_custom')
      .select('display_name,occupation,location,email,user_id')
      .eq('id', user.id)
      .single();
    if (error || !data)
      throw new ApiError(
        503,
        'PROFILE_UNAVAILABLE',
        'Your profile could not be loaded. Please try again later.',
      );
    return json({ profile: data });
  } catch (error) {
    return apiError(error);
  }
}
export async function PATCH(request: Request) {
  try {
    assertSameOrigin(request);
    const { client, user } = await requireUser();
    const input = await readJson(request, profileSchema);
    const { data, error } = await client
      .from('users_custom')
      .update(input)
      .eq('id', user.id)
      .select('id')
      .single();
    if (error || !data)
      throw new ApiError(
        503,
        'PROFILE_UPDATE_FAILED',
        'Your changes could not be saved. Please try again.',
      );
    return json({ message: 'Profile updated.' });
  } catch (error) {
    return apiError(error);
  }
}
