'use client';

import { useState, useEffect, useRef } from 'react';

export default function VerificationForm() {
  const [scanType, setScanType] = useState<'email' | 'letter'>('email');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [scanStep, setScanStep] = useState(0);
  const [email, setEmail] = useState('');
  const [letterText, setLetterText] = useState('');
  
  // States for File Upload
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const forensicSteps = scanType === 'email' 
    ? ["Initializing Deep Scan...", "Checking MX Records...", "Verifying Domain Age...", "Searching Blacklists...", "Analysis Complete."]
    : ["Extracting Metadata...", "Scanning for Digital Alterations...", "Analyzing Signature Authenticity...", "Checking Template Patterns...", "Analysis Complete."];

  useEffect(() => {
    let interval: any;
    if (loading) {
      setScanStep(0);
      interval = setInterval(() => {
        setScanStep((prev) => (prev < forensicSteps.length - 1 ? prev + 1 : prev));
      }, 400); 
    }
    return () => clearInterval(interval);
  }, [loading, scanType]);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    // If a file is attached, we simulate a 2-second delay for "OCR"
    await new Promise(r => setTimeout(r, 2000));

    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            type: scanType, 
            email: email,
            letterText: letterText,
            fileName: file?.name 
        }),
      });

      // --- NEW ROBUST ERROR HANDLING ---
      if (!response.ok) {
        const errorText = await response.text();
        console.error("🚨 BACKEND CRASHED! Reason:", errorText);
        alert("Backend Error: " + errorText);
        setLoading(false);
        return;
      }

      const data = await response.json();
      setResult(data);
      
    } catch (error) {
      console.error("🚨 FRONTEND ERROR:", error);
      alert("Frontend caught an error! Check your VS Code Terminal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 md:p-10 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 max-w-2xl mx-auto transition-all duration-300">
      
      {/* TABS */}
      <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-8">
        <button onClick={() => { setScanType('email'); setResult(null); }} className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${scanType === 'email' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}>📧 Email Scan</button>
        <button onClick={() => { setScanType('letter'); setResult(null); }} className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${scanType === 'letter' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}>📄 Letter/PDF Scan</button>
      </div>

      <form onSubmit={handleScan} className="flex flex-col gap-5 text-left">
        {scanType === 'email' ? (
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Recruiter Email</label>
            <input type="email" required placeholder="hr@tcs-india-jobs.org" className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none text-slate-900 dark:text-white" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        ) : (
          <div className="space-y-4">
            {/* FILE UPLOAD ZONE */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${file ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-200 dark:border-slate-700 hover:border-indigo-400'}`}
            >
              <input type="file" ref={fileInputRef} className="hidden" accept=".pdf,.jpg,.png" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              <div className="text-4xl mb-2">{file ? '✅' : '📁'}</div>
              <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
                {file ? file.name : 'Click to upload Offer Letter (PDF/IMG)'}
              </p>
              <p className="text-xs text-slate-400 mt-1">Maximum size: 5MB</p>
            </div>

            <div className="relative">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t dark:border-slate-800"></span></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-slate-900 px-2 text-slate-400">Or paste text</span></div>
            </div>

            <textarea placeholder="Paste letter content here if you don't have the file..." rows={3} className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none text-slate-900 dark:text-white resize-none" value={letterText} onChange={(e) => setLetterText(e.target.value)} />
          </div>
        )}
        
        <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex justify-center items-center">
          {loading ? (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span className="animate-pulse">{forensicSteps[scanStep]}</span>
            </div>
          ) : `Start Forensic Scan`}
        </button>
      </form>

      {/* Results Section */}
      {result && (
        <div className={`mt-8 p-6 rounded-2xl text-left border animate-in zoom-in duration-300 ${result.trustScore > 80 ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/50' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/50'}`}>
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">TrustScore: {result.trustScore}/100</h4>
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${result.trustScore > 80 ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>{result.status}</span>
          </div>
          
          {/* Tweaked this to display the Supabase domain/verification message clearly */}
          <p className="text-sm opacity-80 leading-relaxed text-slate-700 dark:text-slate-300">
            {result.isVerified 
              ? `Target Domain (${result.domain}) is an officially registered and verified employer on the Credify network. Safe to proceed.` 
              : `Target Domain (${result.domain || 'Unknown'}) is NOT registered in the verified employer database. High risk of impersonation.`}
          </p>
        </div>
      )}
    </div>
  );
}