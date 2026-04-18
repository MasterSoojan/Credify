'use client';

import { Terminal, Code, Key, BookOpen, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ApiAccessPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 pt-32 pb-20 relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-20 right-[-10%] w-[40%] h-125 bg-indigo-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <Link 
          href="/" 
          className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-slate-400 hover:text-white transition-colors mb-10 w-fit"
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center">
            <Terminal className="text-indigo-400" size={24} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            API Access
          </h1>
        </div>

        <p className="text-slate-400 max-w-2xl text-lg mb-12">
          Integrate the Credify Verification Engine directly into your job boards, ATS platforms, or communication tools using our REST API.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Endpoints & Auth */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Key size={18} className="text-cyan-400" /> Authentication
              </h3>
              <p className="text-sm text-slate-400 mb-4">
                All API requests require a Bearer token generated from your employer dashboard.
              </p>
              <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-bold py-2.5 rounded-lg transition-colors">
                Generate API Key
              </button>
            </div>

            <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <BookOpen size={18} className="text-emerald-400" /> Core Endpoints
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center justify-between text-sm">
                  <span className="font-mono text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">POST</span>
                  <span className="text-slate-300">/v1/verify/email</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="font-mono text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">POST</span>
                  <span className="text-slate-300">/v1/verify/document</span>
                </li>
                <li className="flex items-center justify-between text-sm">
                  <span className="font-mono text-blue-400 bg-blue-400/10 px-1.5 py-0.5 rounded">GET</span>
                  <span className="text-slate-300">/v1/company/lookup</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Code Snippet */}
          <div className="lg:col-span-2">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              
              {/* Code Header */}
              <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center gap-2">
                <Code size={16} className="text-slate-500" />
                <span className="text-xs font-mono text-slate-400">verify-integration.js</span>
              </div>
              
              {/* Code Body */}
              <div className="p-6 overflow-x-auto">
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