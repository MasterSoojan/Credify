-- Enable Row Level Security (RLS)
ALTER TABLE public.verified_companies ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access" ON public.verified_companies;
CREATE POLICY "Allow public read access" ON public.verified_companies FOR SELECT USING (true);

ALTER TABLE public.users_custom ENABLE ROW LEVEL SECURITY;
-- For users_custom, only allow inserting and selecting by anon API if you want it to be fully public
-- In a real production app, you would restrict this heavily.
DROP POLICY IF EXISTS "Allow public insert to users" ON public.users_custom;
CREATE POLICY "Allow public insert to users" ON public.users_custom FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read to users" ON public.users_custom;
CREATE POLICY "Allow public read to users" ON public.users_custom FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public update to users" ON public.users_custom;
CREATE POLICY "Allow public update to users" ON public.users_custom FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public delete to users" ON public.users_custom;
CREATE POLICY "Allow public delete to users" ON public.users_custom FOR DELETE USING (true);
