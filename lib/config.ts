import 'server-only';

export interface Features {
  accounts: boolean;
  ai: boolean;
  registry: boolean;
}

/** Explicit opt-in prevents a paused backend or a developer's key from becoming a live service. */
export function getFeatures(): Features {
  const configured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
  const sharedLimits = Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
  );
  const accounts =
    process.env.CREDIFY_AUTH_ENABLED === 'true' &&
    configured &&
    (process.env.AUTH_COOKIE_SECRET?.length ?? 0) >= 32 &&
    (process.env.NODE_ENV !== 'production' || sharedLimits);
  return {
    accounts,
    ai:
      accounts &&
      process.env.CREDIFY_AI_ENABLED === 'true' &&
      Boolean(process.env.GEMINI_API_KEY) &&
      sharedLimits,
    registry: configured && process.env.CREDIFY_REGISTRY_ENABLED === 'true',
  };
}

export function getSiteUrl(): string {
  const url = new URL(process.env.SITE_URL || 'http://localhost:3000');
  if (!['http:', 'https:'].includes(url.protocol))
    throw new Error('SITE_URL must use HTTP or HTTPS.');
  if (
    process.env.NODE_ENV === 'production' &&
    url.protocol !== 'https:' &&
    !['localhost', '127.0.0.1'].includes(url.hostname)
  )
    throw new Error('A production SITE_URL must use HTTPS.');
  return url.origin;
}
