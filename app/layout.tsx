import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Or whatever font you are using
import "./globals.css"; // Add this import
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; // Add this line!
const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0A0F1C] text-slate-200 antialiased min-h-screen pt-20 flex flex-col`}>
        
        <Navbar />
        
        {/* Your page content (like the Employers page) loads here */}
        <div className="flex-grow">
          {children}
        </div>

        {/* The Footer stays at the very bottom of every page! */}
        <Footer />
        
      </body>
    </html>
  );
}
