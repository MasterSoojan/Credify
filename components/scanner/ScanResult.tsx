'use client';

import { useState } from 'react';
import { CircleAlert, CircleHelp, Copy, Check, Info, Pencil } from 'lucide-react';
import type { ScanResult as Result } from '@/lib/verification/contracts';
import { Button, Notice, TextLink } from '@/components/ui';

export function ScanResult({ result, onEdit }: { result: Result; onEdit: () => void }) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState('');
  const warning = result.status === 'attention';
  async function copyReport() {
    try {
      const report = [
        `Credify review · ${result.id}`,
        `Checked: ${result.checkedAt}`,
        `Method: ${result.source}`,
        '',
        result.summary,
        '',
        ...result.findings.map((item) => `${item.title}\n${item.detail}`),
        '',
        'Next steps',
        ...result.nextSteps,
        '',
        'Limitations',
        ...result.limitations,
      ].join('\n');
      await navigator.clipboard.writeText(report);
      setCopied(true);
      setCopyError('');
    } catch {
      setCopyError(
        'Copy is unavailable in this browser. You can select and copy the report text instead.',
      );
    }
  }
  return (
    <article className="result-card">
      <div className="result-top">
        <span className="badge">
          {result.source === 'ai'
            ? 'AI-assisted review'
            : result.source === 'example'
              ? 'Example · basic review'
              : 'Basic review'}
        </span>
        <time className="small muted" dateTime={result.checkedAt}>
          {new Date(result.checkedAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </time>
      </div>
      <div className={`result-overview ${warning ? 'result-overview-warning' : ''}`}>
        <div className={`result-heading ${warning ? 'result-warning' : ''}`}>
          {warning ? <CircleAlert size={28} /> : <CircleHelp size={28} />}
          <h2>{warning ? 'Worth a closer look.' : 'There’s more to verify.'}</h2>
        </div>
        <p className="result-summary">{result.summary}</p>
      </div>
      {result.findings.length > 0 && (
        <section className="result-section">
          <h3>
            What we noticed <span>{result.findings.length}</span>
          </h3>
          <div className="findings">
            {result.findings.map((finding, index) => (
              <div className={`finding finding-${finding.severity}`} key={`${finding.id}-${index}`}>
                {finding.severity === 'warning' ? <CircleAlert size={17} /> : <Info size={17} />}
                <div>
                  <h4>{finding.title}</h4>
                  {finding.evidence && <blockquote>{finding.evidence}</blockquote>}
                  <p>{finding.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      <section className="result-section">
        <h3>Your next steps</h3>
        <ol className="next-steps">
          {result.nextSteps.map((step, index) => (
            <li key={step}>
              <span>{index + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </section>
      <section className="result-limitations">
        <h3>What this review can’t tell you</h3>
        <ul>
          {result.limitations.map((limitation) => (
            <li key={limitation}>{limitation}</li>
          ))}
        </ul>
      </section>
      <div className="result-actions">
        <div className="button-row">
          <Button variant="secondary" onClick={copyReport}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Report copied' : 'Copy report'}
          </Button>
          <Button variant="quiet" onClick={onEdit}>
            <Pencil size={16} /> Edit input
          </Button>
        </div>
        <TextLink href="/emergency-guide">Need help now?</TextLink>
      </div>
      <div aria-live="polite" className="small muted">
        {copied && 'Copied to your clipboard.'}
      </div>
      {copyError && <Notice tone="error">{copyError}</Notice>}
      <p className="result-reference">
        Review {result.id.slice(0, 8)} · Method {result.version} · Not saved by Credify
      </p>
    </article>
  );
}
