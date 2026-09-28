import type { Metadata } from 'next';
import { PageIntro, TextLink } from '@/components/ui';
export const metadata: Metadata = { title: 'Tools & roadmap' };
const products = [
  {
    title: 'Offer text review',
    status: 'Available · no account',
    text: 'A local review of selected language patterns, with explicit limitations.',
    href: '/job-scanner',
    action: 'Review text',
  },
  {
    title: 'Email domain check',
    status: 'Available · no account',
    text: 'Inspect a written domain. This does not authenticate a sender.',
    href: '/job-scanner?type=email',
    action: 'Check an email',
  },
  {
    title: 'Link structure check',
    status: 'Available · no account',
    text: 'Understand a hostname and protocol without opening the website.',
    href: '/instant-verify',
    action: 'Inspect a link',
  },
  {
    title: 'AI document analysis',
    status: 'Availability varies',
    text: 'Optional, consent-based review of small PDF and image documents when account and AI services are active.',
    href: '/job-scanner?type=document',
    action: 'Check availability',
  },
  {
    title: 'Employer registry',
    status: 'Preview',
    text: 'Public, reviewed company records with clear verification dates and methods, when the registry is available.',
    href: '/search',
    action: 'View registry',
  },
  {
    title: 'Browser companion',
    status: 'Planned',
    text: 'An extension concept for helping people pause and check recruiter messages.',
    href: '/browser-extension',
    action: 'See the concept',
  },
];
export default function VerifiersPage() {
  return (
    <main className="container page-main">
      <PageIntro
        eyebrow="What’s here. What’s next."
        title="Small tools. Useful perspective."
        description="A transparent view of what Credify currently offers and what is still being developed."
      />
      <div className="cards-grid">
        {products.map((product) => (
          <article className="feature-card" key={product.title}>
            <span className="badge" style={{ marginBottom: 22 }}>
              {product.status}
            </span>
            <h2 style={{ fontSize: 20, marginBottom: 12 }}>{product.title}</h2>
            <p>{product.text}</p>
            <TextLink href={product.href}>{product.action}</TextLink>
          </article>
        ))}
      </div>
    </main>
  );
}
