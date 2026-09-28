import type { Metadata } from 'next';
import { AccountPanel } from '@/components/account/AccountPanel';
import { PageIntro } from '@/components/ui';
import { getFeatures } from '@/lib/config';
export const metadata: Metadata = { title: 'Profile' };
export const dynamic = 'force-dynamic';
export default function AccountPage() {
  return (
    <main className="container page-main">
      <PageIntro
        eyebrow="Your account"
        title="Your space. Your next step."
        description="Manage the details that make your Credify account yours."
      />
      <AccountPanel available={getFeatures().accounts} settings={false} />
    </main>
  );
}
