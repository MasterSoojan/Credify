import type { Metadata } from 'next';
import { InformationPage } from '@/components/InformationPage';
export const metadata: Metadata = { title: 'Support' };
export default function SupportPage() {
  return (
    <InformationPage
      eyebrow="A little help along the way"
      title="Let’s find your next step."
      description="Quick answers for using Credify, and where to go when you need something more."
    >
      <section className="prose-section">
        <h2>My review didn’t complete.</h2>
        <p>
          Basic text checks need at least 20 characters. Email checks need a complete address. For a
          link, use an HTTP or HTTPS website address. Document analysis, when available, accepts a
          PDF, PNG, or JPEG smaller than 2 MB.
        </p>
        <p>
          If an AI review fails, your input remains on the page so you can retry or switch to a
          basic text check. A failed review produces no safety verdict.
        </p>
      </section>
      <section className="prose-section">
        <h2>I can’t sign in.</h2>
        <p>
          Account services may be paused during the preview. Basic checks still work without signing
          in. When accounts are available, use your email address and confirm your signup email. For
          a forgotten password, <a href="/reset-password">request a new recovery link</a>.
        </p>
      </section>
      <section className="prose-section">
        <h2>I disagree with a finding.</h2>
        <p>
          Checks can miss context or misunderstand legitimate language. Read the supporting excerpt,
          consider the full message, and verify independently. A warning is an invitation to
          investigate, not a claim that a person or company committed fraud.
        </p>
      </section>
      <section className="prose-section">
        <h2>Something still isn’t working?</h2>
        <p>
          For this preview, contact the person who shared Credify with you. Include the page and
          steps involved, but leave out personal documents, credentials, and private account
          information. Application security issues belong in a{' '}
          <a href="/security">private security report</a>.
        </p>
      </section>
    </InformationPage>
  );
}
