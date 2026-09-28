'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { ArrowUpRight, Menu, Moon, ShieldCheck, Sun, X } from 'lucide-react';

const navigation = [
  { href: '/job-scanner', label: 'Check an offer' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/help-center', label: 'Safety hub' },
  { href: '/employers', label: 'For employers' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="Credify home" onClick={() => setOpen(false)}>
          <span className="brand-mark">
            <ShieldCheck size={28} strokeWidth={2} />
          </span>
          Credify<span className="brand-dot">.</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="icon-button theme-toggle"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle color theme"
          >
            <Sun className="sun-icon" size={19} />
            <Moon className="moon-icon" size={19} />
          </button>
          <Link className="header-signin" href="/profile">
            My account <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          <button
            ref={menuButton}
            className="icon-button mobile-menu-toggle"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
          {[...navigation, { href: '/profile', label: 'My account' }].map((item) => (
            <Link
              href={item.href}
              key={item.href}
              aria-current={pathname === item.href ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
