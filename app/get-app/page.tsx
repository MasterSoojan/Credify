import type { Metadata } from 'next';
import { Download, Smartphone } from 'lucide-react';
import { InformationPage } from '@/components/InformationPage';
import { Notice, ButtonLink } from '@/components/ui';
export const metadata: Metadata = { title: 'Android companion preview' };
export default function GetAppPage() {
  return (
    <InformationPage
      eyebrow="Android companion preview"
      title="Another idea for your everyday toolkit."
      description="GuardianDialer is an experimental Android companion distributed separately from the Credify web app."
    >
      <Notice tone="warning" title="Experimental download">
        The APK is provided for preview evaluation. Its code, permissions, and behavior are separate
        from this web application; the web review does not certify the APK. Review the permissions
        on your device before deciding to install.
      </Notice>
      <section className="prose-section">
        <h2>GuardianDialer for Android</h2>
        <p>
          The current download is V2_GuardianDialer.apk. This site does not offer an iOS version or
          a store-managed update channel.
        </p>
        <div className="button-row" style={{ marginTop: 22 }}>
          <a className="button button-primary" href="/V2_GuardianDialer.apk" download>
            <Download size={16} />
            Download Android preview
          </a>
          <a className="text-link" href="/downloads.sha256">
            Check file checksum
          </a>
        </div>
      </section>
      <section className="prose-section">
        <h2>No download needed for offer checks.</h2>
        <p>
          The Credify web scanner works in your browser on a phone or computer. Use it to review a
          message, email domain, or link without installing an app.
        </p>
        <div style={{ marginTop: 22 }}>
          <ButtonLink href="/job-scanner" variant="secondary">
            <Smartphone size={16} />
            Open the web scanner
          </ButtonLink>
        </div>
      </section>
    </InformationPage>
  );
}
