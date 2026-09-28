import 'server-only';
import type { AuthError } from '@supabase/supabase-js';
import { ApiError } from '@/lib/http';

/** An upstream outage is not an incorrect password or an expired user session. */
export function throwForAuthServiceError(error: AuthError | null): void {
  if (!error) return;
  if (error.status === 429)
    throw new ApiError(
      429,
      'AUTH_RATE_LIMITED',
      'Too many account requests. Please try again later.',
    );
  if (error.status === 0 || (error.status ?? 0) >= 500 || error.name === 'AuthRetryableFetchError')
    throw new ApiError(
      503,
      'ACCOUNTS_UNAVAILABLE',
      'Account services could not respond. Please try again later.',
    );
}
