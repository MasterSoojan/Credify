import { FileText, Search, MessageSquare } from 'lucide-react';

export function ReviewSteps() {
  return (
    <ol className="review-steps" aria-label="From offer to next step">
      <li className="review-step-input">
        <span className="review-step-number" aria-hidden="true">
          01
        </span>
        <div className="review-step-card">
          <FileText size={22} aria-hidden="true" />
          <h3>Paste what you received.</h3>
          <p>
            Choose offer text, a recruiter’s email, or a link. Leave out personal details you don’t
            need to share.
          </p>
          <div className="step-example">
            <span className="step-example-label">Example offer text</span>
            <blockquote>
              “To secure your position, please pay a registration fee of $150.”
            </blockquote>
          </div>
        </div>
      </li>
      <li className="review-step-caution">
        <span className="review-step-number" aria-hidden="true">
          02
        </span>
        <div className="review-step-card">
          <Search size={22} aria-hidden="true" />
          <h3>See what needs a closer look.</h3>
          <p>
            Get specific findings, the language behind them, and why each one matters. No
            unexplained score.
          </p>
          <div className="step-example step-example-warning">
            <span className="step-example-label">A finding you can understand</span>
            <strong>A payment request</strong>
            <p>Paying to secure a role deserves an independent check before you act.</p>
          </div>
        </div>
      </li>
      <li className="review-step-action">
        <span className="review-step-number" aria-hidden="true">
          03
        </span>
        <div className="review-step-card">
          <MessageSquare size={22} aria-hidden="true" />
          <h3>Know what to ask next.</h3>
          <p>
            Use the suggested next steps to confirm the opportunity through contact details you find
            independently.
          </p>
          <div className="step-example">
            <span className="step-example-label">Ask the employer directly</span>
            <blockquote>
              “Is this role on your careers page, and does your hiring process require a fee?”
            </blockquote>
          </div>
        </div>
      </li>
    </ol>
  );
}
