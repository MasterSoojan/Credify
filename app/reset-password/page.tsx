'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react'; // Pass icon

export default function ResetPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Password show/hide
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send reset email');
      }

      setSuccess('If an account exists, a password reset link has been sent to your email.');

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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mt-6">Reset Password</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Enter your email and a new password.</p>
        </div>

        <form onSubmit={handleReset} className="flex flex-col gap-4">
          {error && (
            <div className="p-3 bg-red-100 text-red-600 border border-red-200 rounded-xl text-sm text-center">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 bg-green-100 text-green-700 border border-green-200 rounded-xl text-sm text-center">
              {success}
            </div>
          )}

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
          
          <button 
            type="submit" 
            disabled={isLoading || !!success}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-md mt-4"
          >
            {isLoading ? 'Sending Link...' : 'Send Reset Link'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8">
          Remember your password? <Link href="/login" className="text-indigo-600 dark:text-indigo-400 font-bold cursor-pointer hover:underline">Log in</Link>
        </p>
      </div>
    </main>
  );
}
