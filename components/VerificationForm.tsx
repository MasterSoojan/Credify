'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  FileSearch, 
  Mail, 
  UploadCloud, 
  AlertTriangle,
  Fingerprint,
  Activity
} from 'lucide-react';

export default function VerificationForm() {
  const [scanType, setScanType] = useState<'email' | 'letter'>('email');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<{ trustScore: number; status: string; isVerified: boolean; domain?: string; companyName?: string; aiSummary?: string } | null>(null);
  const [scanStep, setScanStep] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [email, setEmail] = useState('');
  const [letterText, setLetterText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const forensicSteps = scanType === 'email' 
    ? ["Initializing Deep Scan...", "Checking MX Records...", "Verifying Domain Age...", "Searching Blacklists...", "Analysis Complete."]
    : ["Extracting Metadata...", "Scanning for Alterations...", "Analyzing Signatures...", "Checking Templates...", "Analysis Complete."];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setScanStep((prev) => (prev < forensicSteps.length - 1 ? prev + 1 : prev));
      }, 500); 
    }
    return () => clearInterval(interval);
  }, [loading, forensicSteps.length]);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setErrorMessage('');
    setScanStep(0);

    let fileBase64 = "";
    let mimeType = "";
    if (file) {
      mimeType = file.type;
      const reader = new FileReader();
      const filePromise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = reject;
      });
      reader.readAsDataURL(file);
      fileBase64 = await filePromise;
    }

    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            type: scanType, 
            email: scanType === 'email' ? email.trim() : "", 
            letterText: letterText,
            fileName: file?.name || "document",
            fileData: fileBase64,
            mimeType: mimeType
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Forensic server unreachable.");
      }

      const data = await response.json();
      setResult(data);
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900/80 backdrop-blur-xl p-1 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-white/10 max-w-2xl mx-auto overflow-hidden">
      
      {/* HEADER TABS */}
      <div className="flex p-2 bg-slate-100/50 dark:bg-slate-950/50 rounded-[2.2rem] m-2">
        <button 
          onClick={() => { setScanType('email'); setResult(null); }} 
          className={`flex items-center justify-center gap-2 flex-1 py-4 text-xs font-black uppercase tracking-widest rounded-3xl transition-all ${scanType === 'email' ? 'bg-white dark:bg-slate-800 shadow-lg text-indigo-600 dark:text-cyan-400' : 'text-slate-500'}`}
        >
          <Mail size={16} /> Email Analysis
        </button>
        <button 
          onClick={() => { setScanType('letter'); setResult(null); }} 
          className={`flex items-center justify-center gap-2 flex-1 py-4 text-xs font-black uppercase tracking-widest rounded-3xl transition-all ${scanType === 'letter' ? 'bg-white dark:bg-slate-800 shadow-lg text-indigo-600 dark:text-cyan-400' : 'text-slate-500'}`}
        >
          <FileSearch size={16} /> PDF Forensic
        </button>
      </div>

      <div className="p-6 md:p-8">
        <form onSubmit={handleScan} className="space-y-6">
          {scanType === 'email' ? (
            <div className="group">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 ml-2">
                <Fingerprint size={12} /> Target Identity
              </label>
              <input 
                type="email" 
                required 
                placeholder="recruiter@company-verification.com" 
                className="w-full p-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-500 transition-all text-slate-900 dark:text-white font-medium" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
          ) : (
            <div className="space-y-6">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`group border-2 border-dashed rounded-[2rem] p-10 text-center cursor-pointer transition-all ${file ? 'border-cyan-500 bg-cyan-500/5' : 'border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-cyan-500/40'}`}
              >
                <input type="file" ref={fileInputRef} className="hidden" accept=".pdf,.jpg,.png" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                <UploadCloud size={40} className={`mx-auto mb-4 ${file ? 'text-cyan-500' : 'text-slate-400'}`} />
                <p className="text-sm font-black text-slate-700 dark:text-slate-200">
                  {file ? file.name : 'DROP OFFER LETTER HERE'}
                </p>
                <p className="text-[10px] font-bold text-slate-400 mt-2 tracking-widest uppercase italic">Secure PDF/IMG Analysis</p>
              </div>

              <div className="relative flex items-center gap-4 py-2">
                <div className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-800"></div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Forensic Text OCR</span>
                <div className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-800"></div>
              </div>

              <textarea 
                placeholder="Paste raw text if file is unavailable..." 
                rows={3} 
                className="w-full p-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none text-slate-900 dark:text-white resize-none" 
                value={letterText} 
                onChange={(e) => setLetterText(e.target.value)} 
              />
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-slate-950 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-700 disabled:opacity-50 text-white font-black py-5 rounded-2xl transition-all shadow-xl flex justify-center items-center gap-3 active:scale-[0.98] group"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                <span className="animate-pulse text-xs tracking-widest uppercase">{forensicSteps[scanStep]}</span>
              </>
            ) : (
              <>
                <Activity size={18} className="group-hover:animate-pulse" />
                <span className="tracking-widest uppercase text-xs">Execute Forensic Scan</span>
              </>
            )}
          </button>

          {errorMessage && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <AlertTriangle size={16} />
              {errorMessage}
            </div>
          )}
        </form>

        {/* --- RESULTS PANEL --- */}
        {result && (
          <div className={`mt-10 p-8 rounded-[2rem] border animate-in zoom-in duration-500 ${result.trustScore > 80 ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'}`}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="text-3xl font-black tracking-tighter dark:text-white mb-1">
                  Score: {result.trustScore}%
                </h4>
                <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${result.trustScore > 80 ? 'text-emerald-500' : 'text-red-500'}`}>
                  {result.trustScore > 80 ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
                  {result.status}
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Case ID</p>
                <p className="text-xs font-mono text-slate-500">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              </div>
            </div>
            
            <div className="p-5 bg-white dark:bg-slate-950/50 rounded-2xl border border-slate-100 dark:border-white/5 mb-6">
               <p className="text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                {result.isVerified 
                  ? `Authenticated: The entity (${result.domain}) matches our secure database of legitimate corporations.` 
                  : `Alert: The source (${result.domain || 'Unknown'}) failed our verification protocol.`}
              </p>
            </div>

            {result.aiSummary && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 dark:text-cyan-400">
                  <Activity size={12} /> Neural Analysis Report
                </div>
                <div className="text-xs italic leading-relaxed text-slate-500 dark:text-slate-400 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border-l-4 border-indigo-500">
                  "{result.aiSummary}"
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}