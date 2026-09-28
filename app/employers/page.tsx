import type { Metadata } from 'next';
import { Building2, BadgeCheck, UsersRound } from 'lucide-react';
import { PageIntro, ButtonLink, Notice } from '@/components/ui';
export const metadata: Metadata = { title: 'For employers' };
export default function EmployersPage() {
  return (
    <main className="container page-main">
      <PageIntro
        eyebrow="For the people doing the hiring"
        title="Make it easier to know it’s you."
        description="Candidates deserve a clear way to confirm a recruiter. We’re developing employer tools around evidence, transparent status, and independent contact channels."
      />
      <Notice title="Employer onboarding is in development.">
        Self-service company verification and paid plans are not available in this preview. A public
        company record, where available, describes the checks performed; it does not authenticate
        everyone who shares its link.
      </Notice>
      <div className="cards-grid" style={{ marginTop: 30 }}>
        {[
          {
            icon: Building2,
            title: 'Establish the company',
            text: 'The planned process starts with control of an official company domain and a review of supporting identity evidence.',
          },
          {
            icon: UsersRound,
            title: 'Make contact channels clear',
            text: 'Publish the channels candidates can use to confirm the role and recruiter independently.',
          },
          {
            icon: BadgeCheck,
            title: 'Keep status current',
            text: 'Verification needs a date, a method, an expiry, and a way to withdraw it when circumstances change.',
          },
        ].map(({ icon: Icon, title, text }) => (
          <article className="feature-card" key={title}>
            <span className="feature-icon">
              <Icon size={23} />
            </span>
            <h2 style={{ fontSize: 20, marginBottom: 12 }}>{title}</h2>
            <p>{text}</p>
            <span className="badge">Planned employer workflow</span>
          </article>
        ))}
      </div>
      <section className="resource-band">
        <div>
          <h2>Build trust before the first interview.</h2>
          <p>
            Today, use a consistent company domain, list roles on your official site, and give
            candidates a way to confirm unexpected messages.
          </p>
        </div>
        <div className="button-row">
          <ButtonLink href="/search" variant="secondary">
            View company registry
          </ButtonLink>
          <ButtonLink href="/support">About the preview</ButtonLink>
        </div>
      </section>
    </main>
  );
}
