-- Forward remediation for the original public policies. Apply all migrations in order.
-- Keep existing table names and auth UUIDs so existing accounts survive this change.
BEGIN;
ALTER TABLE public.users_custom ADD COLUMN IF NOT EXISTS display_name text NOT NULL DEFAULT '';
ALTER TABLE public.users_custom ADD COLUMN IF NOT EXISTS occupation text NOT NULL DEFAULT '';
ALTER TABLE public.users_custom ADD COLUMN IF NOT EXISTS location text NOT NULL DEFAULT '';
ALTER TABLE public.users_custom ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

DROP POLICY IF EXISTS "Allow public insert to users" ON public.users_custom;
DROP POLICY IF EXISTS "Allow public read to users" ON public.users_custom;
DROP POLICY IF EXISTS "Allow public update to users" ON public.users_custom;
DROP POLICY IF EXISTS "Allow public delete to users" ON public.users_custom;
REVOKE ALL ON public.users_custom FROM anon, authenticated;
GRANT SELECT ON public.users_custom TO authenticated;
-- RLS protects rows, not columns. Auth identity fields stay immutable to clients.
GRANT UPDATE (display_name, occupation, location) ON public.users_custom TO authenticated;
CREATE POLICY "Read own profile" ON public.users_custom FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = id);
CREATE POLICY "Update own profile" ON public.users_custom FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) = id) WITH CHECK ((SELECT auth.uid()) = id);
ALTER TABLE public.users_custom ADD CONSTRAINT profile_name_length CHECK (char_length(display_name) <= 80);
ALTER TABLE public.users_custom ADD CONSTRAINT profile_occupation_length CHECK (char_length(occupation) <= 100);
ALTER TABLE public.users_custom ADD CONSTRAINT profile_location_length CHECK (char_length(location) <= 100);

CREATE OR REPLACE FUNCTION public.touch_profile_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = '' AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
CREATE TRIGGER profile_updated_at BEFORE UPDATE ON public.users_custom
  FOR EACH ROW EXECUTE FUNCTION public.touch_profile_updated_at();

-- Provision within the Auth transaction, including signups awaiting email confirmation.
CREATE OR REPLACE FUNCTION public.sync_auth_profile()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
BEGIN
  INSERT INTO public.users_custom (id, email, user_id, display_name)
  VALUES (NEW.id, NEW.email, 'credify_' || replace(NEW.id::text, '-', ''),
    left(coalesce(NEW.raw_user_meta_data ->> 'display_name', ''), 80))
  ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.sync_auth_profile() FROM PUBLIC;
CREATE TRIGGER auth_profile_sync AFTER INSERT OR UPDATE OF email ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.sync_auth_profile();
INSERT INTO public.users_custom (id, email, user_id, display_name)
SELECT id, email, 'credify_' || replace(id::text, '-', ''),
  left(coalesce(raw_user_meta_data ->> 'display_name', ''), 80)
FROM auth.users WHERE email IS NOT NULL
ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;

-- Seeded names and scores are not verification evidence. No row is implicitly approved.
ALTER TABLE public.verified_companies ADD COLUMN IF NOT EXISTS verification_status text NOT NULL DEFAULT 'pending'
  CHECK (verification_status IN ('pending', 'verified', 'revoked'));
ALTER TABLE public.verified_companies ADD COLUMN IF NOT EXISTS verified_at timestamptz;
ALTER TABLE public.verified_companies ADD COLUMN IF NOT EXISTS expires_at timestamptz;
ALTER TABLE public.verified_companies ADD COLUMN IF NOT EXISTS verification_method text;
ALTER TABLE public.verified_companies ADD CONSTRAINT verified_company_evidence CHECK (
  -- CHECK accepts NULL, so require each evidence field explicitly.
  verification_status <> 'verified' OR (
    verified_at IS NOT NULL AND expires_at IS NOT NULL AND expires_at > verified_at
    AND verification_method IS NOT NULL AND char_length(trim(verification_method)) > 0
  )
);
DROP POLICY IF EXISTS "Allow public read access" ON public.verified_companies;
REVOKE ALL ON public.verified_companies FROM anon, authenticated;
GRANT SELECT (id, domain, company_name, verification_status, verified_at, expires_at, verification_method)
  ON public.verified_companies TO anon, authenticated;
CREATE POLICY "Read reviewed current companies" ON public.verified_companies FOR SELECT TO anon, authenticated
  USING (verification_status = 'verified' AND expires_at > now());
COMMIT;
