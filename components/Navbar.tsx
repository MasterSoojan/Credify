'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  ShieldCheck, 
  ChevronDown, 
  Menu, 
  Zap, 
  Shield, 
  Building, 
  Server, 
  Activity 
} from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-slate-950/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <ShieldCheck size={28} className="text-cyan-400 group-hover:text-cyan-300 transition-colors" />
          <span className="font-black text-2xl tracking-tighter text-white">
            Credify.
          </span>
        </Link>

        {/* Center: Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10 h-full">
          
          {/* Products Dropdown - The Magic is Here */}
          <div className="relative group h-full flex items-center cursor-pointer">
            <div className="flex items-center gap-1 text-sm font-semibold text-white transition-colors">
              Products 
              <ChevronDown size={14} className="opacity-70 transition-transform duration-200 group-hover:rotate-180" />
            </div>

            {/* Dropdown Content */}
            <div className="absolute top-full left-0 mt-0 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
              <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl">
                
                <Link href="#scanner" className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group/item">
                  <div className="bg-white/5 p-2 rounded-lg text-slate-400 group-hover/item:text-cyan-400 transition-colors">
                    <Zap size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white mb-0.5">Job Scanner</div>
                    <div className="text-xs text-slate-400">Free scam detection</div>
                  </div>
                </Link>

                <Link href="/employers" className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group/item">
                  <div className="bg-white/5 p-2 rounded-lg text-slate-400 group-hover/item:text-cyan-400 transition-colors">
                    <Shield size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white mb-0.5">Employer Verification</div>
                    <div className="text-xs text-slate-400">Trust badge for companies</div>
                  </div>
                </Link>

<Link href="/search" className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group/item">                  <div className="bg-white/5 p-2 rounded-lg text-slate-400 group-hover/item:text-cyan-400 transition-colors">
                    <Building size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white mb-0.5">Company Search</div>
                    <div className="text-xs text-slate-400">Verify any employer</div>
                  </div>
                </Link>

                <Link href="#api-access" className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group/item">
                  <div className="bg-white/5 p-2 rounded-lg text-slate-400 group-hover/item:text-cyan-400 transition-colors">
                    <Server size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white mb-0.5">API Access</div>
                    <div className="text-xs text-slate-400">B2B platform integration</div>
                  </div>
                </Link>

                

                {/* Status Footer */}
                <div className="mt-2 pt-3 border-t border-white/5 px-3 pb-2 flex items-center gap-2 text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                  <Activity size={12} className="text-cyan-500/70" />
                  Engine operational • v3
                </div>

              </div>
            </div>
          </div>
          {/* End of Products Dropdown */}
          
          <Link href="/intelligence" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">
            Intelligence
          </Link>
          
          <Link href="/demo" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">
            Live Demo
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <Link href="/support" className="hidden lg:block text-sm font-semibold text-slate-400 hover:text-white transition-colors mr-2">
            Support
          </Link>

          

          <button className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-900/50 hover:border-cyan-400/50 transition-all text-sm font-bold shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <Link href="/for-employers" className="hidden lg:block text-sm font-semibold text-slate-400 hover:text-white transition-colors mr-2">
            For Employers
          </Link>
          <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <link href="/for-employers"></link>
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-slate-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Content (Simplified) */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/5 bg-slate-900 px-6 py-4 flex flex-col gap-4">
          <Link href="#scanner" className="text-sm font-semibold text-slate-300">Job Scanner</Link>
          <Link href="#intelligence" className="text-sm font-semibold text-slate-300">Intelligence</Link>
          <Link href="#demo" className="text-sm font-semibold text-slate-300">Live Demo</Link>
        </div>
      )}
    </nav>
  );
}