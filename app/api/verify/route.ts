import { apiError, assertSameOrigin, json, readJson, ApiError } from '@/lib/http';
import { REVIEW_VERSION, scanInputSchema } from '@/lib/verification/contracts';
import { reviewLocally } from '@/lib/verification/local';
import { validateDocument } from '@/lib/verification/file';
import { reviewWithGemini } from '@/lib/verification/gemini';
import { getFeatures } from '@/lib/config';
import { requireUser } from '@/lib/supabase/server';
import { limitAi } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const maxDuration = 45;

export async function POST(request: Request) {
  const id = crypto.randomUUID();
  const started = Date.now();
  try {
    assertSameOrigin(request);
    const input = await readJson(request, scanInputSchema, 3 * 1024 * 1024);
    const usesAi = input.type === 'document' || (input.type === 'text' && input.useAi);
    if (input.type === 'document') {
      try {
        validateDocument(input);
      } catch (error) {
        throw new ApiError(
          400,
          'INVALID_FILE',
          error instanceof Error ? error.message : 'Choose a supported document.',
        );
      }
    }
    let assessment;
    if (usesAi && (input.type === 'text' || input.type === 'document')) {
      if (!getFeatures().ai)
        throw new ApiError(
          503,
          'AI_UNAVAILABLE',
          'AI analysis is temporarily unavailable. Basic text, email, and link checks are still available.',
        );
      const { user } = await requireUser();
      await limitAi(user.id);
      assessment = await reviewWithGemini(input, request.signal);
    } else {
      try {
        assessment = reviewLocally(input);
      } catch (error) {
        throw new ApiError(
          400,
          'INVALID_INPUT',
          error instanceof Error ? error.message : 'Check your input.',
        );
      }
    }
    console.info(
      JSON.stringify({
        event: 'scan_completed',
        id,
        type: input.type,
        source: usesAi ? 'ai' : 'local',
        durationMs: Date.now() - started,
      }),
    );
    return json({
      ...assessment,
      id,
      type: input.type,
      source: usesAi ? 'ai' : 'local',
      checkedAt: new Date().toISOString(),
      version: REVIEW_VERSION,
    });
  } catch (error) {
    return apiError(error);
  }
}
