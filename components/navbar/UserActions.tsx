'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Smartphone } from 'lucide-react';

interface UserActionsProps {
  setMobileMenuOpen?: (isOpen: boolean) => void;
  isMobileMenuOpen?: boolean;
}

export default function UserActions({ setMobileMenuOpen, isMobileMenuOpen }: UserActionsProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined' && localStorage.getItem('credify_user')) {
      setIsLoggedIn(true);
      const pic = localStorage.getItem('credify_profile_pic');
      if (pic) setProfilePic(pic);
    }
  }, []);

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 transition-all active:scale-95"
        aria-label="Toggle Theme"
      >
        {mounted && (theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />)}
      </button>

      <Link
        href="/get-app"
        className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/20 hover:text-indigo-300 transition-all text-sm font-bold"
      >
        <Smartphone size={16} />
        Get App
      </Link>

      {mounted && isLoggedIn ? (
        <div className="relative group cursor-pointer hidden md:block">
          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors group-hover:border-indigo-300 dark:group-hover:border-cyan-500/50 overflow-hidden">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            )}
          </div>
          
          <div className="absolute top-full right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-2 shadow-xl flex flex-col gap-1">
              <Link href="/profile" className="px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors font-semibold">
                Edit Profile
              </Link>
              <Link href="/settings" className="px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors font-semibold block">
                Settings
              </Link>
              <div className="border-t border-slate-100 dark:border-slate-800 my-1"></div>
              <button 
                onClick={() => {
                  localStorage.removeItem('credify_user');
                  window.location.href = '/';
                }}
                className="w-full text-left px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors font-semibold"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Link href="/login" className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-50 dark:bg-cyan-950/50 border border-indigo-100 dark:border-cyan-500/30 text-indigo-600 dark:text-cyan-400 hover:bg-indigo-100 dark:hover:bg-cyan-900/50 hover:border-indigo-200 dark:hover:border-cyan-400/50 transition-all text-sm font-bold shadow-sm">
          Login / Sign Up
        </Link>
      )}

      {/* Hamburger passed down or handled here, but we put it inside MobileMenu. Actually we can render MobileMenu inside Navbar */}
    </div>
  );
}
