import Link from 'next/link';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';

const groups = [
  {
    title: 'Make your next move',
    links: [
      ['Check an offer', '/job-scanner'],
      ['Try an example', '/demo'],
      ['How it works', '/how-it-works'],
    ],
  },
  {
    title: 'Stay informed',
    links: [
      ['Safety hub', '/help-center'],
      ['Already shared information?', '/emergency-guide'],
      ['Contact & support', '/support'],
    ],
  },
  {
    title: 'About Credify',
    links: [
      ['For employers', '/employers'],
      ['Our approach', '/trustscore'],
      ['Product roadmap', '/verifiers'],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link className="brand" href="/">
              <span className="brand-mark">
                <ShieldCheck size={23} />
              </span>
              credify<span className="brand-dot">.</span>
            </Link>
            <p>
              A little clarity.
              <br />A more confident next step.
            </p>
            <span className="footer-note">Built for the people behind the application.</span>
          </div>
          {groups.map((group) => (
            <div className="footer-group" key={group.title}>
              <h2>{group.title}</h2>
              {group.links.map(([label, href]) => (
                <Link href={href} key={href}>
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Credify. Stay curious. Check independently.</p>
          <div>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/security">
              Report an issue <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
