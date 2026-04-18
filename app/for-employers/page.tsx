'use client';

import { useState } from 'react';
import { 
  ShieldCheck, Lock, CheckCircle2, XCircle, 
  AlertCircle, ArrowRight, Zap, Check, ChevronDown, MessageSquare
} from 'lucide-react';

const faqs = [
  { q: "How long does verification take?", a: "Under 24 hours. We manually review each company submission, check domain ownership, and publish your verified profile. Most companies are live the same day." },
  { q: "Is the Starter plan really free?", a: "Yes, the basic verified profile and trust badge are completely free forever to help combat the scam epidemic." },
  { q: "What if a scammer copies my trust badge link?", a: "Our dynamic TrustScore engine verifies the exact domain hosting the link. If a scammer puts your badge on a fake site, the badge will automatically show as 'Invalid / Impersonator'." },
  { q: "Do candidates need to install anything?", a: "No. The verification link is browser-based and works instantly on any device, from any channel." },
  { q: "Which channels does this work on?", a: "Everywhere. You can put your Credify link in email signatures, LinkedIn InMails, WhatsApp messages, and your careers page." },
  { q: "What happens if we cancel?", a: "If you cancel a paid tier, your profile downgrades to the free tier. Your verified status remains active as long as you maintain domain ownership." }
];

export default function EmployersPage() {
  const [viewState, setViewState] = useState<'with' | 'without'>('without');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 pt-32 pb-20 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-20 left-[-10%] w-[40%] h-[500px] bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- HERO & WIDGET SECTION --- */}
        <div className="flex items-center gap-4 text-xs font-bold tracking-widest uppercase text-slate-500 mb-8">
          <span className="text-cyan-500">Employer Trust Infrastructure</span>
          <span className="w-8 h-px bg-slate-700"></span>
          <span>Credify Verify</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-40">
          <div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-8">
              Stop losing <br /> candidates <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600">
                to scam paranoia.
              </span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed mb-12 max-w-lg">
              40% of candidates ignore recruiter messages because they can't tell real from fake. A Credify Trust Badge proves your identity in under 5 seconds — across every channel.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                Get Trust Badge <ArrowRight size={18} />
              </button>
              <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold px-6 py-3.5 rounded-xl transition-all">
                See Live Demo
              </button>
            </div>
          </div>

          {/* Interactive Widget */}
          <div className="relative">
            <div className="flex bg-slate-900/80 p-1 rounded-xl border border-white/5 backdrop-blur-md mb-6 w-fit mx-auto lg:mx-0">
              <button onClick={() => setViewState('without')} className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all ${viewState === 'without' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)]' : 'text-slate-500 hover:text-slate-300'}`}>
                <XCircle size={16} className={viewState === 'without' ? 'text-rose-400' : ''} /> Without Credify
              </button>
              <button onClick={() => setViewState('with')} className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all ${viewState === 'with' ? 'bg-cyan-950/50 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]' : 'text-slate-500 hover:text-slate-300'}`}>
                <CheckCircle2 size={16} className={viewState === 'with' ? 'text-cyan-400' : ''} /> With Credify
              </button>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden transition-all duration-500 min-h-[440px]">
              {viewState === 'with' ? (
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
                    <div className="bg-cyan-950/50 border border-cyan-500/30 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div> Candidate's View
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Official Channels</h4>
                      <div className="bg-cyan-950/20 border border-cyan-900/50 rounded-xl p-4 mb-3">
                        <div className="flex items-center gap-3 text-cyan-100 font-medium mb-2"><Lock size={16} className="text-cyan-500" /> acmerecruiting.com</div>
                        <p className="text-xs text-cyan-500/80 ml-7">Only accept emails from @acmerecruiting.com</p>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-cyan-500/80 mt-4">Outcome: Candidate verifies in 5 seconds. Replies with confidence.</div>
                  </div>
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-2 text-amber-500"><AlertCircle size={18} /><h3 className="text-xs font-bold uppercase tracking-widest">Unknown Recruiter</h3></div>
                    <div className="bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider text-rose-400">Candidate's View</div>
                  </div>
                  <div className="bg-slate-800/80 border border-slate-700/50 rounded-xl p-5 mb-6 text-slate-300 text-sm italic leading-relaxed">
                    "Hi, I'm Sarah from Acme Recruiting. We have an exciting opportunity! Please send your resume to sarah.hr@gmail.com and reach me on Telegram @sarah_acme_jobs"
                  </div>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-start gap-3 text-sm text-slate-400"><XCircle size={16} className="text-rose-500 shrink-0 mt-0.5" /><span>No company verification — could be anyone</span></div>
                    <div className="flex items-start gap-3 text-sm text-slate-400"><XCircle size={16} className="text-rose-500 shrink-0 mt-0.5" /><span>Gmail address — not a company domain</span></div>
                  </div>
                  <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 text-xs font-bold text-rose-400">Outcome: Candidate ignores the message. You lose a qualified hire.</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- TRUST GAP STATS --- */}
        <div className="mb-40 pt-20 border-t border-slate-800">
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-4">
            The trust gap is <br/><span className="text-slate-500">costing you hires.</span>
          </h2>
          <p className="text-slate-400 mb-16 max-w-2xl text-lg">
            Sophisticated candidates are suspicious of every message. If they can't verify you in 5 seconds, they ignore the offer.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8">
              <h3 className="text-5xl font-black text-white mb-4">40%</h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">of candidates ignore recruiter messages out of scam fear.</p>
            </div>
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8">
              <h3 className="text-5xl font-black text-white mb-4">1 in 8</h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">job offers online is fraudulent in Southeast Asia.</p>
            </div>
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8">
              <h3 className="text-5xl font-black text-white mb-4">5 sec</h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">is all it takes a candidate to verify with a Trust Badge.</p>
            </div>
          </div>
        </div>

        {/* --- FEATURES (Verifiable Link) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-40">
          <div className="lg:col-span-1 space-y-4">
            <button className="text-left w-full px-4 py-3 bg-slate-800/50 text-white font-bold rounded-lg border border-slate-700 text-sm">Verifiable Identity Link</button>
            <button className="text-left w-full px-4 py-3 text-slate-500 hover:text-slate-300 font-bold rounded-lg text-sm transition-colors">Domain Protection</button>
            <button className="text-left w-full px-4 py-3 text-slate-500 hover:text-slate-300 font-bold rounded-lg text-sm transition-colors">Instant Staff Lookup</button>
            <button className="text-left w-full px-4 py-3 text-slate-500 hover:text-slate-300 font-bold rounded-lg text-sm transition-colors">Works Everywhere</button>
          </div>

          <div className="lg:col-span-3 bg-slate-900/40 border border-slate-800 rounded-3xl p-8 md:p-12">
            <div className="flex items-center gap-3 text-cyan-400 mb-6">
              <ShieldCheck size={24} /> <span className="font-bold tracking-widest text-[10px] uppercase">Core Feature</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-white mb-4">Verifiable Identity Link</h3>
            <p className="text-cyan-400 font-bold text-sm mb-6">One URL. Every channel. Instant trust.</p>
            <p className="text-slate-400 leading-relaxed mb-10 max-w-2xl">
              A single, permanent URL (credify.app/verify/your-brand) that candidates check in under 5 seconds. Share it in every email signature, LinkedIn message, and job posting. When candidates click it, they land on your verified company page — not a look-alike.
            </p>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 font-mono text-sm space-y-6 shadow-inner">
              <div>
                <div className="flex items-center gap-2 text-emerald-400 mb-1">
                  <CheckCircle2 size={16} /> credify.app/verify/acme-recruiting
                </div>
                <div className="text-slate-500 text-xs ml-6">Verified company profile</div>
              </div>
              <div className="border-t border-slate-800 pt-4">
                <div className="flex items-center gap-2 text-rose-400 mb-1">
                  <XCircle size={16} /> acme-recruiting-jobs.xyz
                </div>
                <div className="text-slate-500 text-xs ml-6">Impersonator detected</div>
              </div>
            </div>
          </div>
        </div>

        {/* --- CLAIM PROFILE / GO LIVE --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-40">
          <div className="bg-white rounded-2xl p-10 shadow-2xl relative">
            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-8 border-4 border-slate-100">
              <ShieldCheck size={32} className="text-cyan-400" />
            </div>
            <h3 className="text-4xl font-black text-slate-900 mb-4 leading-tight">Claim Your Free Credify Company Profile</h3>
            <p className="text-slate-600 mb-12">Protect your employer brand from job scammers and show applicants your listings are 100% secure.</p>
            <div className="absolute bottom-6 right-6 text-[10px] font-bold text-slate-400 flex items-center gap-1">Made with Credify <Zap size={10}/></div>
          </div>

          <div className="space-y-12 pl-0 md:pl-8">
            <div className="relative">
              <div className="text-cyan-500 font-black text-sm mb-2">01</div>
              <h4 className="text-2xl font-bold text-white mb-2">Submit domain details</h4>
              <p className="text-slate-400">Fill out the fast verification form with your official company email and domain records.</p>
            </div>
            <div className="relative">
              <div className="text-cyan-500 font-black text-sm mb-2">02</div>
              <h4 className="text-2xl font-bold text-white mb-2">Manual review</h4>
              <p className="text-slate-400">Our team checks domain ownership and company legitimacy within 24 hours.</p>
            </div>
            <div className="relative">
              <div className="text-cyan-500 font-black text-sm mb-2">03</div>
              <h4 className="text-2xl font-bold text-white mb-2">Go live</h4>
              <p className="text-slate-400">Your trust badge page publishes. Share the URL everywhere.</p>
            </div>
          </div>
        </div>

        {/* --- PRICING --- */}
        <div className="mb-40 pt-20 border-t border-slate-800">
          <h2 className="text-5xl font-black text-white tracking-tight mb-2 text-center">Simple, transparent pricing.</h2>
          <p className="text-slate-400 text-center mb-16">Verification takes less than 24 hours. No credit card required to get started.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free Tier */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 flex flex-col">
              <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-4">Starter</p>
              <h3 className="text-4xl font-black text-white mb-6">Free</h3>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-3 text-slate-300 text-sm"><Check size={16} className="text-slate-600"/> Verified company page</li>
                <li className="flex items-center gap-3 text-slate-300 text-sm"><Check size={16} className="text-slate-600"/> Basic trust badge</li>
                <li className="flex items-center gap-3 text-slate-300 text-sm"><Check size={16} className="text-slate-600"/> Staff lookup (up to 5)</li>
                <li className="flex items-center gap-3 text-slate-300 text-sm"><Check size={16} className="text-slate-600"/> Community scan history</li>
              </ul>
              <button className="w-full py-3 rounded-xl border border-white/10 font-bold text-sm hover:bg-white/5 transition-colors">Get Started Free →</button>
            </div>

            {/* Growth Tier */}
            <div className="bg-slate-900 border border-cyan-500/50 rounded-3xl p-8 flex flex-col relative shadow-[0_0_30px_rgba(6,182,212,0.15)] transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-500 text-slate-900 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">Most Popular</div>
              <p className="text-[10px] font-bold tracking-widest text-cyan-500 uppercase mb-4">Growth</p>
              <div className="flex items-baseline gap-1 mb-6"><h3 className="text-4xl font-black text-white">$49</h3><span className="text-slate-500">/mo</span></div>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-3 text-slate-200 text-sm"><CheckCircle2 size={16} className="text-cyan-500"/> Unlimited staff lookup</li>
                <li className="flex items-center gap-3 text-slate-200 text-sm"><CheckCircle2 size={16} className="text-cyan-500"/> Brand impersonation alerts</li>
                <li className="flex items-center gap-3 text-slate-200 text-sm"><CheckCircle2 size={16} className="text-cyan-500"/> Verification analytics</li>
                <li className="flex items-center gap-3 text-slate-200 text-sm"><CheckCircle2 size={16} className="text-cyan-500"/> Priority support</li>
                <li className="flex items-center gap-3 text-slate-200 text-sm"><CheckCircle2 size={16} className="text-cyan-500"/> API access (100 req/day)</li>
              </ul>
              <button className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold text-sm transition-colors">Start Free Trial →</button>
            </div>

            {/* Enterprise Tier */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 flex flex-col">
              <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-4">Enterprise</p>
              <h3 className="text-4xl font-black text-white mb-6">Custom</h3>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-3 text-slate-300 text-sm"><Check size={16} className="text-slate-600"/> White-label badge</li>
                <li className="flex items-center gap-3 text-slate-300 text-sm"><Check size={16} className="text-slate-600"/> Unlimited API access</li>
                <li className="flex items-center gap-3 text-slate-300 text-sm"><Check size={16} className="text-slate-600"/> Dedicated account manager</li>
                <li className="flex items-center gap-3 text-slate-300 text-sm"><Check size={16} className="text-slate-600"/> SLA 99.9% uptime</li>
                <li className="flex items-center gap-3 text-slate-300 text-sm"><Check size={16} className="text-slate-600"/> Custom integrations (ATS)</li>
              </ul>
              <button className="w-full py-3 rounded-xl border border-white/10 font-bold text-sm hover:bg-white/5 transition-colors">Talk to Sales →</button>
            </div>
          </div>
        </div>

        {/* --- FAQ & INTEGRATION --- */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Looking for platform-level integration?</h3>
              <p className="text-slate-400">Integrate our verification API directly into your job board or ATS.</p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <button className="flex items-center gap-2 text-cyan-400 font-bold hover:text-cyan-300 transition-colors text-sm"><Zap size={16}/> Contact Partnerships</button>
              <button className="flex items-center gap-2 text-white font-bold hover:text-slate-300 transition-colors text-sm"><MessageSquare size={16}/> Talk to Sales</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden h-fit">
                <button 
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-bold text-white pr-4 text-sm">{faq.q}</span>
                  <ChevronDown className={`text-slate-400 transition-transform duration-300 shrink-0 ${openFaq === index ? 'rotate-180' : ''}`} size={18} />
                </button>
                <div className={`px-6 text-sm text-slate-400 leading-relaxed transition-all duration-300 ease-in-out ${openFaq === index ? 'pb-6 opacity-100 max-h-40' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}