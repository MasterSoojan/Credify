import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight cursor-pointer">
            Credify.
          </Link>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mt-6">Welcome Back</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Sign in to report scams and track verifications.</p>
        </div>

        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">Email</label>
            <input 
              type="email" 
              placeholder="you@college.edu" 
              className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white transition-all"
            />
          </div>
          
          <button 
            type="button" 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-md mt-4"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8">
          Don't have an account? <span className="text-indigo-600 dark:text-indigo-400 font-bold cursor-pointer hover:underline">Sign up</span>
        </p>
      </div>
    </main>
  );
}