import { PageIntro, ButtonLink } from '@/components/ui';
export default function NotFound() {
  return (
    <main className="container page-main">
      <PageIntro
        eyebrow="A small detour"
        title="That page isn’t here."
        description="The address may have changed, or the company record may no longer be publicly available. Let’s get you back to somewhere useful."
      />
      <div className="button-row">
        <ButtonLink href="/job-scanner">Check an offer</ButtonLink>
        <ButtonLink href="/" variant="secondary">
          Back to home
        </ButtonLink>
      </div>
    </main>
  );
}
