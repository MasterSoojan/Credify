import type { Metadata } from 'next';
import { InformationPage } from '@/components/InformationPage';
import { Notice, ButtonLink } from '@/components/ui';
export const metadata: Metadata = { title: 'Learning scenarios' };
export default function ScenariosPage() {
  return (
    <InformationPage
      eyebrow="Learn with a little context"
      title="Three moments worth pausing for."
      description="These are fictional learning scenarios, not customer testimonials or accounts of verified incidents."
    >
      <Notice>
        Every situation needs context. Use these examples to practice asking questions, not to label
        real people or companies.
      </Notice>
      <section className="prose-section">
        <h2>A fee to secure the role</h2>
        <p>
          An offer asks you to pay a registration fee before an interview. Pause before paying. Find
          the employer’s official website independently and ask whether the role and request are
          real.
        </p>
      </section>
      <section className="prose-section">
        <h2>A familiar name, an unfamiliar address</h2>
        <p>
          The message displays a recognizable company name, but the sender uses a personal mailbox.
          That does not prove fraud. It does mean the address alone cannot establish company
          affiliation.
        </p>
      </section>
      <section className="prose-section">
        <h2>A professional-looking letter</h2>
        <p>
          A document has a logo, a signature, and polished formatting. These can be copied. Confirm
          the offer through a company contact you find independently before sending sensitive
          information.
        </p>
      </section>
      <div style={{ marginTop: 25 }}>
        <ButtonLink href="/demo">Explore the offer walkthrough</ButtonLink>
      </div>
    </InformationPage>
  );
}
