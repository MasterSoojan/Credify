import type { Metadata } from 'next';
import { InformationPage } from '@/components/InformationPage';
export const metadata: Metadata = { title: 'Report a security issue' };
export default function SecurityPage() {
  return (
    <InformationPage
      eyebrow="Help improve Credify"
      title="Found something that needs attention?"
      description="We appreciate clear, private reports of issues in the Credify application."
    >
      <section className="prose-section">
        <h2>Share a minimal report privately.</h2>
        <p>
          For this preview, contact the person who shared the application with you. Include the
          affected page, approximate time, browser, and the smallest set of steps needed to
          reproduce the issue. If you have a review ID, include it without the submitted document.
        </p>
      </section>
      <section className="prose-section">
        <h2>Protect other people’s information.</h2>
        <p>
          Do not access or change another person’s data to demonstrate an issue. Do not send
          passwords, session cookies, API keys, identity documents, or full offer letters in a
          report. If you encounter private data accidentally, stop and describe the access path
          privately.
        </p>
      </section>
      <section className="prose-section">
        <h2>Reporting a suspected job scam?</h2>
        <p>
          This page concerns the application itself. For a suspicious recruiter or job listing, use
          the original platform’s reporting process and the steps in our{' '}
          <a href="/emergency-guide">emergency guide</a>. Credify does not currently operate a
          public scam-report database.
        </p>
      </section>
    </InformationPage>
  );
}
