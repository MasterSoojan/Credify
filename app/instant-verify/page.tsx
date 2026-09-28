import type { Metadata } from 'next';
import { Scanner } from '@/components/scanner/Scanner';
import { PageIntro } from '@/components/ui';
export const metadata: Metadata = { title: 'Inspect a link' };
export default function LinkPage() {
  return (
    <main className="container page-main">
      <PageIntro
        eyebrow="Look before you click"
        title="Where does that link really point?"
        description="Inspect a website address without opening it. This basic check explains the link’s structure; it does not scan for malware or verify a company."
      />
      <Scanner initialType="url" />
    </main>
  );
}
