'use client';
import { useState } from 'react';
import { ChevronDown, Zap, MessageSquare } from 'lucide-react';

const faqs = [
  { q: "How long does verification take?", a: "Under 24 hours. We manually review each company submission, check domain ownership, and publish your verified profile. Most companies are live the same day." },
  { q: "Is the Starter plan really free?", a: "Yes, the basic verified profile is completely free forever to help combat the scam epidemic." },
  { q: "What if a scammer copies my verification link?", a: "Our dynamic TrustScore engine verifies the exact domain hosting the link. If a scammer puts your link on a fake site, it will automatically show as 'Invalid / Impersonator'." },
  { q: "Do candidates need to install anything?", a: "No. The verification link is browser-based and works instantly on any device, from any channel." },
  { q: "Which channels does this work on?", a: "Everywhere. You can put your Credify link in email signatures, LinkedIn InMails, WhatsApp messages, and your careers page." },
  { q: "What happens if we cancel?", a: "If you cancel a paid tier, your profile downgrades to the free tier. Your verified status remains active as long as you maintain domain ownership." }
];

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="mb-20">
      <div className="bg-gradient-to-r from-indigo-50 to-white dark:from-slate-900 dark:to-slate-800 border border-indigo-100 dark:border-slate-700 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-16 shadow-lg dark:shadow-none transition-all">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">Looking for platform-level integration?</h3>
          <p className="text-slate-600 dark:text-slate-400 transition-colors">Integrate our verification API directly into your job board or ATS.</p>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <button className="flex items-center gap-2 text-indigo-600 dark:text-cyan-400 font-bold hover:text-indigo-700 dark:hover:text-cyan-300 transition-colors text-sm"><Zap size={16}/> Contact Partnerships</button>
          <button className="flex items-center gap-2 text-slate-600 dark:text-white font-bold hover:text-slate-900 dark:hover:text-slate-300 transition-colors text-sm"><MessageSquare size={16}/> Talk to Sales</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden h-fit shadow-sm dark:shadow-none transition-all">
            <button 
              className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
            >
              <span className="font-bold text-slate-800 dark:text-white pr-4 text-sm transition-colors">{faq.q}</span>
              <ChevronDown className={`text-slate-400 transition-transform duration-300 shrink-0 ${openFaq === index ? 'rotate-180' : ''}`} size={18} />
            </button>
            <div className={`px-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed transition-all duration-300 ease-in-out ${openFaq === index ? 'pb-6 opacity-100 max-h-40' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              {faq.a}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
