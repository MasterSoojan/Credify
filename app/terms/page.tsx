import type { Metadata } from 'next';
import { InformationPage } from '@/components/InformationPage';
export const metadata: Metadata = { title: 'Using Credify' };
export default function TermsPage() {
  return (
    <InformationPage
      eyebrow="Using Credify"
      title="A useful perspective, with clear limits."
      description="Please understand these conditions before using the current preview. Updated September 27, 2026."
    >
      <section className="prose-section">
        <h2>Use a review as a starting point.</h2>
        <p>
          Credify provides informational checks. It does not guarantee a job offer, identify a
          sender with certainty, insure a transaction, or make decisions on your behalf. Confirm an
          opportunity through independent channels before acting. Basic rules and AI can both be
          incomplete or wrong.
        </p>
      </section>
      <section className="prose-section">
        <h2>Submit information responsibly.</h2>
        <p>
          Only submit material you have permission to use. Remove unnecessary personal information.
          Do not use the service to harass others, submit illegal content, bypass access controls,
          exhaust provider quotas, or misrepresent a Credify result as an employer endorsement.
        </p>
      </section>
      <section className="prose-section">
        <h2>Availability and accounts</h2>
        <p>
          This is a developing product. Some services may be temporarily unavailable, and features
          marked as planned are not currently offered. There are no paid subscriptions or purchase
          flows in this version. Keep account credentials private and use the security settings when
          account services are available.
        </p>
      </section>
      <section className="prose-section">
        <h2>External resources</h2>
        <p>
          Links to official guidance and other websites are provided for convenience. Their
          services, content, and terms are controlled by their operators. For assistance with this
          preview, contact the person who shared it with you.
        </p>
      </section>
    </InformationPage>
  );
}
