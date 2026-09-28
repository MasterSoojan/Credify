import 'server-only';
import { createHash } from 'node:crypto';
import { ApiError } from './http';

// A single Redis script checks all windows before incrementing any of them.
// No costly provider request starts unless both the user quota and global daily cap allow it.
const script = `
for i, key in ipairs(KEYS) do
  if tonumber(redis.call('GET', key) or '0') >= tonumber(ARGV[(i-1)*2+1]) then return 0 end
end
for i, key in ipairs(KEYS) do
  local n = redis.call('INCR', key)
  if n == 1 then redis.call('EXPIRE', key, ARGV[(i-1)*2+2]) end
end
return 1`;

type Limit = { key: string; maximum: number; seconds: number };
const localWindows = new Map<string, { count: number; expires: number }>();

export async function consumeLimits(limits: Limit[], requireShared = false): Promise<void> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    if (requireShared || process.env.NODE_ENV === 'production')
      throw new ApiError(
        503,
        'LIMITER_UNAVAILABLE',
        'This service is temporarily unavailable. Please try again later.',
      );
    // Development only. Bound the map so attacker-controlled inputs cannot grow it indefinitely.
    const now = Date.now();
    for (const [key, window] of localWindows) if (window.expires <= now) localWindows.delete(key);
    if (localWindows.size > 5000)
      throw new ApiError(429, 'RATE_LIMITED', 'Too many requests. Please try again later.');
    for (const limit of limits)
      if ((localWindows.get(limit.key)?.count ?? 0) >= limit.maximum)
        throw new ApiError(429, 'RATE_LIMITED', 'Too many requests. Please try again later.');
    for (const limit of limits) {
      const current = localWindows.get(limit.key);
      localWindows.set(limit.key, {
        count: (current?.count ?? 0) + 1,
        expires: current?.expires ?? now + limit.seconds * 1000,
      });
    }
    return;
  }
  try {
    const endpoint = new URL(url);
    if (endpoint.protocol !== 'https:') throw new Error('Invalid limiter endpoint.');
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([
        'EVAL',
        script,
        limits.length,
        ...limits.map((limit) => `credify:${limit.key}`),
        ...limits.flatMap((limit) => [limit.maximum, limit.seconds]),
      ]),
      signal: AbortSignal.timeout(3000),
      cache: 'no-store',
    });
    if (!response.ok) throw new Error('Limiter request failed.');
    const data: { result?: number; error?: string } = await response.json();
    if (data.error || (data.result !== 0 && data.result !== 1))
      throw new Error('Limiter response invalid.');
    if (data.result === 0)
      throw new ApiError(
        429,
        'RATE_LIMITED',
        'The request limit has been reached. Please try again later.',
      );
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(
      503,
      'LIMITER_UNAVAILABLE',
      'This service is temporarily unavailable. Please try again later.',
    );
  }
}

export function privateKey(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

export async function limitAuth(email: string, action: string): Promise<void> {
  await consumeLimits([
    { key: `auth:${action}:${privateKey(email)}`, maximum: 5, seconds: 900 },
    { key: 'auth:global', maximum: 200, seconds: 900 },
  ]);
}

export async function limitAi(userId: string): Promise<void> {
  const configuredCap = Number(process.env.CREDIFY_AI_DAILY_LIMIT || 100);
  if (!Number.isInteger(configuredCap) || configuredCap < 1 || configuredCap > 10_000)
    throw new ApiError(503, 'AI_UNAVAILABLE', 'AI analysis is temporarily unavailable.');
  await consumeLimits(
    [
      { key: `ai:${privateKey(userId)}`, maximum: 10, seconds: 3600 },
      {
        key: `ai:daily:${new Date().toISOString().slice(0, 10)}`,
        maximum: configuredCap,
        seconds: 86400,
      },
    ],
    true,
  );
}
