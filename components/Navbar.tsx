'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import DesktopMenu from './navbar/DesktopMenu';
import MobileMenu from './navbar/MobileMenu';
import UserActions from './navbar/UserActions';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <DesktopMenu />

        {/* Right: Actions & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <UserActions />
          <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
        </div>
      </div>
    </nav>
  );
}