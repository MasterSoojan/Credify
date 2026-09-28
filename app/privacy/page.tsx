import type { Metadata } from 'next';
import { InformationPage } from '@/components/InformationPage';
export const metadata: Metadata = { title: 'Privacy' };
export default function PrivacyPage() {
  return (
    <InformationPage
      eyebrow="Your information"
      title="Know what you’re sharing."
      description="This explains the current Credify web application. Last updated September 27, 2026."
    >
      <section className="prose-section">
        <h2>Basic offer checks stay in your browser.</h2>
        <p>
          Text, email, and link checks in the basic scanner run on your device. Their contents are
          not uploaded to our server or sent to an AI provider. Results are kept in page memory and
          cleared on navigation or refresh. Copying a report places it on your device’s clipboard.
        </p>
      </section>
      <section className="prose-section">
        <h2>Optional AI processing</h2>
        <p>
          If AI analysis is available and you choose it, the submitted text or file is sent to
          Credify’s server and Google Gemini. Credify processes it in memory without intentionally
          saving the raw input or report. Google’s processing and retention depend on the configured
          service and account terms; do not assume zero retention by the provider.
        </p>
        <p>
          Remove personal details that are unnecessary for the review. Never submit passwords,
          one-time codes, or material you do not have permission to share. See{' '}
          <a href="https://ai.google.dev/gemini-api/terms" target="_blank" rel="noreferrer">
            Gemini API terms
          </a>{' '}
          for provider information.
        </p>
      </section>
      <section className="prose-section">
        <h2>Accounts and service protection</h2>
        <p>
          When account services are enabled, Supabase processes sign-in credentials and stores your
          email and profile. Your password is managed by Supabase Auth, not stored in the profile
          table. Authentication uses secure session cookies in production.
        </p>
        <p>
          Request counters used to limit account and AI requests are stored with hashed identifiers
          when the shared limit service is enabled. Operational logs include request IDs, timing,
          and error categories. Application logging does not intentionally include submitted offer
          content, passwords, or full email addresses. The hosting provider may independently retain
          technical request logs.
        </p>
      </section>
      <section className="prose-section">
        <h2>Browser storage and external sites</h2>
        <p>
          The site saves your light/dark theme preference in browser storage. It does not include
          advertising trackers or third-party analytics. External resources and Android downloads
          have their own behavior and privacy considerations. This page describes the web app only.
        </p>
      </section>
      <section className="prose-section">
        <h2>Manage your information</h2>
        <p>
          When account services are available, edit your profile or delete your account from
          security settings. Deletion removes the active Auth account and linked profile. Provider
          logs and backups may follow their own retention schedules. For this preview, contact the
          person who shared Credify with you if you need additional help. Do not send sensitive
          documents through a public issue report.
        </p>
      </section>
    </InformationPage>
  );
}
