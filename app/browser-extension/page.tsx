import type { Metadata } from 'next';
import { InformationPage } from '@/components/InformationPage';
import { Notice, ButtonLink } from '@/components/ui';
export const metadata: Metadata = { title: 'Browser companion' };
export default function BrowserExtensionPage() {
  return (
    <InformationPage
      eyebrow="On the roadmap"
      title="A thoughtful pause, closer to your inbox."
      description="The browser companion is an early product concept. There is no installable Credify extension in this preview."
    >
      <Notice title="Still in development">
        There is currently no Chrome Web Store listing or extension download to install from this
        site.
      </Notice>
      <section className="prose-section">
        <h2>What we’re exploring</h2>
        <p>
          A small, opt-in companion could help you bring a recruiter message into a Credify review.
          Any implementation will need clear permissions, consent before processing email content,
          and the same honest limitations as the web app.
        </p>
      </section>
      <section className="prose-section">
        <h2>What you can do today</h2>
        <p>
          Copy the relevant message text into the web scanner. Remove unnecessary personal
          information first. Basic text reviews run in your browser and do not access your inbox.
        </p>
        <div style={{ marginTop: 22 }}>
          <ButtonLink href="/job-scanner">Use the web scanner</ButtonLink>
        </div>
      </section>
    </InformationPage>
  );
}
