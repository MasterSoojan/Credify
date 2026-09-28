import type { Metadata } from 'next';
import { AccountPanel } from '@/components/account/AccountPanel';
import { PageIntro } from '@/components/ui';
import { getFeatures } from '@/lib/config';
export const metadata: Metadata = { title: 'Settings' };
export const dynamic = 'force-dynamic';
export default function AccountPage() {
  return (
    <main className="container page-main">
      <PageIntro
        eyebrow="Your account"
        title="A little care for your account."
        description="Manage your password and account security in one place."
      />
      <AccountPanel available={getFeatures().accounts} settings={true} />
    </main>
  );
}
