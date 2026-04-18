'use client';

import { useState } from 'react';
import { ShieldCheck, Lock, ShieldAlert, Mail, CheckCircle2, XCircle } from 'lucide-react';import Link from 'next/link';

export default function EmployersPage() {
  const [viewState, setViewState] = useState<'with' | 'without'>('with');

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 pt-32 pb-20 relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-20 left-[-10%] w-[40%] h-125px bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-100px bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Top small label */}
        <div className="flex items-center gap-4 text-xs font-bold tracking-widest uppercase text-slate-500 mb-8">
          <span className="text-cyan-500">Employer Trust Infrastructure</span>
          <span className="w-8 h-px bg-slate-700"></span>
          <span>Credify Verify</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT COLUMN: Copy & Stats */}
          <div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-8">
              Stop losing <br /> candidates <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-slate-400 to-slate-600">
                to scam paranoia.
              </span>
            </h1>
            
            <p className="text-lg text-slate-400 leading-relaxed mb-12 max-w-lg">
              40% of candidates ignore recruiter messages because they can't tell real from fake. A Credify Trust Badge proves your identity in under 5 seconds — across every channel.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              <div>
                <div className="text-3xl font-black text-white mb-1">40%</div>
                <div className="text-xs font-bold tracking-wider text-slate-500 uppercase">More Responses</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white mb-1">5s</div>
                <div className="text-xs font-bold tracking-wider text-slate-500 uppercase">Verify Time</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white mb-1">99.9%</div>
                <div className="text-xs font-bold tracking-wider text-slate-500 uppercase">Uptime</div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Widget */}
          <div className="relative">
            
            {/* Toggle Buttons */}
            <div className="flex bg-slate-900/80 p-1 rounded-xl border border-white/5 backdrop-blur-md mb-6 w-fit mx-auto lg:mx-0">
              <button 
                onClick={() => setViewState('without')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all ${viewState === 'without' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <XCircle size={16} className={viewState === 'without' ? 'text-rose-500' : ''} />
                Without Credify
              </button>
              <button 
                onClick={() => setViewState('with')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all ${viewState === 'with' ? 'bg-cyan-950/50 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <CheckCircle2 size={16} className={viewState === 'with' ? 'text-cyan-400' : ''} />
                With Credify
              </button>
            </div>

            {/* Dynamic Card Container */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden transition-all duration-500 min-h-100">
              
              {viewState === 'with' ? (
                // --- STATE: WITH CREDIFY ---
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
                          <span className="text-xl font-black text-white">A</span>
                        </div>
                        <h3 className="text-2xl font-black text-white flex items-center gap-2">
                          Acme Recruiting <ShieldCheck size={20} className="text-cyan-400" />
                        </h3>
                      </div>
                      <p className="text-xs font-mono text-slate-500 ml-12">ID: A1B2C3D4 • REG: 2023</p>
                    </div>
                    <div className="bg-cyan-950/50 border border-cyan-500/30 px-3 py-1.5 rounded-md">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                        Candidate's View
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Official Channels</h4>
                      <div className="bg-cyan-950/20 border border-cyan-900/50 rounded-xl p-4 mb-3">
                        <div className="flex items-center gap-3 text-cyan-100 font-medium mb-2">
                          <Lock size={16} className="text-cyan-500" /> acmerecruiting.com
                        </div>
                        <p className="text-xs text-cyan-500/80 ml-7">Only accept emails from @acmerecruiting.com</p>
                      </div>
                      <div className="flex flex-col gap-2 ml-2">
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <CheckCircle2 size={14} className="text-emerald-500" /> Emails from @acmerecruiting.com only
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <CheckCircle2 size={14} className="text-emerald-500" /> LinkedIn: linkedin.com/company/acme-recruiting
                        </div>
                      </div>
                    </div>

                    <div className="bg-rose-950/20 border border-rose-900/50 rounded-xl p-4">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-rose-500 mb-1 flex items-center gap-1.5">
                        <ShieldAlert size={12} /> Fraud Alert
                      </h4>
                      <p className="text-xs text-rose-200/70">
                        We NEVER use Telegram, unverified WhatsApp, or personal email addresses.
                      </p>
                    </div>
                    
                    <div className="text-xs font-bold text-cyan-500/80 mt-4">
                      Outcome: Candidate verifies in 5 seconds. Replies with confidence.
                    </div>
                  </div>
                </div>
              ) : (
                // --- STATE: WITHOUT CREDIFY ---
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 opacity-60 grayscale">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
                      <Mail className="text-slate-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-400">hr.acme.jobs@gmail.com</h3>
                      <p className="text-xs text-slate-500">Standard cold outreach</p>
                    </div>
                  </div>

                  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
                    <div className="h-4 w-3/4 bg-slate-700 rounded mb-4"></div>
                    <div className="h-4 w-full bg-slate-700 rounded mb-4"></div>
                    <div className="h-4 w-5/6 bg-slate-700 rounded mb-8"></div>
                    
                    <div className="flex items-center justify-center gap-2 text-rose-400 text-sm font-bold bg-rose-500/10 py-3 rounded-lg border border-rose-500/20">
                      <XCircle size={16} /> Candidate marked as Spam / Ignored
                    </div>
                  </div>
                  
                  <div className="text-xs font-bold text-slate-500 mt-6 text-center">
                    Outcome: 40% of genuine outreach is lost to scam paranoia.
                  </div>
                </div>
              )}
            </div>
            {/* End Dynamic Card */}
            
            <div className="text-center mt-4">
               <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest text-center">* Click to toggle candidate view</span>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}