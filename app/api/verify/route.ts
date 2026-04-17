import { NextResponse } from 'next/server';

// Simulation of "Deep Scan" processing time
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, letterText, type, fileName } = body;

    // Force a 2-second delay so the user sees the forensic animations
    await sleep(2000);

    // --- 1. EMAIL SCAN LOGIC ---
    if (type === 'email') {
      if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

      const domain = email.split('@')[1]?.toLowerCase();
      
      // Check for free providers
      const freeProviders = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
      if (freeProviders.includes(domain)) {
        return NextResponse.json({
          trustScore: 15,
          status: 'HIGH RISK',
          message: `Forensic analysis detected a free mail server (${domain}). Official corporate recruiters never use public domains for job offers.`
        });
      }

      // Check for suspicious "Lookalike" keywords
      const suspiciousKeywords = ['careers-india', 'recruitment-desk', 'hr-dept', 'job-offer', 'verification'];
      const isLookalike = suspiciousKeywords.some(keyword => domain.includes(keyword));
      
      if (isLookalike) {
         return NextResponse.json({
          trustScore: 35,
          status: 'SUSPICIOUS',
          message: `The domain ${domain} contains keywords commonly used in "lookalike" phishing attacks to mimic real companies.`
        });
      }

      return NextResponse.json({
        trustScore: 94,
        status: 'VERIFIED',
        message: `The domain ${domain} passed all digital footprint checks and appears to be a legitimate corporate entity.`
      });
    }

    // --- 2. OFFER LETTER / FILE SCAN LOGIC ---
    if (type === 'letter') {
      
      // Check A: File Metadata (Filename)
      if (fileName) {
        const suspiciousFiles = ['offer.pdf', 'job.pdf', 'scan.pdf', 'document.pdf', 'letter.pdf'];
        if (suspiciousFiles.includes(fileName.toLowerCase())) {
          return NextResponse.json({
            trustScore: 40,
            status: 'SUSPICIOUS',
            message: `The filename "${fileName}" is extremely generic. Professional HR teams typically name offer letters with the candidate's name and a reference ID.`
          });
        }
      }

      // Check B: Predatory Content Scan
      const redFlags = [
        'security deposit', 'laptop fee', 'telegram', 'whatsapp', 
        'payment', 'urgent', 'processing fee', 'bank transfer', 'crypto'
      ];
      
      const content = letterText?.toLowerCase() || "";
      const foundFlags = redFlags.filter(flag => content.includes(flag));

      if (foundFlags.length > 0) {
        return NextResponse.json({
          trustScore: 20,
          status: 'MALICIOUS',
          message: `Predatory patterns detected: ${foundFlags.join(', ')}. Genuine placements never require upfront payments for "equipment" or "background checks."`
        });
      }

      // If nothing is found but they provided text/file
      if (content.length > 10 || fileName) {
        return NextResponse.json({
          trustScore: 88,
          status: 'SAFE',
          message: "No predatory language or suspicious metadata detected in the offer letter content."
        });
      }

      return NextResponse.json({ error: 'No content provided for analysis' }, { status: 400 });
    }

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: 'Forensic Engine Error' }, { status: 500 });
  }
}