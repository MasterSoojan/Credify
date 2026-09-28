import { ArrowDown, ArrowRight, FileText, Mail, Link2, LockKeyhole } from 'lucide-react';
import { ButtonLink, TextLink } from '@/components/ui';
import { OfferPreview } from '@/components/OfferPreview';
import { ReviewSteps } from '@/components/ReviewSteps';

const tools = [
  {
    icon: FileText,
    title: 'A job offer or message',
    description:
      'Paste the wording to look for payment requests, pressure tactics, and other patterns worth questioning.',
    href: '/job-scanner',
    action: 'Check offer text',
  },
  {
    icon: Mail,
    title: 'A recruiter’s email',
    description:
      'Look at the sender’s written domain and learn what to confirm about the person behind the address.',
    href: '/job-scanner?type=email',
    action: 'Check an email',
  },
  {
    icon: Link2,
    title: 'A website or offer link',
    description: 'Inspect the address for unusual structures without opening the website.',
    href: '/instant-verify',
    action: 'Check a link',
  },
];
const faqs = [
  [
    'Can Credify tell me if an offer is definitely safe?',
    'No. A review can help you notice warning signs, but it cannot guarantee legitimacy. Always confirm the role and recruiter through a company channel you find independently.',
  ],
  [
    'Do I need an account to check an offer?',
    'No account is needed for basic text, email, and link checks. These checks use local rules and do not call an AI provider. Optional AI document analysis requires sign-in and your consent.',
  ],
  [
    'What happens to the information I submit?',
    'Basic checks run in your browser and are not saved by Credify. If you choose AI analysis, the submitted content is sent to our server and Google Gemini for processing. Remove unnecessary personal information first.',
  ],
  [
    'What if I have already sent money or documents?',
    'You still have options. Our emergency guide helps you organize immediate next steps, preserve evidence, and find the right official support channels.',
  ],
];

export default function HomePage() {
  return (
    <main>
      <section className="hero container">
        <div className="hero-grid">
          <div>
            <p className="eyebrow">
              <span /> A second look at your job offer
            </p>
            <h1>
              Before you say yes,
              <br />
              <span className="heading-accent">check the offer.</span>
            </h1>
            <p className="lead">
              Paste a job offer, recruiter’s email, or link. Understand the warning signs and what
              to check next, before you reply.
            </p>
            <div className="button-row">
              <ButtonLink href="/job-scanner">
                Check an offer <ArrowRight size={17} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/demo" variant="secondary">
                Try an example
              </ButtonLink>
            </div>
            <p className="hero-note">
              <LockKeyhole size={13} aria-hidden="true" /> Free basic checks. No sign-up. Your text
              stays in your browser.
            </p>
            <a className="hero-scroll" href="#how-it-works">
              <ArrowDown size={16} aria-hidden="true" /> See how it works
            </a>
          </div>
          <OfferPreview />
        </div>
      </section>
      <section
        id="how-it-works"
        className="section how-section"
        aria-labelledby="walkthrough-heading"
        tabIndex={-1}
      >
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span /> How it works
              </p>
              <h2 id="walkthrough-heading">From “is this real?” to a next step.</h2>
            </div>
            <p>Follow one example from the message you receive to the question you ask next.</p>
          </div>
          <ReviewSteps />
          <div className="walkthrough-footer">
            <p>
              Findings explain what deserves attention. Always confirm the role and recruiter
              independently.
            </p>
            <TextLink href="/how-it-works">See what each check covers</TextLink>
          </div>
        </div>
      </section>
      <section className="section container" aria-labelledby="choose-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <span /> Start with what you have
            </p>
            <h2 id="choose-heading">What would you like to check?</h2>
          </div>
          <p>Choose an input. Each basic check works without an account.</p>
        </div>
        <div className="cards-grid">
          {tools.map(({ icon: Icon, ...tool }) => (
            <article className="feature-card" key={tool.title}>
              <span className="feature-icon">
                <Icon size={23} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <h3>{tool.title}</h3>
              <p>{tool.description}</p>
              <TextLink href={tool.href}>{tool.action}</TextLink>
            </article>
          ))}
        </div>
      </section>
      <section className="section container split-section">
        <div>
          <p className="eyebrow">
            <span /> Before you start
          </p>
          <h2>A few things you might be wondering.</h2>
          <p className="lead">
            What a review can tell you, where your information goes, and where to turn for help.
          </p>
          <TextLink href="/help-center">Visit the safety hub</TextLink>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
          <TextLink href="/emergency-guide">Already sent money or documents?</TextLink>
        </div>
      </section>
      <section className="container">
        <div className="cta-panel">
          <div>
            <h2>Got an offer on your mind?</h2>
            <p>Start with a second look. Leave with a clearer next step.</p>
          </div>
          <ButtonLink href="/job-scanner">
            Check an offer <ArrowRight size={17} aria-hidden="true" />
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
