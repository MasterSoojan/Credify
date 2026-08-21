-- Insert dummy test data
INSERT INTO public.verified_companies (domain, company_name, trust_score)
VALUES 
    ('google.com', 'Google LLC', 99),
    ('microsoft.com', 'Microsoft Corporation', 98),
    ('amazon.com', 'Amazon.com, Inc.', 95),
    ('apple.com', 'Apple Inc.', 97)
ON CONFLICT (domain) DO NOTHING;
