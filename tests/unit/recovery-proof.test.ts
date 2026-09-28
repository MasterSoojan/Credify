import { expect, it } from 'vitest';
import { createRecoveryProof, verifyRecoveryProof } from '@/lib/auth/recovery-proof';
const secret = 'test-secret-with-at-least-thirty-two-characters';
it('binds a recovery grant to the user, session, signature, and expiry', () => {
  const proof = createRecoveryProof('alice', 'access-token-a', secret, 1000);
  expect(verifyRecoveryProof(proof, 'alice', 'access-token-a', secret, 2000)).toBe(true);
  expect(verifyRecoveryProof(proof, 'bob', 'access-token-a', secret, 2000)).toBe(false);
  expect(verifyRecoveryProof(proof, 'alice', 'access-token-b', secret, 2000)).toBe(false);
  expect(
    verifyRecoveryProof(
      proof,
      'alice',
      'access-token-a',
      'another-secret-with-at-least-thirty-two-characters',
      2000,
    ),
  ).toBe(false);
  expect(verifyRecoveryProof(proof, 'alice', 'access-token-a', secret, 901_000)).toBe(false);
});
it('rejects forged, malformed, and underspecified grants', () => {
  for (const proof of [undefined, 'alice', 'eyJ1c2VySWQiOiJhbGljZSJ9.forged', 'x'.repeat(1025)])
    expect(verifyRecoveryProof(proof, 'alice', 'token', secret)).toBe(false);
  expect(() => createRecoveryProof('alice', 'token', 'short')).toThrow();
});
