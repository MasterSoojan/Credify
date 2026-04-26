'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  ExternalLink,
  CheckCircle2,
  XCircle,
  QrCode,
  Lock,
  Clock,
  Zap,
  ArrowRight,
  AlertCircle,
  Sun,
  Moon,
  X
} from 'lucide-react';

export default function LiveDemoPage() {

  const router = useRouter();

  // STATES
  const [darkMode, setDarkMode] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState('');
  const [verifyResult, setVerifyResult] = useState('');

  // ✅ SECURE ALERT STATES
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // LOAD THEME
  useEffect(() => {
    const saved = localStorage.getItem('theme');

    if (saved === 'light') {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, []);

  // TOGGLE THEME
  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!darkMode);
  };

  // REAL-TIME SCAN
  const handleScan = () => {
    setScanning(true);
    setScanResult('');

    setTimeout(() => {
      setScanning(false);
      setScanResult('✅ No suspicious activity detected');
    }, 2000);
  };

  // VERIFY TOOL
  const handleVerify = () => {
    if (!input) return alert('Enter link or domain');

    if (input.includes('scam') || input.includes('fake')) {
      setVerifyResult('❌ High Risk: Suspicious domain');
    } else {
      setVerifyResult('✅ Safe: No scam signals found');
    }
  };

  // 🔐 SECURE ALERT HANDLER
  const handleSecure = () => {
    if (!email || !email.includes('@')) {
      alert('Enter valid email');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setEmail('');
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-[#0B0F17] text-slate-900 dark:text-slate-200 pt-24 pb-20">

      <div className="max-w-5xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-12">

          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
            <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Live Verification
            </p>
          </div>

          <div className="flex gap-3 items-center">

            

            <Link
              href="/login"
              className="bg-slate-800 text-white px-5 py-2 rounded-lg flex items-center gap-2 text-sm"
            >
              Create Profile <ArrowRight size={14} />
            </Link>

          </div>
        </div>

        {/* BADGE */}
        <div className="flex justify-center mb-10">
          <div className="border rounded-full px-4 py-1 text-xs">
            Active Security Certificate
          </div>
        </div>

        {/* MAIN CARD */}
        <div className="border rounded-2xl p-8 bg-white dark:bg-slate-900 mb-8">

          <div className="flex justify-between flex-wrap gap-6">

            <div className="flex gap-4">
              <div className="w-14 h-14 bg-slate-200 dark:bg-slate-800 rounded-xl flex items-center justify-center">
                <ShieldCheck />
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  Credify Security Intelligence
                </h2>
                <p className="text-xs text-slate-500">
                  ID: CRD-OFFICIAL-001
                </p>
              </div>
            </div>

            <QrCode />
          </div>

          {/* POLICY */}
          <div className="mt-8">
            <p className="text-sm mb-4 flex gap-2">
              <AlertCircle size={14} /> Zero Tolerance Policy
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                "No Telegram / WhatsApp",
                "No text interviews",
                "No payment requests"
              ].map((item, i) => (
                <div key={i} className="flex gap-2 border p-3 rounded">
                  <XCircle size={14} className="text-red-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* FEATURES */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">

          <button
            type="button"
            onClick={() => router.push('/certificate/CRD-OFFICIAL-001')}
            className="border p-4 rounded-xl hover:scale-105 transition flex gap-2"
          >
            <Lock /> Signed Certificate
          </button>

          <button
            type="button"
            onClick={handleScan}
            className="border p-4 rounded-xl hover:scale-105 transition flex gap-2"
          >
            <Clock />
            {scanning ? 'Scanning...' : 'Real-time Check'}
          </button>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="border p-4 rounded-xl hover:scale-105 transition flex gap-2"
          >
            <Zap /> Instant Verification
          </button>

        </div>

        {/* ✅ SECURE ALERT CTA */}
        <div className="mt-10 text-center">

          <h2 className="text-2xl font-semibold mb-3">
            Stay Protected from Scams
          </h2>

          <p className="text-slate-500 mb-6">
            Get alerts when new scams are detected
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border px-4 py-2 rounded-lg bg-transparent"
            />

            <button
              type="button"
              onClick={handleSecure}
              disabled={loading}
              className="bg-emerald-500 text-black px-6 py-2 rounded-lg"
            >
              {loading ? 'Securing...' : 'Get Alerts'}
            </button>

          </div>

          {success && (
            <p className="text-emerald-500 mt-4">
              ✅ Alerts Activated
            </p>
          )}

        </div>

      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl w-[90%] max-w-md">

            <div className="flex justify-between mb-4">
              <h3>Verify Domain</h3>
              <button type="button" onClick={() => setShowModal(false)}>
                <X />
              </button>
            </div>

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter link..."
              className="w-full border p-2 rounded mb-4 bg-transparent"
            />

            <button
              type="button"
              onClick={handleVerify}
              className="w-full bg-emerald-500 py-2 rounded"
            >
              Verify
            </button>

            {verifyResult && (
              <p className="mt-4 text-center">{verifyResult}</p>
            )}

          </div>

        </div>
      )}

    </main>
  );
}