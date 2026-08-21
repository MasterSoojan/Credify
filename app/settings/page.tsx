'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, KeyRound, ShieldAlert, Eye, EyeOff } from 'lucide-react';

export default function SettingsPage() {
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('saving');
    setErrorMessage('');

    const currentUser = localStorage.getItem('credify_user');

    if (!currentUser) {
      setStatus('error');
      setErrorMessage('User session not found.');
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setStatus('error');
      setErrorMessage('New passwords do not match.');
      return;
    }

    if (passwords.newPassword.length < 8) {
      setStatus('error');
      setErrorMessage('New password must be at least 8 characters long.');
      return;
    }

    try {
      // 1. Verify old password
      const loginRes = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: currentUser, password: passwords.oldPassword })
      });

      if (!loginRes.ok) {
        setStatus('error');
        setErrorMessage('Current password is incorrect.');
        return;
      }

      // 2. Update password
      const resetRes = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: currentUser, newPassword: passwords.newPassword })
      });

      if (!resetRes.ok) {
        throw new Error('Failed to update password');
      }

      setStatus('saved');
      setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'An error occurred.');
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0A0F1C] pt-32 pb-20 px-6 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-cyan-400 mb-8 w-fit hover:opacity-80 transition-opacity">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-10 pb-8 border-b border-slate-100 dark:border-slate-800">
            <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-cyan-950/50 flex items-center justify-center text-indigo-600 dark:text-cyan-400">
              <KeyRound size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white">Account Settings</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage your security and password preferences.</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Change Password</h2>

            {status === 'error' && (
              <div className="p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50 rounded-2xl flex items-center gap-3 text-rose-700 dark:text-rose-400 text-sm">
                <ShieldAlert size={18} /> {errorMessage}
              </div>
            )}

            {status === 'saved' && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl flex items-center gap-3 text-emerald-700 dark:text-emerald-400 text-sm">
                <KeyRound size={18} /> Password successfully updated.
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">Current Password</label>
              <div className="relative">
                <input 
                  type={showOldPassword ? "text" : "password"}
                  name="oldPassword"
                  value={passwords.oldPassword}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-500 transition-all text-sm pr-12" 
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">New Password</label>
                <div className="relative">
                  <input 
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handleChange}
                    required
                    className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-500 transition-all text-sm pr-12" 
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">Re-enter New Password</label>
                <div className="relative">
                  <input 
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={passwords.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-500 transition-all text-sm pr-12" 
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button 
                type="submit"
                disabled={status === 'saving'}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md disabled:opacity-70"
              >
                {status === 'saving' ? 'Updating...' : <><Save size={18} /> Update Password</>}
              </button>
            </div>

          </form>
        </div>
      </div>
    </main>
  );
}
