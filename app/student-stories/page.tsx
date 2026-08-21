import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function Page() {
  return (
    <main className='min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto text-slate-900 dark:text-slate-200'>
      <Link href='/' className='flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-cyan-400 mb-8 w-fit'>
        <ArrowLeft size={16} /> Back to Home
      </Link>
      <h1 className='text-5xl font-black mb-6'>Student Stories</h1>
      <div className='bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-10'>
        <p className='text-lg text-slate-600 dark:text-slate-400'>Detailed content for Student Stories is currently being updated. Check back soon for the latest information!</p>
      </div>
    </main>
  );
}
