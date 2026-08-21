import { Check, CheckCircle2 } from 'lucide-react';

export default function Pricing() {
  return (
    <div className="mb-40 pt-20 border-t border-slate-100 dark:border-slate-800">
      <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2 text-center transition-colors">Simple, transparent pricing.</h2>
      <p className="text-slate-600 dark:text-slate-400 text-center mb-16 transition-colors">Verification takes less than 24 hours. No credit card required to get started.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Free Tier */}
        <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col transition-colors shadow-sm dark:shadow-none">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-4 transition-colors">Starter</p>
          <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-6 transition-colors">Free</h3>
          <ul className="space-y-4 mb-10 flex-grow">
            <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm transition-colors"><Check size={16} className="text-slate-400 dark:text-slate-600"/> Verified company page</li>
            <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm transition-colors"><Check size={16} className="text-slate-400 dark:text-slate-600"/> Verification link</li>
            <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm transition-colors"><Check size={16} className="text-slate-400 dark:text-slate-600"/> Staff lookup (up to 5)</li>
            <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm transition-colors"><Check size={16} className="text-slate-400 dark:text-slate-600"/> Community scan history</li>
          </ul>
        </div>

        {/* Growth Tier */}
        <div className="bg-white dark:bg-slate-900 border border-indigo-500 dark:border-cyan-500/50 rounded-3xl p-8 flex flex-col relative shadow-xl dark:shadow-[0_0_30px_rgba(6,182,212,0.15)] transform md:-translate-y-4 transition-all">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 dark:bg-cyan-500 text-white dark:text-slate-900 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full transition-colors">Most Popular</div>
          <p className="text-[10px] font-bold tracking-widest text-indigo-600 dark:text-cyan-500 uppercase mb-4 transition-colors">Growth</p>
          <div className="flex items-baseline gap-1 mb-6"><h3 className="text-4xl font-black text-slate-900 dark:text-white transition-colors">₹200</h3><span className="text-slate-400 dark:text-slate-500 transition-colors">/mo</span></div>
          <ul className="space-y-4 mb-10 flex-grow">
            <li className="flex items-center gap-3 text-slate-800 dark:text-slate-200 text-sm transition-colors"><CheckCircle2 size={16} className="text-indigo-500 dark:text-cyan-500"/> Unlimited staff lookup</li>
            <li className="flex items-center gap-3 text-slate-800 dark:text-slate-200 text-sm transition-colors"><CheckCircle2 size={16} className="text-indigo-500 dark:text-cyan-500"/> Brand impersonation alerts</li>
            <li className="flex items-center gap-3 text-slate-800 dark:text-slate-200 text-sm transition-colors"><CheckCircle2 size={16} className="text-indigo-500 dark:text-cyan-500"/> Verification analytics</li>
            <li className="flex items-center gap-3 text-slate-800 dark:text-slate-200 text-sm transition-colors"><CheckCircle2 size={16} className="text-indigo-500 dark:text-cyan-500"/> Priority support</li>
            <li className="flex items-center gap-3 text-slate-800 dark:text-slate-200 text-sm transition-colors"><CheckCircle2 size={16} className="text-indigo-500 dark:text-cyan-500"/> API access (100 req/day)</li>
          </ul>
          <button className="w-full py-3 rounded-xl bg-indigo-600 dark:bg-cyan-500 hover:bg-indigo-700 dark:hover:bg-cyan-400 text-white dark:text-slate-900 font-bold text-sm transition-all shadow-lg shadow-indigo-500/20">Start Free Trial →</button>
        </div>

        {/* Enterprise Tier */}
        <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col transition-colors shadow-sm dark:shadow-none">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-4 transition-colors">Enterprise</p>
          <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-6 transition-colors">Custom</h3>
          <ul className="space-y-4 mb-10 flex-grow">
            <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm transition-colors"><Check size={16} className="text-slate-400 dark:text-slate-600"/> White-label badge</li>
            <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm transition-colors"><Check size={16} className="text-slate-400 dark:text-slate-600"/> Unlimited API access</li>
            <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm transition-colors"><Check size={16} className="text-slate-400 dark:text-slate-600"/> Dedicated account manager</li>
            <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm transition-colors"><Check size={16} className="text-slate-400 dark:text-slate-600"/> SLA 99.9% uptime</li>
            <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm transition-colors"><Check size={16} className="text-slate-400 dark:text-slate-600"/> Custom integrations (ATS)</li>
          </ul>
          <button className="w-full py-3 rounded-xl border border-slate-200 dark:border-white/10 font-bold text-sm text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all">Talk to Sales →</button>
        </div>
      </div>
    </div>
  );
}
