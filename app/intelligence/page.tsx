'use client';

import Link from 'next/link';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Radar, 
  Search, 
  ArrowRight,
  Clock
} from 'lucide-react';

export default function IntelligencePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0A0F1C] text-slate-900 dark:text-slate-200 pt-32 pb-20 relative overflow-hidden transition-colors duration-300">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-[500px] bg-blue-500/10 dark:bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Top Navigation Row */}
        <div className="flex items-center justify-between mb-16">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to Scanner
          </Link>
          
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500">
            <ShieldCheck size={14} className="text-slate-400 dark:text-slate-400" /> Credify Security
          </div>
        </div>

        {/* Threat Label */}
        <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-rose-600 dark:text-rose-500 mb-4">
          <Radar size={14} /> Threat Intelligence
        </div>

        {/* Header Area (Title & Search) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-wide mb-3">
              Security Briefings
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
              Forensic analysis of the latest recruitment fraud tactics.
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex items-center bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 rounded-xl px-4 py-3 w-full lg:w-80 backdrop-blur-md focus-within:border-indigo-500 dark:focus-within:border-cyan-500/50 focus-within:ring-2 focus-within:ring-indigo-500/20 dark:focus-within:ring-cyan-500/20 transition-all shadow-sm">
            <Search size={18} className="text-slate-400 mr-3" />
            <input
              type="text"
              placeholder="Search threat database..."
              className="bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm w-full"
            />
            <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors ml-2">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          <div className="bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 rounded-2xl py-8 flex flex-col items-center justify-center backdrop-blur-sm shadow-sm dark:shadow-none">
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">714+</h3>
            <p className="text-[10px] font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">Scans Detected</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 rounded-2xl py-8 flex flex-col items-center justify-center backdrop-blur-sm shadow-sm dark:shadow-none">
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">12</h3>
            <p className="text-[10px] font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">Threat Briefings</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 rounded-2xl py-8 flex flex-col items-center justify-center backdrop-blur-sm shadow-sm dark:shadow-none">
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">400%</h3>
            <p className="text-[10px] font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">Rise in Telegram Scams</p>
          </div>
        </div>

        {/* Featured Article Card */}
        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 rounded-3xl p-1 relative overflow-hidden group cursor-pointer hover:border-indigo-400 dark:hover:border-slate-600 transition-colors shadow-lg">
          <div className="bg-white dark:bg-slate-800/40 rounded-[22px] p-8 md:p-12 h-full relative z-10 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                Threat Intelligence
              </span>
              <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-semibold">
                <Clock size={14} /> 8 min read
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors">
              The "Deloitte" Telegram Syndicate: How synthetic offers are bypassing standard filters.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
              A deep dive into the recent surge of highly coordinated placement scams targeting computer science students. We analyze the metadata of 50+ fake offer letters to reveal the template signatures the scammers left behind.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}