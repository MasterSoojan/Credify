import {
  ArrowRight,
  FileText,
  Mail,
  Link2,
  LockKeyhole,
  Eye,
  BadgeHelp,
  CircleAlert,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { ButtonLink, TextLink } from '@/components/ui';

const tools = [
  {
    icon: FileText,
    title: 'Read between the lines.',
    description:
      'Paste a job offer or recruiter message. Spot language that deserves a second look, with an explanation for each signal.',
    href: '/job-scanner',
    action: 'Review an offer',
  },
  {
    icon: Mail,
    title: 'Meet the actual sender.',
    description:
      'Examine a recruiter’s email domain and learn what an address can — and cannot — tell you about their identity.',
    href: '/job-scanner?type=email',
    action: 'Check an email',
  },
  {
    icon: Link2,
    title: 'Look before you click.',
    description:
      'Inspect a link’s structure without opening the website. Understand the domain and the limits of a basic check.',
    href: '/instant-verify',
    action: 'Inspect a link',
  },
];
const faqs = [
  [
    'Can Credify tell me if an offer is definitely safe?',
    'No. A review can help you notice warning signs, but it cannot guarantee legitimacy. Always confirm the role and recruiter through a company channel you find independently.',
  ],
  [
    'Do I need an account to check an offer?',
    'No account is needed for basic text, email, and link checks. These checks use local rules and do not call an AI provider. Optional AI document analysis requires an available account service and your consent.',
  ],
  [
    'What happens to the information I submit?',
    'Basic checks run in your browser and are not saved by Credify. If you choose available AI analysis, the submitted content is sent to our server and Google Gemini for processing. Remove unnecessary personal information first.',
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
              <span />A clearer path to your next opportunity
            </p>
            <h1>
              Big opportunity.
              <br />
              Small doubt?
              <br />
              <em>Let’s take a look.</em>
            </h1>
            <p className="lead">
              A promising job offer should bring excitement, not uncertainty. Get a second
              perspective before you take the next step.
            </p>
            <div className="button-row">
              <ButtonLink href="/job-scanner">
                Check an offer <ArrowRight size={17} />
              </ButtonLink>
              <ButtonLink href="/demo" variant="secondary">
                Try an example
              </ButtonLink>
            </div>
            <p className="hero-note">
              <LockKeyhole size={13} />
              Free basic checks. No sign-up. Your text stays in your browser.
            </p>
          </div>
          <div className="hero-visual" aria-label="Illustrative offer review">
            <div className="sample-card">
              <div className="sample-card-top">
                <span>
                  <FileText size={16} />
                  Your offer, a little clearer
                </span>
                <span className="sample-label">Example review</span>
              </div>
              <div className="sample-body">
                <div className="sample-email">
                  <strong>Subject: Your next chapter starts here</strong>Congratulations! You have
                  been selected for the role.
                  <br />
                  Please pay a <mark>registration fee</mark> to secure your position.
                  <br />
                  Reply <mark>within 2 hours</mark> to confirm.
                </div>
                <div className="sample-result">
                  <span className="status-icon">
                    <CircleAlert size={22} />
                  </span>
                  <div>
                    <strong>A couple of things to check.</strong>
                    <p>Pause, ask questions, and verify independently.</p>
                  </div>
                </div>
                <ul className="sample-checks">
                  <li>
                    <CircleAlert size={13} />
                    An upfront payment request
                  </li>
                  <li>
                    <CircleAlert size={13} />
                    Pressure to make a quick decision
                  </li>
                </ul>
              </div>
            </div>
            <div className="floating-note">
              <ShieldCheck size={23} />
              <span>
                <strong>You’re in control.</strong> Understand the signals before deciding.
              </span>
            </div>
          </div>
        </div>
      </section>
      <div className="container trust-strip">
        <div>
          <LockKeyhole size={18} />
          Privacy-conscious by design
        </div>
        <div>
          <Eye size={19} />
          Explanations you can understand
        </div>
        <div>
          <BadgeHelp size={19} />
          Clear about what we don’t know
        </div>
      </div>
      <section className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <span />A second look goes a long way
            </p>
            <h2>One less thing to wonder about.</h2>
          </div>
          <p>Simple checks for the messages and links that come with a job search.</p>
        </div>
        <div className="cards-grid">
          {tools.map(({ icon: Icon, ...tool }) => (
            <article className="feature-card" key={tool.title}>
              <span className="feature-icon">
                <Icon size={23} strokeWidth={1.6} />
              </span>
              <h3>{tool.title}</h3>
              <p>{tool.description}</p>
              <TextLink href={tool.href}>{tool.action}</TextLink>
            </article>
          ))}
        </div>
      </section>
      <section className="section how-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span />
                From doubt to a next step
              </p>
              <h2>A little context. A lot more clarity.</h2>
            </div>
            <TextLink href="/how-it-works">Explore how it works</TextLink>
          </div>
          <div className="steps-grid">
            {[
              [
                '01',
                'Bring the question.',
                'Paste the offer, email address, or link you’re unsure about. Leave out personal details that aren’t needed.',
              ],
              [
                '02',
                'Understand the signals.',
                'Read the findings and why they matter. Every review explains the checks performed and their limitations.',
              ],
              [
                '03',
                'Choose your next move.',
                'Use practical next steps to contact the employer independently, ask better questions, and make an informed decision.',
              ],
            ].map(([number, title, description]) => (
              <div key={number}>
                <span className="step-number">{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section container split-section">
        <div>
          <p className="eyebrow">
            <span />
            Good questions deserve clear answers
          </p>
          <h2>
            Trust starts with
            <br />
            <span className="serif">being transparent.</span>
          </h2>
          <p className="lead">
            No magic safety score. No promise that a green check makes everything okay. Just useful
            context, with the limitations in plain sight.
          </p>
          <TextLink href="/trustscore">Read our approach</TextLink>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="container">
        <div className="cta-panel">
          <div>
            <p className="eyebrow" style={{ marginBottom: 12 }}>
              <Sparkles size={14} />
              Your career. Your call.
            </p>
            <h2>Move forward with a little more clarity.</h2>
            <p>Start with the offer that’s on your mind.</p>
          </div>
          <ButtonLink href="/job-scanner">
            Check an offer <ArrowRight size={17} />
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
