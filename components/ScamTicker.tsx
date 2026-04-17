'use client';

export default function ScamTicker() {
  const scams = [
    "Blocked: tcs-hr-portal.org (Phishing)",
    "Alert: Fake 'Google India' form reported in Bangalore",
    "Blocked: careers-amazon-india.in (Scam)",
    "Reported: Fraudulent Wipro offer letter via Telegram",
    "Shielded: 45 students saved from 'Deloitte-Jobs.net' scam",
  ];

  return (
    <div className="bg-indigo-600 dark:bg-indigo-900 py-2 overflow-hidden whitespace-nowrap">
      <div className="flex animate-marquee gap-12 items-center">
        {/* We repeat the list to ensure the loop is seamless */}
        {[...scams, ...scams].map((text, i) => (
          <span key={i} className="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-3">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-ping"></span>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}