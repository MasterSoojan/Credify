import type { Metadata, Viewport } from 'next';
// Let Next track local styles directly; preserve feature-before-foundation cascade order.
import '@/styles/scanner.css';
import '@/styles/account.css';
import '@/styles/content.css';
import '@/styles/home-preview.css';
import '@/styles/review-steps.css';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: {
    default: 'Credify — Your next opportunity. A little more clarity.',
    template: '%s · Credify',
  },
  description:
    'Take a closer look at a job offer, recruiter email, or link. Understand the signals, know the limitations, and find your next step.',
};
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0f1c' },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <Navbar />
          <div id="main-content" tabIndex={-1}>
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
