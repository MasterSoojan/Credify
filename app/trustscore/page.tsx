import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TrustScorePage() {
  return (
    <main className='min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto text-slate-900 dark:text-slate-200'>
      <Link href='/' className='flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-cyan-400 mb-8 w-fit hover:opacity-80 transition-opacity'>
        <ArrowLeft size={16} /> Back to Home
      </Link>
      
      <h1 className='text-4xl md:text-6xl font-black mb-6 tracking-tight'>
        The <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-cyan-300">TrustScore</span> Engine
      </h1>
      <p className='text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl leading-relaxed'>
        The Credify TrustScore is a dynamic, 0-100 rating that represents the legitimacy and safety of an employer or job offer.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50 p-6 rounded-3xl">
          <h2 className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-2">70 - 100</h2>
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">Verified & Safe</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">High confidence that the company is legitimate, their domain is registered, and the offer letter passes AI forensics.</p>
        </div>
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 p-6 rounded-3xl">
          <h2 className="text-3xl font-black text-amber-600 dark:text-amber-400 mb-2">40 - 69</h2>
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">Moderate Risk</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Proceed with caution. The domain might be newly registered, or the AI detected unusual language in the offer.</p>
        </div>
        <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/50 p-6 rounded-3xl">
          <h2 className="text-3xl font-black text-rose-600 dark:text-rose-400 mb-2">0 - 39</h2>
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">High Risk / Scam</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Critical red flags detected. The email matches known scam databases, or the AI found classic extortion tactics.</p>
        </div>
      </div>

      <div className='bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-10 shadow-sm'>
        <h2 className="text-2xl font-bold mb-6">How is it calculated?</h2>
        <div className="space-y-6">
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-cyan-950/50 text-indigo-600 dark:text-cyan-400 flex items-center justify-center font-bold shrink-0">1</div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-1">Domain Age & Registration</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Scammers frequently register domains that look like real companies (e.g., @google-careers.com). We check when the domain was registered. A domain registered 3 days ago immediately tanks the TrustScore.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-cyan-950/50 text-indigo-600 dark:text-cyan-400 flex items-center justify-center font-bold shrink-0">2</div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-1">AI Forensic Text Analysis</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Our Gemini-powered engine reads uploaded offer letters looking for urgency tactics ("Must sign today"), requests for banking info early in the process, or highly unprofessional formatting.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-cyan-950/50 text-indigo-600 dark:text-cyan-400 flex items-center justify-center font-bold shrink-0">3</div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-1">Global Threat Intelligence</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">We cross-reference the recruiter's email and any links in the offer against global databases (like VirusTotal and Phisherman) to see if they've been previously reported by other victims.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
