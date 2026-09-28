export class ApiRequestError extends Error {
  constructor(
    message: string,
    public status: number,
    public code: string,
  ) {
    super(message);
  }
}

/** The only JSON fetch wrapper used by interactive forms. HTTP errors never become success UI. */
export async function apiRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  });
  const body = await response.json().catch(() => null);
  if (!response.ok)
    throw new ApiRequestError(
      body?.error?.message || 'The service could not respond. Please try again.',
      response.status,
      body?.error?.code || 'UNKNOWN',
    );
  return body as T;
}
