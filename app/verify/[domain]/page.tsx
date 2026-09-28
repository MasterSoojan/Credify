import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { findCompanies } from '@/lib/registry/companies';
import { PageIntro, Notice, ButtonLink } from '@/components/ui';
export const metadata: Metadata = { title: 'Company record' };
export const dynamic = 'force-dynamic';
export default async function CompanyPage({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params;
  if (domain.length > 253 || !/^[a-z0-9.-]+$/i.test(domain)) notFound();
  const { available, companies } = await findCompanies(domain);
  if (!available)
    return (
      <main className="container page-main">
        <PageIntro
          eyebrow="Company record"
          title="This record is unavailable right now."
          description="The company registry is temporarily unavailable. We cannot confirm a record’s status until it returns."
        />
        <ButtonLink href="/search" variant="secondary">
          Back to registry
        </ButtonLink>
      </main>
    );
  const company = companies.find((item) => item.domain === domain.toLowerCase());
  if (!company) notFound();
  return (
    <main className="container page-main">
      <PageIntro
        eyebrow="Reviewed company record"
        title={company.company_name}
        description={`This record covers ${company.domain}. Read what was checked and when before relying on it.`}
      />
      <div className="content-width stack">
        <div className="card">
          <dl className="company-details">
            <dt>Domain</dt>
            <dd>{company.domain}</dd>
            <dt>Verification method</dt>
            <dd>{company.verification_method}</dd>
            <dt>Reviewed</dt>
            <dd>
              {new Date(company.verified_at).toLocaleDateString('en', {
                dateStyle: 'long',
                timeZone: 'UTC',
              })}
            </dd>
            <dt>Expires</dt>
            <dd>
              {new Date(company.expires_at).toLocaleDateString('en', {
                dateStyle: 'long',
                timeZone: 'UTC',
              })}
            </dd>
          </dl>
        </div>
        <Notice title="A company record does not verify the sender.">
          Someone can share this page without being an authorized employee. Find the employer’s
          official contact channel independently and confirm both the role and the person contacting
          you.
        </Notice>
        <div>
          <ButtonLink href="/search" variant="secondary">
            Back to registry
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}
