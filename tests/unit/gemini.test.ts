import { beforeEach, expect, it, vi } from 'vitest';
const provider = vi.hoisted(() => ({ generate: vi.fn(), options: vi.fn() }));
vi.mock('@google/genai', () => ({
  GoogleGenAI: class {
    models = { generateContent: provider.generate };
    constructor(options: unknown) {
      provider.options(options);
    }
  },
}));
import { reviewWithGemini } from '@/lib/verification/gemini';
const input = {
  type: 'text' as const,
  text: 'Please pay a registration fee to secure your role.',
  useAi: true,
};
const assessment = {
  status: 'inconclusive',
  summary: 'Review the payment request.',
  findings: [
    {
      id: 'payment',
      title: 'Payment',
      detail: 'Verify this request.',
      severity: 'warning',
      evidence: 'registration fee',
    },
  ],
  nextSteps: ['Contact the employer independently.'],
  limitations: ['The sender was not authenticated.'],
};
beforeEach(() => {
  provider.generate.mockResolvedValue({ text: JSON.stringify(assessment) });
});
it('validates structured evidence and derives status from the warnings', async () => {
  const result = await reviewWithGemini(input, new AbortController().signal);
  expect(result.status).toBe('attention');
  expect(result.limitations).toContain(
    'AI can miss context or produce incorrect findings. Independently confirm all claims.',
  );
  expect(provider.options).toHaveBeenCalledWith(
    expect.objectContaining({ httpOptions: { timeout: 30_000, retryOptions: { attempts: 1 } } }),
  );
});
it.each([
  'not json',
  '{}',
  JSON.stringify({
    ...assessment,
    findings: [{ ...assessment.findings[0], evidence: 'invented payment request' }],
  }),
])('rejects unusable output instead of generating a fallback assessment', async (text) => {
  provider.generate.mockResolvedValue({ text });
  await expect(reviewWithGemini(input, new AbortController().signal)).rejects.toMatchObject({
    status: 502,
  });
});
it('bounds provider failure without exposing its error payload', async () => {
  provider.generate.mockRejectedValue(new Error('secret provider content'));
  await expect(reviewWithGemini(input, new AbortController().signal)).rejects.toMatchObject({
    code: 'ANALYSIS_UNAVAILABLE',
  });
});
