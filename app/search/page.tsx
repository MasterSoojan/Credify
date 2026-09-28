import type { Metadata } from 'next';
import { Building2, Search, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { PageIntro, Notice, Button } from '@/components/ui';
import { findCompanies } from '@/lib/registry/companies';
export const metadata: Metadata = { title: 'Company registry' };
export const dynamic = 'force-dynamic';
export default async function CompanySearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = typeof params.q === 'string' ? params.q.trim().slice(0, 100) : '';
  const { available, companies } = await findCompanies(query);
  return (
    <main className="container page-main">
      <PageIntro
        eyebrow="Company registry · preview"
        title="Start with the company behind the name."
        description="Search current, reviewed company records. A company record describes the checks performed; it does not authenticate an individual recruiter or offer."
      />
      <div className="content-width stack">
        {!available ? (
          <Notice title="The company registry is temporarily unavailable.">
            We cannot check company records right now. Use an employer’s website and a contact
            channel you find independently. A basic email check is still available in the offer
            scanner.
          </Notice>
        ) : (
          <>
            <form action="/search" className="registry-search">
              <label htmlFor="company-query" className="sr-only">
                Company name or exact domain
              </label>
              <Search size={20} />
              <input
                id="company-query"
                className="input"
                name="q"
                defaultValue={query}
                maxLength={100}
                placeholder="Company name or exact domain"
                required
              />
              <Button type="submit">Search</Button>
            </form>
            {query ? (
              companies.length ? (
                <>
                  <p className="small muted">
                    {companies.length} result{companies.length === 1 ? '' : 's'} for “{query}”
                  </p>
                  {companies.map((company) => (
                    <Link
                      href={`/verify/${encodeURIComponent(company.domain)}`}
                      className="registry-result card"
                      key={company.id}
                    >
                      <Building2 size={25} />
                      <div>
                        <h2>{company.company_name}</h2>
                        <p>{company.domain}</p>
                        <span>
                          Reviewed{' '}
                          {new Date(company.verified_at).toLocaleDateString('en', {
                            dateStyle: 'medium',
                            timeZone: 'UTC',
                          })}
                        </span>
                      </div>
                      <ArrowUpRight size={20} />
                    </Link>
                  ))}
                </>
              ) : (
                <Notice title="No current record found.">
                  We have no approved, unexpired record matching this search. That does not mean the
                  company is fraudulent.
                </Notice>
              )
            ) : (
              <Notice>
                Enter a company name or its exact domain to search. Only reviewed, unexpired records
                appear here.
              </Notice>
            )}
          </>
        )}
        <Notice>
          Always compare the full domain. A link to a real company profile can be copied by someone
          who has no connection to that company.
        </Notice>
      </div>
    </main>
  );
}
