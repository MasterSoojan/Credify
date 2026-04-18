'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Search, 
  MessageSquare, 
  FileText, 
  ShieldAlert, 
  Terminal, 
  ChevronDown,
  Mail
} from 'lucide-react';

// Mock FAQ Data
const faqs = [
  {
    question: "Is Credify completely free for students?",
    answer: "Yes. Credify is 100% free for job seekers and always will be. Our mission is to protect students, so the costs are covered by our B2B employer verification services."
  },
  {
    question: "How exactly does the TrustScore work?",
    answer: "The TrustScore is powered by a forensic engine that analyzes over 15 data points in real-time. It checks domain registration dates, cross-references official company MX records, scans document metadata for tampering, and checks our crowdsourced ledger for previously reported scams."
  },
  {
    question: "I received an offer that scored 'High Risk'. What do I do?",
    answer: "Immediately cease communication with the sender. Do NOT pay any 'registration' or 'equipment' fees. Use the 'Report Scam' button on the results page to add the sender to our global blocklist to protect other students."
  },
  {
    question: "How can my company get a Verified Trust Badge?",
    answer: "Employers can apply for a Trust Badge through our Employer Portal. We require official business registration documents and domain ownership verification. Once approved, your badge goes live in under 24 hours."
  }
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 pt-32 pb-20 relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        <Link 
          href="/" 
          className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-slate-400 hover:text-white transition-colors mb-10 w-fit"
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
            How can we help?
          </h1>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative flex items-center bg-slate-900/80 border border-slate-700/80 rounded-2xl p-2 backdrop-blur-xl focus-within:border-cyan-500/50 focus-within:ring-1 focus-within:ring-cyan-500/20 transition-all shadow-xl">
            <div className="pl-4 pr-3 text-slate-400">
              <Search size={22} />
            </div>
            <input
              type="text"
              placeholder="Search for articles, guides, or FAQs..."
              className="flex-grow bg-transparent border-none outline-none text-white placeholder-slate-500 px-2 py-2 text-base w-full"
            />
          </div>
        </div>

        {/* Quick Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
          <div className="bg-slate-900/50 border border-white/5 hover:border-slate-600 transition-colors rounded-2xl p-6 cursor-pointer group">
            <div className="bg-cyan-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="text-cyan-400" size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">General Guide</h3>
            <p className="text-sm text-slate-400">Learn how to use the scanner and interpret your results.</p>
          </div>
          
          <div className="bg-slate-900/50 border border-white/5 hover:border-slate-600 transition-colors rounded-2xl p-6 cursor-pointer group">
            <div className="bg-rose-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ShieldAlert className="text-rose-400" size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Report a Scam</h3>
            <p className="text-sm text-slate-400">Submit fraudulent offer letters to our global database.</p>
          </div>

          <div className="bg-slate-900/50 border border-white/5 hover:border-slate-600 transition-colors rounded-2xl p-6 cursor-pointer group">
            <div className="bg-emerald-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MessageSquare className="text-emerald-400" size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Employer Verification</h3>
            <p className="text-sm text-slate-400">Help for companies setting up their Trust Profile.</p>
          </div>

          <div className="bg-slate-900/50 border border-white/5 hover:border-slate-600 transition-colors rounded-2xl p-6 cursor-pointer group">
            <div className="bg-indigo-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Terminal className="text-indigo-400" size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">API Documentation</h3>
            <p className="text-sm text-slate-400">Technical support for B2B platform integration.</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <h2 className="text-2xl font-black text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden transition-all"
              >
                <button 
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-bold text-white pr-4">{faq.question}</span>
                  <ChevronDown 
                    className={`text-slate-400 transition-transform duration-300 shrink-0 ${openFaq === index ? 'rotate-180' : ''}`} 
                    size={20} 
                  />
                </button>
                <div 
                  className={`px-6 text-sm text-slate-400 leading-relaxed transition-all duration-300 ease-in-out ${
                    openFaq === index ? 'pb-6 opacity-100 max-h-40' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-br from-cyan-900/20 to-slate-900 border border-cyan-500/20 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Still need help?</h2>
          <p className="text-slate-400 text-sm mb-8 max-w-md mx-auto">
            Our security team is available 24/7 to help you verify suspicious offers or set up your employer profile.
          </p>
          <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-8 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)] inline-flex items-center gap-2">
            <Mail size={18} /> Contact Support
          </button>
        </div>

      </div>
    </main>
  );
}