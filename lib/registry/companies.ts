import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { getFeatures } from '@/lib/config';
import { z } from 'zod';

const companySchema = z.object({
  id: z.uuid(),
  domain: z.string().min(1).max(253),
  company_name: z.string().min(1).max(300),
  verification_status: z.literal('verified'),
  verified_at: z.iso.datetime({ offset: true }),
  expires_at: z.iso.datetime({ offset: true }),
  verification_method: z.string().trim().min(1).max(2000),
});
export type Company = z.infer<typeof companySchema>;
const fields =
  'id,domain,company_name,verification_status,verified_at,expires_at,verification_method';

/** Anonymous read client: approved public columns only, with RLS as the final boundary. */
function registryClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) =>
          fetch(input, { ...init, signal: AbortSignal.timeout(5000), cache: 'no-store' }),
      },
    },
  );
}

export async function findCompanies(
  query: string,
): Promise<{ available: boolean; companies: Company[] }> {
  if (!getFeatures().registry) return { available: false, companies: [] };
  const trimmed = query.trim().slice(0, 100);
  if (!trimmed) return { available: true, companies: [] };
  try {
    const client = registryClient();
    let request = client
      .from('verified_companies')
      .select(fields)
      .eq('verification_status', 'verified')
      .gt('expires_at', new Date().toISOString());
    // Values are passed to the query builder, never interpolated into PostgREST logical syntax.
    request = trimmed.includes('.')
      ? request.eq('domain', trimmed.toLowerCase())
      : request.ilike('company_name', `%${trimmed.replace(/[\\%_]/g, '\\$&')}%`);
    const { data, error } = await request.order('company_name').limit(20);
    if (error) return { available: false, companies: [] };
    const parsed = z.array(companySchema).safeParse(data || []);
    if (!parsed.success) return { available: false, companies: [] };
    return { available: true, companies: parsed.data };
  } catch {
    return { available: false, companies: [] };
  }
}
