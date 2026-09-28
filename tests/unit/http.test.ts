import { afterEach, expect, it, vi } from 'vitest';
import { z } from 'zod';
import { assertSameOrigin, readJson } from '@/lib/http';
afterEach(() => vi.unstubAllEnvs());
const schema = z.object({ text: z.string() }).strict();
function request(body: string, headers: Record<string, string> = {}) {
  return new Request('http://localhost:3000/api/test', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body,
  });
}
it('rejects malformed JSON and mismatched schemas', async () => {
  await expect(readJson(request('{'), schema)).rejects.toMatchObject({
    status: 400,
    code: 'INVALID_JSON',
  });
  await expect(readJson(request('{"text":42}'), schema)).rejects.toMatchObject({ status: 400 });
});
it('enforces byte limits without trusting content length', async () => {
  await expect(
    readJson(
      request(JSON.stringify({ text: 'a'.repeat(100) }), { 'Content-Length': '1' }),
      schema,
      30,
    ),
  ).rejects.toMatchObject({ status: 413 });
  await expect(readJson(request('{"text":"ok"}'), schema)).resolves.toEqual({ text: 'ok' });
});
it('requires JSON content', async () =>
  await expect(
    readJson(request('{}', { 'Content-Type': 'text/plain' }), schema),
  ).rejects.toMatchObject({ status: 415 }));
it('requires the configured origin for mutations', () => {
  vi.stubEnv('SITE_URL', 'https://credify.example');
  expect(() => assertSameOrigin(request('{}', { Origin: 'https://attacker.example' }))).toThrow();
  expect(() => assertSameOrigin(request('{}'))).toThrow();
  expect(() =>
    assertSameOrigin(request('{}', { Origin: 'https://credify.example' })),
  ).not.toThrow();
});
