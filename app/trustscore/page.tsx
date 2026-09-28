import type { Metadata } from 'next';
import { InformationPage } from '@/components/InformationPage';
import { Notice } from '@/components/ui';
export const metadata: Metadata = { title: 'Our approach to trust' };
export default function ApproachPage() {
  return (
    <InformationPage
      eyebrow="Our approach"
      title="Trust deserves more than a number."
      description="An apparently precise score can hide a lot of uncertainty. We show the observations and their limits instead."
    >
      <section className="prose-section">
        <h2>Evidence before percentages.</h2>
        <p>
          Credify currently does not publish a numerical TrustScore. We have not established that an
          AI-generated number can reliably predict whether a job offer is legitimate. Findings are
          presented as specific things to check, with an explanation and practical next steps.
        </p>
      </section>
      <section className="prose-section">
        <h2>Two honest outcomes.</h2>
        <p>
          <strong>Worth a closer look</strong> means a supported warning pattern or AI observation
          needs your attention. <strong>There’s more to verify</strong> means the check cannot
          establish legitimacy. Neither outcome is a final decision about the employer or
          opportunity.
        </p>
      </section>
      <section className="prose-section">
        <h2>Identity and content are different questions.</h2>
        <p>
          A professionally worded letter may be fraudulent. A real recruiter may write a rushed
          message. A domain appearing in a registry does not authenticate the person using it in an
          email. We keep these limitations visible instead of combining them into a “safe” badge.
        </p>
      </section>
      <section className="prose-section">
        <h2>Make the assessment inspectable.</h2>
        <p>
          Reports identify their method, time, and review ID. The copy action lets you keep a report
          yourself. Credify does not currently store report history. If the analysis cannot
          complete, we say so directly.
        </p>
      </section>
      <div style={{ marginTop: 25 }}>
        <Notice>
          Our goal is to help you ask better questions and check independently. The final decision
          belongs to you.
        </Notice>
      </div>
    </InformationPage>
  );
}
