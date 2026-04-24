'use client';

import { Terminal, Code, Key, BookOpen, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ApiAccessPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0A0F1C] text-slate-900 dark:text-slate-200 pt-32 pb-20 relative overflow-hidden transition-colors duration-300">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-20 right-[-10%] w-[40%] h-125 bg-blue-500/10 dark:bg-indigo-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <Link 
          href="/" 
          className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors mb-10 w-fit"
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 rounded-xl flex items-center justify-center transition-colors">
            <Terminal className="text-indigo-600 dark:text-indigo-400" size={24} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight transition-colors">
            API Access
          </h1>
        </div>

        <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg mb-12 transition-colors">
          Integrate the Credify Verification Engine directly into your job boards, ATS platforms, or communication tools using our REST API.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Endpoints & Auth */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-2xl p-6 backdrop-blur-md transition-colors">
              <h3 className="text-slate-900 dark:text-white font-bold mb-4 flex items-center gap-2 transition-colors">
                <Key size={18} className="text-indigo-600 dark:text-cyan-400" /> Authentication
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 transition-colors">
                All API requests require a Bearer token generated from your employer dashboard.
              </p>
              <button className="w-full bg-indigo-600 dark:bg-white/5 hover:bg-indigo-700 dark:hover:bg-white/10 border border-indigo-500 dark:border-white/10 text-white text-sm font-bold py-2.5 rounded-lg transition-all shadow-md dark:shadow-none">
                Generate API Key
              </button>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-2xl p-6 backdrop-blur-md transition-colors">
              <h3 className="text-slate-900 dark:text-white font-bold mb-4 flex items-center gap-2 transition-colors">
                <BookOpen size={18} className="text-emerald-600 dark:text-emerald-400" /> Core Endpoints
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center justify-between text-sm">
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">POST</span>
                  <span className="text-slate-700 dark:text-slate-300 transition-colors">/v1/verify/email</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">POST</span>
                  <span className="text-slate-700 dark:text-slate-300 transition-colors">/v1/verify/document</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="font-mono text-blue-600 dark:text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">GET</span>
                  <span className="text-slate-700 dark:text-slate-300 transition-colors">/v1/company/lookup</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Code Snippet */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900 dark:bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl transition-colors">
              
              {/* Code Header */}
              <div className="bg-slate-800 dark:bg-slate-900 px-4 py-3 border-b border-slate-700 dark:border-slate-800 flex items-center gap-2 transition-colors">
                <Code size={16} className="text-slate-400 dark:text-slate-500" />
                <span className="text-xs font-mono text-slate-300 dark:text-slate-400">verify-integration.js</span>
              </div>
              
              {/* Code Body */}
              <div className="p-6 overflow-x-auto bg-slate-900 dark:bg-transparent">
                <pre className="text-sm font-mono text-slate-300 leading-relaxed">
                  <code>
<span className="text-rose-400">const</span> response = <span className="text-cyan-400">await</span> fetch(<span className="text-emerald-300">'https://api.credify.app/v1/verify/email'</span>, {'{\n'}
  method: <span className="text-emerald-300">'POST'</span>,
  headers: {'{\n'}
    <span className="text-emerald-300">'Authorization'</span>: <span className="text-emerald-300">'Bearer YOUR_API_KEY'</span>,
    <span className="text-emerald-300">'Content-Type'</span>: <span className="text-emerald-300">'application/json'</span>
  {'}'},
  body: JSON.stringify({'{\n'}
    email: <span className="text-emerald-300">'hr@acmerecruiting.com'</span>,
    domainContext: <span className="text-emerald-300">'acmerecruiting.com'</span>
  {'}'})
{'}'});
{' \n'}
<span className="text-rose-400">const</span> result = <span className="text-cyan-400">await</span> response.json();
console.log(result.trustScore); <span className="text-slate-500">// Returns: 98</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}