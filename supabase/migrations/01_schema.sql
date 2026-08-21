-- 1. Create the verified_companies table
CREATE TABLE IF NOT EXISTS public.verified_companies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    domain TEXT UNIQUE NOT NULL,
    company_name TEXT NOT NULL,
    trust_score INTEGER NOT NULL CHECK (trust_score >= 0 AND trust_score <= 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Custom Users Table
CREATE TABLE IF NOT EXISTS public.users_custom (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    user_id TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    backup_email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
