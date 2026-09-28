import { z } from 'zod';

export const emailSchema = z
  .email('Enter a valid email address.')
  .max(254)
  .transform((value) => value.toLowerCase());
export const passwordSchema = z
  .string()
  .min(12, 'Use at least 12 characters for your password.')
  .max(128, 'Use no more than 128 characters.');
export const loginSchema = z
  .object({ email: emailSchema, password: z.string().min(1).max(128) })
  .strict();
export const signupSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    name: z.string().trim().min(1, 'Enter your name.').max(80),
  })
  .strict();
export const profileSchema = z
  .object({
    display_name: z.string().trim().min(1).max(80),
    occupation: z.string().trim().max(100),
    location: z.string().trim().max(100),
  })
  .strict();
export type Profile = z.infer<typeof profileSchema> & { email: string; user_id: string };
