'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [backupEmail, setBackupEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedUserId, setGeneratedUserId] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password: password.trim(), backupEmail: backupEmail.trim() })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }
      
      // Save profile data immediately for local usage (optional, but keeping it as requested)
      localStorage.setItem('credify_profile_data', JSON.stringify({
        name: name,
        email: email.trim(),
        age: '',
        gender: 'prefer-not-to-say',
        occupation: '',
        location: ''
      }));

      setGeneratedUserId(data.user.userId);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight cursor-pointer">
            Credify.
          </Link>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mt-6">Create Account</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Join to start verifying job offers.</p>
        </div>

        {generatedUserId ? (
          <div className="flex flex-col items-center gap-6 animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Account Created!</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Please save your auto-generated User ID. You will need it to log in securely.</p>
            </div>
            
            <div className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl text-center">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Your User ID</p>
              <p className="text-2xl font-mono font-bold text-indigo-600 dark:text-cyan-400 tracking-wider select-all">{generatedUserId}</p>
            </div>

            <button 
              onClick={() => router.push('/login')}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md mt-4"
            >
              Continue to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            {error && (
              <div className="p-3 bg-red-100 text-red-600 border border-red-200 rounded-xl text-sm text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Alex Doe" 
                className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">Email</label>
              <input 
                type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@college.edu" 
              className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">Backup Email (Optional)</label>
            <input 
              type="email" 
              value={backupEmail}
              onChange={(e) => setBackupEmail(e.target.value)}
              placeholder="backup@example.com" 
              className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••" 
                className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white transition-all pr-12"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-md mt-4"
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
        )}

        {!generatedUserId && (
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8">
            Already have an account? <Link href="/login" className="text-indigo-600 dark:text-indigo-400 font-bold cursor-pointer hover:underline">Sign in</Link>
          </p>
        )}
      </div>
    </main>
  );
}
