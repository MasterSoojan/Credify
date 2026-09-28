import { ArrowRight, CircleAlert, FileText } from 'lucide-react';
import Link from 'next/link';

export function OfferPreview() {
  return (
    <div className="hero-visual" aria-label="A fictional offer and example findings">
      <div className="sample-card">
        <div className="sample-card-top">
          <span>
            <FileText size={16} aria-hidden="true" /> An offer lands in your inbox
          </span>
          <span className="sample-label">Example</span>
        </div>
        <div className="sample-body">
          <blockquote className="sample-email">
            “Congratulations! You’ve been selected. Please pay a{' '}
            <mark className="payment-highlight">registration fee</mark> to secure your position.
            Reply <mark>within 2 hours</mark> to confirm.”
          </blockquote>
          <div className="sample-result">
            <span className="status-icon">
              <CircleAlert size={22} aria-hidden="true" />
            </span>
            <div>
              <strong>Worth a closer look.</strong>
              <p>A payment request. Pressure to act quickly.</p>
            </div>
          </div>
          <p className="preview-next">
            <strong>Your next step</strong> Confirm the role through the employer’s own website
            before paying or sharing documents.
          </p>
          <Link href="/demo" className="preview-demo">
            Try the full example <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <p className="preview-caption">
        Fictional example. Findings guide a check; they don’t prove fraud.
      </p>
    </div>
  );
}
