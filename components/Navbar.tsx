'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  ShieldCheck,
  ChevronDown,
  Menu,
  Zap,
  Shield,
  Building,
  Server,
  Activity,
  Smartphone,
  Sun,
  Moon,
  Home // Added Home icon
} from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-black/5 dark:border-white/5 bg-white/70 dark:bg-slate-950/60 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Left: Logo (Acts as Home Button) */}
        <Link href="/" className="flex items-center gap-2 group">
          <ShieldCheck size={28} className="text-indigo-600 dark:text-cyan-400 group-hover:text-indigo-500 dark:group-hover:text-cyan-300 transition-colors" />
          <span className="font-black text-2xl tracking-tighter text-slate-900 dark:text-white">
            Credify.
          </span>
        </Link>

        {/* Center: Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 h-full">
          
          {/* --- NEW: EXPLICIT HOME LINK --- */}
          <Link href="/" className="flex items-center gap-1.5 text-sm font-bold text-indigo-600 dark:text-cyan-400 hover:opacity-80 transition-opacity">
            <Home size={16} />
            Home
          </Link>

          {/* Products Dropdown */}
          <div className="relative group h-full flex items-center cursor-pointer">
            <div className="flex items-center gap-1 text-sm font-semibold text-slate-700 dark:text-white transition-colors">
              Products
              <ChevronDown size={14} className="opacity-70 transition-transform duration-200 group-hover:rotate-180" />
            </div>

            <div className="absolute top-full left-0 mt-0 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
              <div className="bg-white dark:bg-slate-900/95 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-2xl p-2 shadow-2xl">
                <Link href="/#scanner" className="flex items-start gap-4 p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors group/item">
                  <div className="bg-black/5 dark:bg-white/5 p-2 rounded-lg text-slate-400 group-hover/item:text-indigo-600 dark:group-hover/item:text-cyan-400 transition-colors">
                    <Zap size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">Job Scanner</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Free scam detection</div>
                  </div>
                </Link>

                <Link href="/employers" className="flex items-start gap-4 p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors group/item">
                  <div className="bg-black/5 dark:bg-white/5 p-2 rounded-lg text-slate-400 group-hover/item:text-indigo-600 dark:group-hover/item:text-cyan-400 transition-colors">
                    <Shield size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">Employer Verification</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Trust badge for companies</div>
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

          <Link href="/intelligence" className="text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            Intelligence
          </Link>

          <Link href="/demo" className="text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            Live Demo
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 transition-all active:scale-95"
            aria-label="Toggle Theme"
          >
            {mounted && (theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />)}
          </button>

          <a
            href="/V2_GuardianDialer.apk"
            download="V2_GuardianDialer.apk"
            className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/20 hover:text-indigo-300 transition-all text-sm font-bold"
          >
            <Smartphone size={16} />
            Get App
          </a>

          <Link href="/for-employers" className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-50 dark:bg-cyan-950/50 border border-indigo-100 dark:border-cyan-500/30 text-indigo-600 dark:text-cyan-400 hover:bg-indigo-100 dark:hover:bg-cyan-900/50 hover:border-indigo-200 dark:hover:border-cyan-400/50 transition-all text-sm font-bold shadow-sm">
            For Employers
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 dark:bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500 dark:bg-cyan-500"></span>
            </span>
          </Link>

          <button
            className="md:hidden text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 dark:border-white/5 bg-white dark:bg-slate-900 px-6 py-4 flex flex-col gap-4 shadow-2xl">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold text-indigo-600 dark:text-cyan-400">Home</Link>
          <Link href="/#scanner" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold text-slate-600 dark:text-slate-300">Job Scanner</Link>
          <Link href="/intelligence" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold text-slate-600 dark:text-slate-300">Intelligence</Link>
          <Link href="/demo" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold text-slate-600 dark:text-slate-300">Live Demo</Link>
        </div>
      )}
    </nav>
  );
}