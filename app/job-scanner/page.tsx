import type { Metadata } from 'next';
import { Scanner } from '@/components/scanner/Scanner';
import { PageIntro } from '@/components/ui';
import { getFeatures } from '@/lib/config';
import type { ScanType } from '@/lib/verification/contracts';

export const metadata: Metadata = { title: 'Check an offer' };
export const dynamic = 'force-dynamic';

export default async function ScannerPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const initialType: ScanType =
    type === 'email' || type === 'url' || type === 'document' ? type : 'text';
  return (
    <main className="container page-main">
      <PageIntro
        eyebrow="A second perspective"
        title="Something feel a little off?"
        description="Bring the message, email, or link. We’ll help you understand what deserves a closer look — and where to go next."
      />
      <Scanner initialType={initialType} aiAvailable={getFeatures().ai} />
    </main>
  );
}
