'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, Zap, CheckCircle2, XCircle
} from 'lucide-react';
import HeroWidget from '../components/home/HeroWidget';
import Pricing from '../components/home/Pricing';
import FAQ from '../components/home/FAQ';

export default function Home() {
  const [viewState, setViewState] = useState<'with' | 'without'>('without');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-white dark:bg-[#0A0F1C] text-slate-900 dark:text-slate-200 pt-32 pb-20 relative overflow-hidden transition-colors duration-300">
      
      {/* Background Glows */}
      <div className="absolute top-20 left-[-10%] w-[40%] h-[500px] bg-blue-500/10 dark:bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[400px] bg-indigo-500/10 dark:bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- HERO & WIDGET SECTION --- */}
        <HeroWidget />

        {/* --- TRUST GAP STATS --- */}
        <div className="mb-40 pt-20 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-4 transition-colors">
            The trust gap is <br/><span className="text-slate-400 dark:text-slate-500">costing you hires.</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-16 max-w-2xl text-lg transition-colors">
            Sophisticated candidates are suspicious of every message. If they can't verify you in 5 seconds, they ignore the offer.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 transition-colors shadow-sm dark:shadow-none">
              <h3 className="text-5xl font-black text-slate-900 dark:text-white mb-4 transition-colors">40%</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed transition-colors">of candidates ignore recruiter messages out of scam fear.</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 transition-colors shadow-sm dark:shadow-none">
              <h3 className="text-5xl font-black text-slate-900 dark:text-white mb-4 transition-colors">1 in 8</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed transition-colors">job offers online is fraudulent in Southeast Asia.</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 transition-colors shadow-sm dark:shadow-none">
              <h3 className="text-5xl font-black text-slate-900 dark:text-white mb-4 transition-colors">5 sec</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed transition-colors">is all it takes a candidate to verify with a Verification Link.</p>
            </div>
          </div>
        </div>

        {/* --- FEATURES (Verifiable Link) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-40">
          <div className="lg:col-span-1 space-y-4">
            <button className="text-left w-full px-4 py-3 bg-white dark:bg-slate-800/50 text-indigo-600 dark:text-white font-bold rounded-lg border border-indigo-100 dark:border-slate-700 text-sm shadow-sm dark:shadow-none transition-all">Verifiable Identity Link</button>
            <button className="text-left w-full px-4 py-3 text-slate-500 hover:text-indigo-600 dark:hover:text-slate-300 font-bold rounded-lg text-sm transition-colors">Domain Protection</button>
            <button className="text-left w-full px-4 py-3 text-slate-500 hover:text-indigo-600 dark:hover:text-slate-300 font-bold rounded-lg text-sm transition-colors">Instant Staff Lookup</button>
            <button className="text-left w-full px-4 py-3 text-slate-500 hover:text-indigo-600 dark:hover:text-slate-300 font-bold rounded-lg text-sm transition-colors">Works Everywhere</button>
          </div>

          <div className="lg:col-span-3 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-12 shadow-sm dark:shadow-none transition-colors">
            <div className="flex items-center gap-3 text-indigo-600 dark:text-cyan-400 mb-6 transition-colors">
              <ShieldCheck size={24} /> <span className="font-bold tracking-widest text-[10px] uppercase">Core Feature</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 transition-colors">Verifiable Identity Link</h3>
            <p className="text-indigo-600 dark:text-cyan-400 font-bold text-sm mb-6 transition-colors">One URL. Every channel. Instant trust.</p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-2xl transition-colors">
              A single, permanent URL (credify.app/verify/your-brand) that candidates check in under 5 seconds. Share it in every email signature, LinkedIn message, and job posting. When candidates click it, they land on your verified company page — not a look-alike.
            </p>

            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-6 font-mono text-sm space-y-6 shadow-inner transition-colors">
              <div>
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1 transition-colors">
                  <CheckCircle2 size={16} /> credify.app/verify/acme-recruiting
                </div>
                <div className="text-slate-400 dark:text-slate-500 text-xs ml-6 transition-colors">Verified company profile</div>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-800 pt-4 transition-colors">
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 mb-1 transition-colors">
                  <XCircle size={16} /> acme-recruiting-jobs.xyz
                </div>
                <div className="text-slate-400 dark:text-slate-500 text-xs ml-6 transition-colors">Impersonator detected</div>
              </div>
            </div>
          </div>
        </div>

        {/* --- CLAIM PROFILE / GO LIVE --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-40">
          <div className="bg-indigo-600 dark:bg-white rounded-2xl p-10 shadow-2xl relative transition-colors">
            <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center mb-8 border-4 border-indigo-400 dark:border-slate-100 transition-colors">
              <ShieldCheck size={32} className="text-indigo-600 dark:text-cyan-400" />
            </div>
            <h3 className="text-4xl font-black text-white dark:text-slate-900 mb-4 leading-tight transition-colors">Claim Your Free Credify Company Profile</h3>
            <p className="text-indigo-100 dark:text-slate-600 mb-12 transition-colors">Protect your employer brand from job scammers and show applicants your listings are 100% secure.</p>
            <div className="absolute bottom-6 right-6 text-[10px] font-bold text-indigo-300 dark:text-slate-400 flex items-center gap-1 transition-colors">Made with Credify <Zap size={10}/></div>
          </div>

          <div className="space-y-12 pl-0 md:pl-8">
            <div className="relative">
              <div className="text-indigo-600 dark:text-cyan-500 font-black text-sm mb-2 transition-colors">01</div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">Submit domain details</h4>
              <p className="text-slate-600 dark:text-slate-400 transition-colors">Fill out the fast verification form with your official company email and domain records.</p>
            </div>
            <div className="relative">
              <div className="text-indigo-600 dark:text-cyan-500 font-black text-sm mb-2 transition-colors">02</div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">Manual review</h4>
              <p className="text-slate-600 dark:text-slate-400 transition-colors">Our team checks domain ownership and company legitimacy within 24 hours.</p>
            </div>
            <div className="relative">
              <div className="text-indigo-600 dark:text-cyan-500 font-black text-sm mb-2 transition-colors">03</div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">Go live</h4>
              <p className="text-slate-600 dark:text-slate-400 transition-colors">Your verification page publishes. Share the URL everywhere.</p>
            </div>
          </div>
        </div>

        {/* --- PRICING --- */}
        <Pricing />

        {/* --- FAQ & INTEGRATION --- */}
        <FAQ />

      </div>
    </main>
  );
}