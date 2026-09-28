import type { Metadata } from 'next';
import { ArrowRight, FileText, Mail, Link2 } from 'lucide-react';
import { ReviewSteps } from '@/components/ReviewSteps';
import { ButtonLink, Notice, TextLink } from '@/components/ui';

export const metadata: Metadata = { title: 'How it works' };

export default function HowItWorksPage() {
  return (
    <main className="container page-main">
      <header className="page-intro how-intro">
        <p className="eyebrow">
          <span /> How Credify works
        </p>
        <h1>
          An offer. A closer look.
          <br />
          <span className="heading-accent">A clearer next step.</span>
        </h1>
        <p className="lead">
          Start with the message you received. Credify explains what deserves attention and gives
          you practical questions to follow up on.
        </p>
        <div className="button-row">
          <ButtonLink href="/demo">
            Try it with an example <ArrowRight size={16} aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href="/job-scanner" variant="secondary">
            Check your own offer
          </ButtonLink>
        </div>
      </header>
      <section aria-labelledby="process-heading">
        <div className="section-heading">
          <div>
            <h2 id="process-heading">Here’s what happens.</h2>
          </div>
          <p>One fictional message, followed through three simple steps.</p>
        </div>
        <ReviewSteps />
      </section>
      <section className="section how-methods" aria-labelledby="checks-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <span /> Choose your starting point
            </p>
            <h2 id="checks-heading">Different inputs. Clear limits.</h2>
          </div>
          <p>
            Basic checks run in your browser. Your input stays on this page and is cleared when you
            leave.
          </p>
        </div>
        <div className="cards-grid">
          <article className="feature-card">
            <span className="feature-icon">
              <FileText size={22} aria-hidden="true" />
            </span>
            <h3>Offer text</h3>
            <ul>
              <li>
                Looks for English-language patterns such as fees, urgency, or requests for sensitive
                information.
              </li>
              <li>Shows matching wording so you can read it in context.</li>
              <li>Cannot establish whether the job exists.</li>
            </ul>
            <TextLink href="/job-scanner">Check offer text</TextLink>
          </article>
          <article className="feature-card">
            <span className="feature-icon">
              <Mail size={22} aria-hidden="true" />
            </span>
            <h3>Email address</h3>
            <ul>
              <li>Identifies the written domain and common public mailbox providers.</li>
              <li>Helps you compare it with contact details on the employer’s website.</li>
              <li>Cannot authenticate who sent a message.</li>
            </ul>
            <TextLink href="/job-scanner?type=email">Check an email</TextLink>
          </article>
          <article className="feature-card">
            <span className="feature-icon">
              <Link2 size={22} aria-hidden="true" />
            </span>
            <h3>Website link</h3>
            <ul>
              <li>Inspects the hostname, protocol, and unusual address structures.</li>
              <li>Does not open the website you submit.</li>
              <li>Does not check malware or reputation databases.</li>
            </ul>
            <TextLink href="/instant-verify">Check a link</TextLink>
          </article>
        </div>
      </section>
      <section className="split-section" aria-labelledby="ai-heading">
        <div>
          <p className="eyebrow">
            <span /> Need to review a document?
          </p>
          <h2 id="ai-heading">Choose an AI-assisted review.</h2>
          <p className="lead">
            Sign in to review a PDF, PNG, or JPEG up to 2 MB, or add AI context to offer text.
          </p>
        </div>
        <div className="stack">
          <p className="muted">
            Select Document in the scanner, choose your file, and give processing consent. The
            content goes through our server to Google Gemini. Remove unnecessary personal details
            first.
          </p>
          <Notice title="Analysis isn’t authentication.">
            AI can help explain a document’s wording. It cannot authenticate signatures or prove the
            document is genuine. A failed or unreadable review returns an error, never a safety
            verdict.
          </Notice>
          <TextLink href="/job-scanner?type=document">Open document review</TextLink>
        </div>
      </section>
      <div className="section">
        <Notice title="No warning signs doesn’t mean an offer is safe.">
          Rules and AI can both miss context. Confirm the role and recruiter through the employer’s
          own website and contact details you locate independently.
        </Notice>
      </div>
      <div className="cta-panel">
        <div>
          <h2>Ready to take a closer look?</h2>
          <p>The example is prefilled. Run it, then try your own wording.</p>
        </div>
        <ButtonLink href="/demo">
          Try the example <ArrowRight size={17} aria-hidden="true" />
        </ButtonLink>
      </div>
    </main>
  );
}
