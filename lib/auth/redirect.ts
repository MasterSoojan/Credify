import 'server-only';
import { NextResponse } from 'next/server';
import { getSiteUrl } from '@/lib/config';

/** Auth links contain one-time credentials; neither success nor failure may cache or refer them. */
export function authRedirect(
  path: '/profile' | '/reset-password/update' | '/login?notice=expired-link',
) {
  const response = NextResponse.redirect(new URL(path, getSiteUrl()));
  response.headers.set('Cache-Control', 'no-store');
  response.headers.set('Referrer-Policy', 'no-referrer');
  return response;
}
