'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Building2, Search, ArrowRight } from 'lucide-react';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <main className="min-h-screen bg-white dark:bg-[#0A0F1C] text-slate-900 dark:text-slate-200 pt-32 pb-20 flex flex-col items-center relative overflow-hidden transition-colors duration-300">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[60%] h-[300px] bg-blue-500/10 dark:bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center relative z-10">

        {/* Back Link */}
        <Link 
          href="/" 
          className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors mb-10"
        >
          <ArrowLeft size={14} /> Back to Scanner
        </Link>

        {/* Top Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-200 dark:border-cyan-500/30 bg-indigo-50/50 dark:bg-cyan-950/30 text-indigo-600 dark:text-cyan-400 text-[10px] font-bold tracking-widest uppercase mb-6 shadow-sm dark:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all">
          <CheckCircle2 size={14} /> Verified Employer Registry
        </div>

        {/* Headlines */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6 transition-colors">
          Verify Corporate Identity
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mb-12 text-sm md:text-base leading-relaxed transition-colors">
          Search our registry of audited employers. Only companies that have passed our identity verification process appear here.
        </p>

        {/* Search Bar Container */}
        <div className="w-full max-w-3xl relative flex items-center bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-2 mb-6 backdrop-blur-xl focus-within:border-indigo-500 dark:focus-within:border-cyan-500/50 focus-within:ring-2 focus-within:ring-indigo-500/20 dark:focus-within:ring-cyan-500/20 transition-all shadow-lg dark:shadow-xl dark:shadow-black/50">
          <div className="pl-4 pr-3 text-slate-400">
            <Building2 size={22} />
          </div>
          <input
            type="text"
            placeholder="Search for a company to verify (e.g. Acme Corp)..."
            className="flex-grow bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 px-2 text-base w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="flex items-center gap-2 bg-indigo-600 dark:bg-cyan-600 hover:bg-indigo-700 dark:hover:bg-cyan-500 text-white text-sm font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20 dark:shadow-cyan-900/30 shrink-0">
            Verify <ArrowRight size={16} />
          </button>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-24 transition-colors">
          <span className="text-slate-300 dark:text-slate-600">Try:</span>
          {['Google', 'Amazon', 'Meta', 'TikTok', 'Shopee', 'Grab'].map(company => (
            <button 
              key={company} 
              onClick={() => setSearchQuery(company)} 
              className="hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors"
            >
              {company}
            </button>
          ))}
        </div>

        {/* Empty State / Initial State */}
        <div className="flex flex-col items-center opacity-80 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800/80 rounded-2xl flex items-center justify-center mb-6 border border-slate-200 dark:border-slate-700/50 shadow-inner transition-colors">
            <Search size={28} className="text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 transition-colors">Enter a company name to verify</h3>
          <p className="text-sm text-slate-500 transition-colors">E.g. "Acme Corp", "Global Staffing Ltd"</p>
        </div>

      </div>
    </main>
  );
}