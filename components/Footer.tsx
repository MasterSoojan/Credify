'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      
      {/* Unique Element #1: Glowing Cyber-Line at the top */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500 dark:via-indigo-400 to-transparent opacity-30 dark:opacity-50"></div>

      {/* Decorative background glow for dark mode */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-indigo-500/5 dark:bg-indigo-500/10 blur-[100px] -z-10 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8 relative z-10">
        
        {/* Top Section: CTA & Brand */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16 pb-12 border-b border-slate-200 dark:border-slate-800/60">
          <div className="max-w-sm">
            <h2 className="text-3xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight mb-4">Credify.</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              The first line of defense for job seekers. We analyze offer letters, domain age, and recruiter patterns to stop scams before they start.
            </p>
            
            {/* Unique Element #2: Live System Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Forensic Engine: Online
            </div>
          </div>

          {/* Unique Element #3: Threat Alert Signup */}
          <div className="w-full md:w-auto bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-slate-900 dark:text-white font-bold mb-2 flex items-center gap-2">
              ⚠️ Get Threat Alerts
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 max-w-xs">
              Subscribe to get notified when new mass-recruiting scams hit university campuses.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="student@university.edu" 
                className="w-full md:w-64 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition-colors text-sm"
              />
              <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-all shadow-md active:scale-95">
                Secure
              </button>
            </form>
          </div>
        </div>

        {/* Middle Section: Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-xs tracking-widest uppercase opacity-60">Platform</h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">TrustScore Scan</a></li>
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Threat Database</a></li>
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Browser Extension</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-xs tracking-widest uppercase opacity-60">Resources</h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Scam Prevention Guide</a></li>
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Student Stories</a></li>
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Help Center</a></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-2">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-xs tracking-widest uppercase opacity-60">Emergency Action</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 pr-8">
              Did you already pay money to a fake recruiter? Do not panic. Read our immediate action guide to secure your bank accounts and report the fraud.
            </p>
            <a href="#" className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors flex items-center gap-1">
              Read the Emergency Guide <span>&rarr;</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col-reverse md:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-500 font-medium">
          <p>© {currentYear} Credify Inc. Built for Innovatrix.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">Security Report</a>
          </div>
        </div>
      </div>
    </footer>
  );
}