import { NextResponse } from 'next/server';
import { z } from 'zod';

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
  ) {
    super(message);
  }
}

/** Consume a bounded stream: Content-Length alone is optional and can be dishonest. */
export async function readJson<T>(
  request: Request,
  schema: z.ZodType<T>,
  maxBytes = 16_384,
): Promise<T> {
  if (!request.headers.get('content-type')?.toLowerCase().includes('application/json'))
    throw new ApiError(415, 'UNSUPPORTED_CONTENT', 'Send JSON content.');
  if (Number(request.headers.get('content-length')) > maxBytes)
    throw new ApiError(413, 'TOO_LARGE', 'This request is too large.');
  if (!request.body) throw new ApiError(400, 'INVALID_INPUT', 'The request is empty.');
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        await reader.cancel();
        throw new ApiError(413, 'TOO_LARGE', 'This request is too large.');
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  let input: unknown;
  try {
    input = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    throw new ApiError(400, 'INVALID_JSON', 'The request contains invalid JSON.');
  }
  const parsed = schema.safeParse(input);
  if (!parsed.success)
    throw new ApiError(
      400,
      'INVALID_INPUT',
      parsed.error.issues[0]?.message ?? 'Check the information you entered.',
    );
  return parsed.data;
}

/** Require an explicit same-origin browser mutation; curl/tests must also supply Origin. */
export function assertSameOrigin(request: Request): void {
  const expected = process.env.SITE_URL || new URL(request.url).origin;
  let origin: string;
  try {
    origin = new URL(expected).origin;
  } catch {
    throw new ApiError(503, 'CONFIGURATION', 'This service is temporarily unavailable.');
  }
  if (request.headers.get('origin') !== origin)
    throw new ApiError(
      403,
      'INVALID_ORIGIN',
      'This request could not be verified. Refresh the page and try again.',
    );
}

export function json(data: unknown, status = 200): NextResponse {
  return NextResponse.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
}

export function apiError(error: unknown): NextResponse {
  if (error instanceof ApiError)
    return json({ error: { code: error.code, message: error.message } }, error.status);
  // Never log raw provider errors: they can contain the submitted text, URLs, or credentials.
  console.error(
    JSON.stringify({
      event: 'unexpected_api_error',
      errorType: error instanceof Error ? error.name : 'unknown',
    }),
  );
  return json(
    { error: { code: 'INTERNAL_ERROR', message: 'Something went wrong. Please try again.' } },
    500,
  );
}
