import type { Metadata } from 'next';
import { Compass, CircleHelp, LifeBuoy, BookOpen, Fingerprint, ShieldCheck } from 'lucide-react';
import { PageIntro, TextLink, ButtonLink } from '@/components/ui';
import Chatbot from '@/components/Chatbot';
import { getFeatures } from '@/lib/config';
export const metadata: Metadata = { title: 'Safety hub' };
export const dynamic = 'force-dynamic';
const guides = [
  {
    icon: Compass,
    title: 'Start with the basics',
    text: 'Know what to check in a recruiter message, and what a basic review can tell you.',
    href: '/how-it-works',
    action: 'Understand the checks',
  },
  {
    icon: Fingerprint,
    title: 'Look beyond the logo',
    text: 'Why polished documents and familiar company names do not establish identity.',
    href: '/trustscore',
    action: 'Read our approach',
  },
  {
    icon: LifeBuoy,
    title: 'Already shared something?',
    text: 'Practical next steps when you have sent money, credentials, or identity information.',
    href: '/emergency-guide',
    action: 'Find your next step',
  },
  {
    icon: BookOpen,
    title: 'Learn with an example',
    text: 'Explore a fictional offer and see the same review process used for your own messages.',
    href: '/demo',
    action: 'Try the walkthrough',
  },
  {
    icon: CircleHelp,
    title: 'Using your account',
    text: 'Help with sign-in, password recovery, unavailable services, and common questions.',
    href: '/support',
    action: 'Get product help',
  },
  {
    icon: ShieldCheck,
    title: 'Protect your information',
    text: 'Understand what stays on your device and what optional AI processing involves.',
    href: '/privacy',
    action: 'Read about privacy',
  },
];
export default function HelpCenterPage() {
  return (
    <main className="container page-main">
      <PageIntro
        eyebrow="Your safety hub"
        title="A little knowledge goes a long way."
        description="Practical guidance for the questions that come with a job search. Choose the place that feels most useful right now."
      />
      <div className="cards-grid">
        {guides.map(({ icon: Icon, ...guide }) => (
          <article className="feature-card" key={guide.href}>
            <span className="feature-icon">
              <Icon size={23} />
            </span>
            <h2 style={{ fontSize: 20, marginBottom: 12 }}>{guide.title}</h2>
            <p>{guide.text}</p>
            <TextLink href={guide.href}>{guide.action}</TextLink>
          </article>
        ))}
      </div>
      <div className="resource-band">
        <div>
          <p className="eyebrow">
            <span />
            Go to the source
          </p>
          <h2>Independent guidance matters.</h2>
          <p>
            The U.S. Federal Trade Commission explains common job scam patterns, including payment
            demands and fake checks.
          </p>
        </div>
        <a
          className="button button-secondary"
          href="https://consumer.ftc.gov/articles/job-scams"
          target="_blank"
          rel="noreferrer"
        >
          Read the FTC’s job scam guide ↗
        </a>
      </div>
      <Chatbot available={getFeatures().ai} />
      <div className="button-row" style={{ marginTop: 32 }}>
        <ButtonLink href="/job-scanner">Ready to check an offer?</ButtonLink>
      </div>
    </main>
  );
}
