import type { Metadata } from 'next';
import { AuthForm } from '@/components/account/AuthForm';
import { getFeatures } from '@/lib/config';
export const metadata: Metadata = { title: 'Sign in' };
export const dynamic = 'force-dynamic';
export default async function AuthPage({
  searchParams,
}: {
  searchParams: Promise<{ notice?: string }>;
}) {
  const params = await searchParams;
  return (
    <AuthForm
      mode="login"
      available={getFeatures().accounts}
      expiredLink={params.notice === 'expired-link'}
    />
  );
}
