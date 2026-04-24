import type { Metadata } from "next";
// Load Inter font from Google Fonts for typography
import { Inter } from "next/font/google"; 
import "./globals.css"; // Global styles and Tailwind configuration
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; 
import { ThemeProvider } from "../components/ThemeProvider";
// Initialize the Inter font with latin subset
const inter = Inter({ subsets: ["latin"] });

// Global metadata configuration for SEO and page headers
export const metadata: Metadata = {
  title: "Credify - Digital Defense for Job Seekers",
  description: "Detect fake placement offers instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-50 dark:bg-[#0A0F1C] text-slate-900 dark:text-slate-200 antialiased min-h-screen pt-20 flex flex-col transition-colors duration-300`}>
        <ThemeProvider>
          <Navbar />
          
          {/* Your page content (like the Employers page) loads here */}
          <div className="flex-grow">
            {children}
          </div>

          {/* The Footer stays at the very bottom of every page! */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
