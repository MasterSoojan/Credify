'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export default function HeroWidget() {
  const [viewState, setViewState] = useState<'with' | 'without'>('without');

  return (
    <>
      <div className="flex items-center gap-4 text-xs font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-8 transition-colors">
        <span className="text-indigo-600 dark:text-cyan-500">Employer Trust Infrastructure</span>
        <span className="w-8 h-px bg-slate-200 dark:bg-slate-700"></span>
        <span>Credify Verify</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-40">
        <div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-8 transition-colors">
            Stop losing <br /> candidates <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-slate-400 to-slate-600 dark:from-slate-400 dark:to-slate-600">
              to scam paranoia.
            </span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-12 max-w-lg transition-colors">
            40% of candidates ignore recruiter messages because they can't tell real from fake. A Credify Verification Link proves your identity in under 5 seconds — across every channel.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/job-scanner" className="flex items-center gap-2 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 font-bold px-6 py-3.5 rounded-xl transition-all">
              See Live Demo
            </Link>
          </div>
        </div>

        {/* Interactive Widget */}
        <div className="relative">
          <div className="flex bg-slate-50 dark:bg-slate-900/80 p-1 rounded-xl border border-slate-200 dark:border-white/5 backdrop-blur-md mb-6 w-fit mx-auto lg:mx-0 transition-all">
            <button onClick={() => setViewState('without')} className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all ${viewState === 'without' ? 'bg-white dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-500/20 shadow-lg dark:shadow-[0_0_15px_rgba(244,63,94,0.1)]' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}>
              <XCircle size={16} className={viewState === 'without' ? 'text-rose-500' : ''} /> Without Credify
            </button>
            <button onClick={() => setViewState('with')} className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all ${viewState === 'with' ? 'bg-white dark:bg-cyan-950/50 text-indigo-600 dark:text-cyan-400 border border-indigo-100 dark:border-cyan-500/30 shadow-lg dark:shadow-[0_0_15px_rgba(6,182,212,0.15)]' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}>
              <CheckCircle2 size={16} className={viewState === 'with' ? 'text-indigo-500 dark:text-cyan-400' : ''} /> With Credify
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-100 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden transition-all duration-500 min-h-[440px]">
            {viewState === 'with' ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 transition-colors">
                        <span className="text-xl font-black text-slate-900 dark:text-white">A</span>
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2 transition-colors">
                        Acme Recruiting <ShieldCheck size={20} className="text-indigo-600 dark:text-cyan-400" />
                      </h3>
                    </div>
                    <p className="text-xs font-mono text-slate-400 dark:text-slate-500 ml-12 transition-colors">ID: A1B2C3D4 • REG: 2023</p>
                  </div>
                  <div className="bg-indigo-50 dark:bg-cyan-950/50 border border-indigo-100 dark:border-cyan-500/30 px-3 py-1.5 rounded-md transition-colors text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-cyan-400 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-cyan-400 animate-pulse"></div> Candidate's View
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 transition-colors">Official Channels</h4>
                    <div className="bg-indigo-50/50 dark:bg-cyan-950/20 border border-indigo-100 dark:border-cyan-900/50 rounded-xl p-4 mb-3 transition-colors">
                      <div className="flex items-center gap-3 text-indigo-900 dark:text-cyan-100 font-medium mb-2 transition-colors"><Lock size={16} className="text-indigo-600 dark:text-cyan-500" /> acmerecruiting.com</div>
                      <p className="text-xs text-indigo-600/70 dark:text-cyan-500/80 ml-7 transition-colors">Only accept emails from @acmerecruiting.com</p>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-indigo-600 dark:text-cyan-500/80 mt-4 transition-colors">Outcome: Candidate verifies in 5 seconds. Replies with confidence.</div>
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500 transition-colors"><AlertCircle size={18} /><h3 className="text-xs font-bold uppercase tracking-widest">Unknown Recruiter</h3></div>
                  <div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 transition-colors">Candidate's View</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 rounded-xl p-5 mb-6 text-slate-700 dark:text-slate-300 text-sm italic leading-relaxed transition-colors">
                  "Hi, I'm Sarah from Acme Recruiting. We have an exciting opportunity! Please send your resume to sarah.hr@gmail.com and reach me on Telegram @sarah_acme_jobs"
                </div>
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400 transition-colors"><XCircle size={16} className="text-rose-500 shrink-0 mt-0.5" /><span>No company verification — could be anyone</span></div>
                  <div className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400 transition-colors"><XCircle size={16} className="text-rose-500 shrink-0 mt-0.5" /><span>Gmail address — not a company domain</span></div>
                </div>
                <div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 rounded-xl p-4 text-xs font-bold text-rose-600 dark:text-rose-400 transition-colors">Outcome: Candidate ignores the message. You lose a qualified hire.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
