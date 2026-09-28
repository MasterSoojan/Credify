import type { Metadata } from 'next';
import { InformationPage } from '@/components/InformationPage';
import { Notice } from '@/components/ui';
export const metadata: Metadata = { title: 'Your next steps after a suspected scam' };
export default function EmergencyGuidePage() {
  return (
    <InformationPage
      eyebrow="Start with one next step"
      title="You still have options."
      description="If you have shared money or personal information, focus on practical actions. You do not need a Credify account to use this guide."
    >
      <Notice tone="warning" title="If you are in immediate danger">
        Contact your local emergency services. Credify does not monitor reports or provide emergency
        assistance.
      </Notice>
      <section className="prose-section">
        <h2>If you sent money</h2>
        <p>
          Contact your bank, card issuer, or payment provider promptly using its official app or a
          number you find independently. Explain what happened and ask whether the payment can be
          stopped or reversed. Recovery is not guaranteed.
        </p>
        <p>
          Keep payment references and receipts. The{' '}
          <a
            href="https://consumer.ftc.gov/articles/what-do-if-you-were-scammed"
            target="_blank"
            rel="noreferrer"
          >
            FTC’s recovery guide
          </a>{' '}
          explains options by payment method, primarily for people in the United States.
        </p>
      </section>
      <section className="prose-section">
        <h2>If you shared a password</h2>
        <p>
          Change it through the service’s official website or app. Change it on other accounts where
          you reused it, enable multi-factor authentication where available, and review active
          sessions. If someone gained access to your device, seek help through a trusted support
          channel.
        </p>
      </section>
      <section className="prose-section">
        <h2>If you shared identity information</h2>
        <p>
          Contact the issuer of the affected document or the relevant identity-protection authority
          in your country. For U.S. identity-theft guidance, visit{' '}
          <a href="https://www.identitytheft.gov/" target="_blank" rel="noreferrer">
            IdentityTheft.gov
          </a>
          . The right process depends on what you shared and where you live.
        </p>
      </section>
      <section className="prose-section">
        <h2>Keep a clear record</h2>
        <ul>
          <li>Save the original messages, email headers, offer documents, and account names.</li>
          <li>Write down dates, transaction references, and the steps you have already taken.</li>
          <li>Report the listing to the job platform through its official reporting flow.</li>
          <li>
            Use your country’s official consumer-protection or cybercrime reporting service. U.S.
            users can use{' '}
            <a href="https://reportfraud.ftc.gov/" target="_blank" rel="noreferrer">
              ReportFraud.ftc.gov
            </a>
            .
          </li>
        </ul>
      </section>
      <section className="prose-section">
        <h2>A starting message for your payment provider</h2>
        <p>
          Adapt this with only the details the provider needs, and send it through an official
          channel:
        </p>
        <blockquote className="template-copy">
          I believe I was misled into making a payment connected to a job offer. The payment date
          was [date], the amount was [amount], and the reference was [reference]. Please tell me
          whether it can be stopped or reversed and what evidence you need from me.
        </blockquote>
      </section>
      <p className="small muted" style={{ marginTop: 25 }}>
        Reviewed September 27, 2026. Source:{' '}
        <a
          className="text-link"
          href="https://consumer.ftc.gov/articles/what-do-if-you-were-scammed"
          target="_blank"
          rel="noreferrer"
        >
          FTC consumer guidance
        </a>
        . Procedures vary by location and provider.
      </p>
    </InformationPage>
  );
}
