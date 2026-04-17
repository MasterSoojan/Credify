'use client';

import VerificationForm from '../components/VerificationForm';
import ScamTicker from '../components/ScamTicker';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // States for the Login/Signup Pop-Up
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  // Prevents hydration flicker
  useEffect(() => setMounted(true), []);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans transition-colors duration-300 relative">
      
      {/* --- NAVIGATION BAR --- */}
      <nav className="w-full bg-[var(--background)] border-b border-slate-200 dark:border-slate-800 py-4 shadow-sm transition-colors duration-300 relative z-20">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight">Credify.</h1>
          
          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            {mounted && (
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            )}

            <button 
              onClick={() => setShowAuthModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full text-sm font-bold transition-all shadow-md active:scale-95"
            >
              Login / Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* --- FEATURE #4: LIVE THREAT TICKER --- */}
      <ScamTicker />

      {/* --- HERO SECTION & SCANNER --- */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center relative z-10">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
          Digital Defense for Job Seekers
        </div>
        
        <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-[1.1] transition-colors duration-300">
          Shielding your <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-300">
            Professional Future.
          </span>
        </h2>
        
        <p className="opacity-70 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
          AI-powered forensic analysis to detect recruiter scams, fake offer letters, and predatory placement agents.
        </p>
        
        {/* Your Master Scanner Component */}
        <VerificationForm />
      </section>

      {/* --- AUTHENTICATION MODAL --- */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-[var(--background)] w-full max-w-md p-8 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 relative text-[var(--foreground)]">
            
            <button 
              onClick={() => setShowAuthModal(false)}
              className="absolute top-6 right-6 opacity-40 hover:opacity-100 transition-opacity text-xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-3xl font-black mb-2 tracking-tight">
              {isLogin ? 'Welcome Back' : 'Join Credify'}
            </h2>
            <p className="text-sm opacity-60 mb-8">
              {isLogin ? 'Securely access your scam report history.' : 'Start protecting yourself and others today.'}
            </p>

            <form className="flex flex-col gap-4">
              {!isLogin && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest opacity-50 mb-2 ml-1">Full Name</label>
                  <input type="text" placeholder="Alex Chen" className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                </div>
              )}
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest opacity-50 mb-2 ml-1">Email Address</label>
                <input type="email" placeholder="you@college.edu" className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest opacity-50 mb-2 ml-1">Password</label>
                <input type="password" placeholder="••••••••" className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
              </div>
              
              <button type="button" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-2xl mt-4 transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98]">
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <p className="text-center text-sm opacity-60 mt-8">
              {isLogin ? "New to Credify? " : "Already protected? "}
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline outline-none"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>

          </div>
        </div>
      )}

      {/* Decorative background element for that pro look */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 dark:opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-400 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400 blur-[120px] rounded-full"></div>
      </div>
    </main>
  );
}