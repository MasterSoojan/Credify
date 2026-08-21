'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  return (
    <>
      <button
        className="md:hidden text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle mobile menu"
      >
        <Menu size={24} />
      </button>

      {isOpen && (
        <div className="absolute top-20 left-0 w-full md:hidden border-t border-slate-100 dark:border-white/5 bg-white dark:bg-slate-900 px-6 py-4 flex flex-col gap-4 shadow-2xl">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-sm font-bold text-indigo-600 dark:text-cyan-400">Home</Link>
          <Link href="/verifiers" onClick={() => setIsOpen(false)} className="text-sm font-semibold text-slate-600 dark:text-slate-300">Verifiers</Link>
          <Link href="/intelligence" onClick={() => setIsOpen(false)} className="text-sm font-semibold text-slate-600 dark:text-slate-300">Intelligence</Link>
          <Link href="/demo" onClick={() => setIsOpen(false)} className="text-sm font-semibold text-slate-600 dark:text-slate-300">Live Demo</Link>
        </div>
      )}
    </>
  );
}
