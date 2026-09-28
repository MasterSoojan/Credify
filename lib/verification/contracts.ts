import { z } from 'zod';

/** Shared boundary limits. The server enforces these again; browser checks are UX only. */
export const MAX_TEXT_LENGTH = 12_000;
/** Bump when the review rules, result meaning, or AI instructions change. */
export const REVIEW_VERSION = '2026-09-27.1';
export const MAX_FILE_BYTES = 2 * 1024 * 1024;
export const ACCEPTED_FILE_TYPES = ['application/pdf', 'image/png', 'image/jpeg'] as const;

export const scanInputSchema = z.discriminatedUnion('type', [
  z
    .object({
      type: z.literal('text'),
      text: z.string().trim().min(20, 'Add at least 20 characters to review.').max(MAX_TEXT_LENGTH),
      useAi: z.boolean().default(false),
    })
    .strict(),
  z
    .object({ type: z.literal('email'), email: z.email('Enter a valid email address.').max(254) })
    .strict(),
  z.object({ type: z.literal('url'), url: z.string().trim().min(3).max(2048) }).strict(),
  z
    .object({
      type: z.literal('document'),
      fileName: z.string().min(1).max(180),
      mimeType: z.enum(ACCEPTED_FILE_TYPES),
      fileData: z
        .string()
        .min(1)
        .max(Math.ceil(MAX_FILE_BYTES / 3) * 4),
      consent: z.literal(true, { error: 'Please agree to document processing before continuing.' }),
    })
    .strict(),
]);

export type ScanInput = z.infer<typeof scanInputSchema>;
export type ScanType = ScanInput['type'];

export const findingSchema = z.object({
  id: z.string().max(80),
  title: z.string().max(120),
  detail: z.string().max(600),
  severity: z.enum(['warning', 'info']),
  evidence: z.string().max(240).optional(),
});

export const assessmentSchema = z.object({
  status: z.enum(['attention', 'inconclusive']),
  summary: z.string().min(1).max(800),
  findings: z.array(findingSchema).max(12),
  nextSteps: z.array(z.string().min(1).max(400)).min(1).max(6),
  limitations: z.array(z.string().min(1).max(400)).min(1).max(6),
});

export const scanResultSchema = assessmentSchema.extend({
  id: z.string(),
  type: z.enum(['text', 'email', 'url', 'document']),
  source: z.enum(['local', 'ai', 'example']),
  checkedAt: z.iso.datetime(),
  version: z.string(),
});

export type Finding = z.infer<typeof findingSchema>;
export type Assessment = z.infer<typeof assessmentSchema>;
export type ScanResult = z.infer<typeof scanResultSchema>;
