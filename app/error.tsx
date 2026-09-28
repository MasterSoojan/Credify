'use client';
import { Button, ButtonLink, PageIntro } from '@/components/ui';
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="container page-main">
      <PageIntro
        eyebrow="Let’s try that again"
        title="This page couldn’t load."
        description="Something interrupted the request. Try again, or return to the offer scanner."
      />
      <div className="button-row">
        <Button onClick={reset}>Try again</Button>
        <ButtonLink href="/job-scanner" variant="secondary">
          Go to offer checks
        </ButtonLink>
      </div>
    </main>
  );
}
