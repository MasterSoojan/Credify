'use client';

import Link from 'next/link';
import { 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  XCircle, 
  QrCode, 
  Lock, 
  Clock, 
  Zap, 
  ArrowRight, 
  AlertCircle 
} from 'lucide-react';

export default function LiveDemoPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0A0F1C] text-slate-900 dark:text-slate-200 pt-28 pb-20 relative overflow-hidden transition-colors duration-300">
      
      {/* Background Glow */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[80%] h-150bg-blue-500/10 dark:bg-cyan-900/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-sm font-bold tracking-widest text-slate-500 dark:text-slate-300 uppercase transition-colors">Live Product Demo</h1>
          </div>
          <button className="bg-indigo-600 dark:bg-cyan-600 hover:bg-indigo-700 dark:hover:bg-cyan-500 text-white text-sm font-bold px-6 py-2.5 rounded-lg transition-all flex items-center gap-2 w-fit shadow-lg shadow-indigo-500/20">
            Create Your Profile <ArrowRight size={16} />
          </button>
        </div>

        {/* Ledger Badge */}
        <div className="flex flex-col items-center justify-center mb-8">
          <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-3 transition-colors">Identity Ledger</p>
          <div className="border border-indigo-200 dark:border-cyan-500/30 bg-indigo-50/50 dark:bg-cyan-950/30 rounded-full px-4 py-1.5 flex items-center gap-2 shadow-sm dark:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-cyan-400 animate-pulse" />
            <span className="text-xs font-bold text-indigo-600 dark:text-cyan-400 tracking-widest uppercase">Active Security Certificate</span>
          </div>
        </div>

        {/* --- MAIN CERTIFICATE CARD --- */}
        <div className="border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl dark:shadow-2xl mb-6 transition-all">
          
          {/* Header Section */}
          <div className="p-8 md:p-10 border-b border-slate-100 dark:border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 dark:bg-cyan-500/5 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-center shrink-0 transition-colors">
                  <ShieldCheck size={36} className="text-indigo-600 dark:text-cyan-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase mb-1 transition-colors">Employer Trust Record</p>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2 transition-colors">Credify Security Intelligence</h2>
                  <p className="text-xs font-mono text-slate-400 dark:text-slate-500 flex items-center gap-2 transition-colors">
                    ID: CRD-OFFICIAL-001 <ExternalLink size={12} />
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 bg-slate-50 dark:bg-slate-950/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 transition-colors">
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-md mb-2">
                  Verified
                </div>
                <QrCode size={48} className="text-slate-600 dark:text-slate-300 transition-colors" />
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-1">Scan to Verify</span>
              </div>
            </div>
          </div>

          {/* Official Channels Section */}
          <div className="p-8 md:p-10 border-b border-slate-100 dark:border-slate-800">
            <p className="text-[10px] font-bold tracking-widest text-indigo-600 dark:text-cyan-500 uppercase mb-6 flex items-center gap-2 transition-colors">
              <Lock size={14} /> Official Channels
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="bg-indigo-50/50 dark:bg-cyan-950/20 border border-indigo-100 dark:border-cyan-900/50 rounded-2xl p-6 transition-colors">
                <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2">Verified Domain</p>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-indigo-600 dark:text-cyan-400 transition-colors">credify.app</h3>
                  <ExternalLink size={16} className="text-indigo-400 dark:text-cyan-500/50 transition-colors" />
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2 transition-colors">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                  Only accept emails from @credify.app
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 transition-colors">
                  <CheckCircle2 size={16} className="text-emerald-500" /> Official emails ending in @credify.app
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 transition-colors">
                  <CheckCircle2 size={16} className="text-emerald-500" /> Emails from admin@credify.app
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 transition-colors">
                  <CheckCircle2 size={16} className="text-emerald-500" /> Credify Official LinkedIn Page
                </div>
              </div>
            </div>
          </div>

          {/* Zero Tolerance Policy Section */}
          <div className="p-8 md:p-10">
            <p className="text-[10px] font-bold tracking-widest text-rose-600 dark:text-rose-500 uppercase mb-3 flex items-center gap-2 transition-colors">
              <AlertCircle size={14} /> Zero Tolerance Policy
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 transition-colors">
              Credify Security Intelligence will <span className="text-rose-500 dark:text-rose-400 font-bold underline decoration-rose-500/30 underline-offset-4">never</span> ask candidates to do the following:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 bg-rose-50 border border-rose-100 dark:bg-rose-500/5 dark:border-rose-500/20 rounded-xl p-4 text-sm text-rose-700 dark:text-rose-200 transition-colors">
                <XCircle size={18} className="text-rose-500 shrink-0" />
                <span className="font-semibold">We NEVER use Telegram or WhatsApp</span>
              </div>
              <div className="flex items-start gap-3 bg-rose-50 border border-rose-100 dark:bg-rose-500/5 dark:border-rose-500/20 rounded-xl p-4 text-sm text-rose-700 dark:text-rose-200 transition-colors">
                <XCircle size={18} className="text-rose-500 shrink-0" />
                <span className="font-semibold">We NEVER interview via text chats</span>
              </div>
              <div className="flex items-start gap-3 bg-rose-50 border border-rose-100 dark:bg-rose-500/5 dark:border-rose-500/20 rounded-xl p-4 text-sm text-rose-700 dark:text-rose-200 md:col-span-2 transition-colors">
                <XCircle size={18} className="text-rose-500 shrink-0" />
                <span className="font-semibold">We NEVER ask for crypto or equipment fees</span>
              </div>
            </div>
          </div>
        </div>

        {/* Metadata Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-slate-400 dark:text-slate-500 mb-8 px-4 gap-4 transition-colors">
          <span>SIG: CRD-OFFICIAL-001</span>
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            VERIFIED_AT: 2026-04-18 06:02:12 UTC
          </span>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
          <div className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl p-5 flex items-center gap-4 transition-all shadow-sm">
            <div className="bg-blue-500/10 p-2 rounded-lg"><Lock size={20} className="text-blue-600 dark:text-blue-400" /></div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Cryptographically Signed</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">Tamper-proof certificate</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl p-5 flex items-center gap-4 transition-all shadow-sm">
            <div className="bg-cyan-500/10 p-2 rounded-lg"><Clock size={20} className="text-cyan-600 dark:text-cyan-400" /></div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Real-time Verification</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">Checked on every load</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-xl p-5 flex items-center gap-4 transition-all shadow-sm">
            <div className="bg-emerald-500/10 p-2 rounded-lg"><Zap size={20} className="text-emerald-600 dark:text-emerald-400" /></div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">&lt; 5 Second Verify</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">From any channel</p>
            </div>
          </div>
        </div>

        {/* --- FOR EMPLOYERS CTA BANNER --- */}
        <div className="pt-10 border-t border-slate-100 dark:border-slate-800">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-6 transition-colors">For Employers</p>
          
          <div className="bg-gradient-to-br from-indigo-50 to-white dark:from-slate-900 dark:to-cyan-950/40 border border-indigo-100 dark:border-slate-700/50 rounded-3xl p-10 md:p-14 relative overflow-hidden transition-all shadow-xl dark:shadow-none">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/5 dark:from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
            
            <p className="text-[10px] font-bold tracking-widest text-indigo-600 dark:text-cyan-400 uppercase mb-4 transition-colors">Want a profile like this?</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6 max-w-2xl transition-colors">
              Protect your brand from recruitment fraud.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base max-w-2xl mb-10 leading-relaxed transition-colors">
              Recruitment fraud costs companies millions in brand damage. Secure your reputation with an immutable Credify Trust Profile — verified and live in under 24 hours.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <button className="bg-indigo-600 dark:bg-cyan-500 hover:bg-indigo-700 dark:hover:bg-cyan-400 text-white dark:text-slate-950 text-sm font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20 dark:shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                Secure Your Brand <ArrowRight size={16} className="inline ml-1 -mt-0.5" />
              </button>
              <button className="bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 text-sm font-bold px-8 py-3.5 rounded-xl transition-all">
                View Pricing
              </button>
            </div>
            
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-6 transition-colors">
              * No credit card required • Verification within 24 hours • Cancel anytime
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}