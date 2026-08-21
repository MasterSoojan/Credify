'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ChevronDown, Zap, ShieldCheck, Building, Activity } from 'lucide-react';

export default function DesktopMenu() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex items-center gap-8 h-full">
      <Link href="/" className={`flex items-center gap-1.5 text-sm font-bold transition-opacity ${pathname === '/' ? 'text-indigo-600 dark:text-cyan-400 hover:opacity-80' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
        <Home size={16} />
        Home
      </Link>

      {/* Products Dropdown */}
      <div className="relative group h-full flex items-center cursor-pointer">
        <Link href="/verifiers" className={`flex items-center gap-1 text-sm font-semibold transition-colors ${pathname === '/verifiers' ? 'text-indigo-600 dark:text-cyan-400' : 'text-slate-700 dark:text-white hover:text-indigo-600 dark:hover:text-cyan-400'}`}>
          Verifiers
          <ChevronDown size={14} className="opacity-70 transition-transform duration-200 group-hover:rotate-180" />
        </Link>

        <div className="absolute top-full left-0 mt-0 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
          <div className="bg-white dark:bg-slate-900/95 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-2xl p-2 shadow-2xl">
            <Link href="/job-scanner" className="flex items-start gap-4 p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors group/item">
              <div className="bg-black/5 dark:bg-white/5 p-2 rounded-lg text-slate-400 group-hover/item:text-indigo-600 dark:group-hover/item:text-cyan-400 transition-colors">
                <Zap size={18} />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">Job Scanner</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Free scam detection</div>
              </div>
            </Link>

            <Link href="/instant-verify" className="flex items-start gap-4 p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors group/item">
              <div className="bg-black/5 dark:bg-white/5 p-2 rounded-lg text-slate-400 group-hover/item:text-indigo-600 dark:group-hover/item:text-cyan-400 transition-colors">
                <ShieldCheck size={18} />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">Instant Verification</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Check if a link is safe</div>
              </div>
            </Link>

            <Link href="/search" className="flex items-start gap-4 p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors group/item">
              <div className="bg-black/5 dark:bg-white/5 p-2 rounded-lg text-slate-400 group-hover/item:text-indigo-600 dark:group-hover/item:text-cyan-400 transition-colors">
                <Building size={18} />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">Company Search</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Verify any employer</div>
              </div>
            </Link>

            <div className="mt-2 pt-3 border-t border-white/5 px-3 pb-2 flex items-center gap-2 text-[10px] text-slate-500 font-mono uppercase tracking-wider">
              <Activity size={12} className="text-cyan-500/70" />
              Engine operational • v3
            </div>
          </div>
        </div>
      </div>

      <Link href="/intelligence" className={`text-sm font-semibold transition-colors ${pathname === '/intelligence' ? 'text-indigo-600 dark:text-cyan-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
        Intelligence
      </Link>

      <Link href="/how-it-works" className={`text-sm font-semibold transition-colors ${pathname === '/how-it-works' ? 'text-indigo-600 dark:text-cyan-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}>
        How It Works
      </Link>
    </div>
  );
}
