import type { ReactNode } from 'react';
import { PageIntro, TextLink } from '@/components/ui';

/** Shared article geometry, not a CMS: each route keeps its content and metadata explicit. */
export function InformationPage({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="container page-main">
      <PageIntro eyebrow={eyebrow} title={title} description={description} />
      <div className="information-layout">
        <div>{children}</div>
        <aside className="information-aside">
          <p className="eyebrow">
            <span />
            Take the next step
          </p>
          <h2>
            A second look
            <br />
            <span className="heading-accent">can help.</span>
          </h2>
          <p>Start with the message or link that raised a question.</p>
          <TextLink href="/job-scanner">Check an offer</TextLink>
          <hr />
          <TextLink href="/emergency-guide">Already shared information?</TextLink>
        </aside>
      </div>
    </main>
  );
}
