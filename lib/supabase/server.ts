import 'server-only';
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { getFeatures } from '@/lib/config';
import { ApiError } from '@/lib/http';
import { throwForAuthServiceError } from '@/lib/auth/errors';

const boundedFetch: typeof fetch = (input, init) =>
  fetch(input, {
    ...init,
    signal: init?.signal
      ? AbortSignal.any([init.signal, AbortSignal.timeout(8000)])
      : AbortSignal.timeout(8000),
  });

/** One client per request. Only Route Handlers call this factory, so refreshed cookies are writable. */
export async function createAuthClient() {
  if (!getFeatures().accounts)
    throw new ApiError(
      503,
      'ACCOUNTS_UNAVAILABLE',
      'Account services are temporarily unavailable. You can still use the basic offer checks.',
    );
  const store = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      },
      cookies: {
        getAll: () => store.getAll(),
        setAll: (updates) => {
          for (const { name, value, options } of updates) store.set(name, value, options);
        },
      },
      global: { fetch: boundedFetch },
    },
  );
}

export async function requireUser() {
  const client = await createAuthClient();
  // getUser contacts Auth and checks the current user instead of trusting a browser value.
  // Session revocation still follows the provider's JWT lifetime semantics; see SECURITY.md.
  const {
    data: { user },
    error,
  } = await client.auth.getUser();
  throwForAuthServiceError(error);
  if (error || !user) throw new ApiError(401, 'UNAUTHENTICATED', 'Please sign in to continue.');
  return { client, user };
}

/** Privileged client is deliberately separate and used only after ownership + password verification. */
export function createAdminClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY)
    throw new ApiError(
      503,
      'DELETION_UNAVAILABLE',
      'Account deletion is temporarily unavailable. Please try again later.',
    );
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: boundedFetch } },
  );
}
