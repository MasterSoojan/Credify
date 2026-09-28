import type { Metadata } from 'next';
import { InformationPage } from '@/components/InformationPage';
import { ButtonLink, Notice } from '@/components/ui';
export const metadata: Metadata = { title: 'How it works' };
export default function HowItWorksPage() {
  return (
    <InformationPage
      eyebrow="Know what’s behind the review"
      title="Useful checks. Clear boundaries."
      description="Credify helps you examine a message before acting on it. Here’s what happens at each step."
    >
      <section className="prose-section">
        <h2>1. Choose what you want to check.</h2>
        <p>
          Paste offer text, enter a recruiter’s email address, or inspect a link. Basic checks run
          in your browser. Your input is not sent to Credify’s server and disappears when you leave
          or refresh the page.
        </p>
      </section>
      <section className="prose-section">
        <h2>2. Read the findings in context.</h2>
        <p>
          Text reviews look for a small set of English-language patterns, including payment
          requests, urgency, sensitive information requests, messaging apps, and unusually easy
          hiring promises. These are prompts to investigate, not proof of fraud.
        </p>
        <p>
          Email checks identify the written domain and common public mailbox providers. Link checks
          inspect the hostname, protocol, and some unusual structures without visiting the website.
          Neither authenticates a sender nor checks a threat database.
        </p>
      </section>
      <section className="prose-section">
        <h2>3. Take an independent next step.</h2>
        <p>
          Use the employer’s website and contact details you locate independently. Ask about the
          role, recruitment process, and any unusual request. A message containing a familiar
          company name or domain can still be copied.
        </p>
      </section>
      <section className="prose-section">
        <h2>What about document and AI analysis?</h2>
        <p>
          When available, signed-in users can choose AI-assisted text or document review. With your
          consent, the content is processed by Google Gemini. This can help explain language in a
          document, but it does not authenticate signatures or prove that a document is genuine.
        </p>
        <p>
          Supported documents are PDF, PNG, and JPEG files up to 2 MB. Remove unnecessary personal
          details first. Unreadable documents or failed provider calls produce an error, not a
          safety verdict.
        </p>
      </section>
      <div className="stack" style={{ marginTop: 26 }}>
        <Notice title="No result is a guarantee.">
          An absence of warning patterns does not mean an opportunity is safe. Basic rules and AI
          can both miss context or flag legitimate language.
        </Notice>
        <div>
          <ButtonLink href="/demo">Try the example walkthrough</ButtonLink>
        </div>
      </div>
    </InformationPage>
  );
}
