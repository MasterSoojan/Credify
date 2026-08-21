'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Radar, 
  Search, 
  ArrowRight,
  Clock,
  RefreshCw
} from 'lucide-react';

export default function IntelligencePage() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://dev.to/api/articles?tag=security&per_page=4&t=${new Date().getTime()}`);
      const data = await res.json();
      setNews(data);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-[#0A0F1C] text-slate-900 dark:text-slate-200 pt-32 pb-20 relative overflow-hidden transition-colors duration-300">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-[500px] bg-blue-500/10 dark:bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Top Navigation Row */}
        <div className="flex items-center justify-between mb-16">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to Scanner
          </Link>
          
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500">
            <ShieldCheck size={14} className="text-slate-400 dark:text-slate-400" /> Credify Security
          </div>
        </div>

        {/* Threat Label */}
        <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-rose-600 dark:text-rose-500 mb-4">
          <Radar size={14} /> Threat Intelligence
        </div>

        {/* Header Area (Title & Search) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-wide mb-3">
              Security Briefings
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
              Forensic analysis of the latest recruitment fraud tactics.
            </p>
          </div>


        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          <div className="bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 rounded-2xl py-8 flex flex-col items-center justify-center backdrop-blur-sm shadow-sm dark:shadow-none">
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">714+</h3>
            <p className="text-[10px] font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">Scans Detected</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 rounded-2xl py-8 flex flex-col items-center justify-center backdrop-blur-sm shadow-sm dark:shadow-none">
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">12</h3>
            <p className="text-[10px] font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">Threat Briefings</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 rounded-2xl py-8 flex flex-col items-center justify-center backdrop-blur-sm shadow-sm dark:shadow-none">
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">400%</h3>
            <p className="text-[10px] font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">Rise in Telegram Scams</p>
          </div>
        </div>




        {/* Latest News Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Radar size={24} className="text-indigo-600 dark:text-cyan-400" />
              Latest Intelligence Updates
            </h2>
            <button onClick={fetchNews} className="text-sm font-bold text-indigo-600 dark:text-cyan-400 hover:text-indigo-700 dark:hover:text-cyan-300 transition-colors flex items-center gap-1">
              Refresh <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              <p className="text-slate-500">Loading live updates...</p>
            ) : (
              news.map((item) => (
                <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 transition-colors hover:border-indigo-400 dark:hover:border-slate-500 shadow-sm group block">
                  <span className="text-xs font-bold text-indigo-600 dark:text-cyan-400 uppercase tracking-wider mb-2 block">Security Update</span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3">{item.description}</p>
                  <div className="mt-4 text-xs font-semibold text-slate-500 flex items-center gap-1.5"><Clock size={12} /> {new Date(item.published_at).toLocaleDateString()}</div>
                </a>
              ))
            )}
          </div>
        </div>

      </div>
    </main>
  );
}