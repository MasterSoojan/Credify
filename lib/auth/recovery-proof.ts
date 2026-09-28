import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

/** A recovery callback grants a short-lived capability, bound to the verified user and session. */
export function createRecoveryProof(
  userId: string,
  accessToken: string,
  secret: string,
  now = Date.now(),
): string {
  if (secret.length < 32) throw new Error('AUTH_COOKIE_SECRET must have at least 32 characters.');
  const payload = Buffer.from(
    JSON.stringify({
      userId,
      session: createHash('sha256').update(accessToken).digest('hex'),
      expires: now + 15 * 60_000,
    }),
  ).toString('base64url');
  return `${payload}.${createHmac('sha256', secret).update(payload).digest('base64url')}`;
}

export function verifyRecoveryProof(
  proof: string | undefined,
  userId: string,
  accessToken: string,
  secret: string,
  now = Date.now(),
): boolean {
  if (!proof || secret.length < 32 || proof.length > 1024) return false;
  try {
    const [payload, signature, extra] = proof.split('.');
    if (!payload || !signature || extra) return false;
    const expected = createHmac('sha256', secret).update(payload).digest();
    const actual = Buffer.from(signature, 'base64url');
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return false;
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return (
      data.userId === userId &&
      data.session === createHash('sha256').update(accessToken).digest('hex') &&
      typeof data.expires === 'number' &&
      data.expires > now
    );
  } catch {
    return false;
  }
}
