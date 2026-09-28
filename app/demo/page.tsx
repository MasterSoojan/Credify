import type { Metadata } from 'next';
import { Scanner } from '@/components/scanner/Scanner';
import { PageIntro } from '@/components/ui';
export const metadata: Metadata = { title: 'Try an example' };
export default function DemoPage() {
  return (
    <main className="container page-main">
      <PageIntro
        eyebrow="A fictional offer. A real walkthrough."
        title="See what a second look can reveal."
        description="We’ve added an example message with a few things worth questioning. Run a basic review, read the findings, then try changing the text."
      />
      <Scanner example />
    </main>
  );
}
