import './globals.css';
import { ThemeProvider } from '../components/ThemeProvider';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Look at the line below - the suppressHydrationWarning is vital!
    <html lang="en" suppressHydrationWarning> 
      <body className="bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}