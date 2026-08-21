import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { GoogleGenAI } from '@google/genai';

// ---------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------

/**
 * Extracts a domain from text/email.
 */
function extractDomain(text: string): string {
  const domainMatch = text.match(/@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i);
  if (!domainMatch) return '';
  let domain = domainMatch[1].toLowerCase();
  // Clean up common merge artifacts
  return domain.replace(/(com|org|net|gov|edu|in|co|io|me|biz|info).*/, '$1');
}

/**
 * Calls Gemini API with a retry mechanism.
 */
async function analyzeWithGemini(promptText: string, fileData?: string, mimeType?: string, retries = 2): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });
  const contents: any[] = [{ role: 'user', parts: [{ text: promptText }] }];

  if (fileData && mimeType) {
    contents[0].parts.push({
      inlineData: { mimeType, data: fileData }
    });
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: contents
      });
      return response.text || '';
    } catch (err: any) {
      console.error(`❌ AI Attempt ${attempt} failed:`, err.message);
      if (attempt === retries) return '';
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  return '';
}

/**
 * Parses the trust score from Gemini's response.
 */
function parseAiTrustScore(aiAnalysis: string): number {
  if (!aiAnalysis) return 0;
  
  const ratingMatch = aiAnalysis.match(/(?:rating|score)[\s*:-]*(\d{1,3})/i) || aiAnalysis.match(/(\d{1,3})\s*\/\s*100/i);
  if (ratingMatch && ratingMatch[1]) {
    return parseInt(ratingMatch[1], 10) - 35;
  }
  
  const lowerText = aiAnalysis.toLowerCase();
  if (lowerText.includes('scam') && !lowerText.includes('not a scam')) return -40;
  if (lowerText.includes('legitimate') || lowerText.includes('professional')) return 20;
  
  return 0;
}

// ---------------------------------------------------------
// Main API Route
// ---------------------------------------------------------

export async function POST(request: Request) {
  try {
    const { email: rawEmail, type, letterText, fileName, fileData, mimeType } = await request.json();
    console.log(`🔍 Verification Request: type=${type}, email=${rawEmail}, file=${fileName}, textLength=${letterText?.length || 0}`);

    const email = rawEmail?.trim() || '';
    let domain = '';
    let aiAnalysis = '';
    let trustScoreModifier = 0;

    // 1. Process Based on Type
    if (type === 'letter') {
      console.log("📄 Processing Letter/PDF Scan...");
      domain = extractDomain(`${letterText || ''} ${fileName || ''} ${email}`);
      if (domain) console.log(`🎯 Identified Domain: ${domain}`);

      if ((letterText && letterText.length >= 5) || fileData) {
        const promptText = `
          Analyze this job offer document for scams or red flags. 
          Identify the company name and recruiter details if possible.
          Keep your response concise. Include a "TL;DR" section at the end.
          Return a safety rating (0-100) prominently in the text.
          
          Text Content: ${letterText || 'None provided'}
        `;
        
        aiAnalysis = await analyzeWithGemini(promptText, fileData, mimeType);
        if (aiAnalysis) {
          console.log("🤖 AI Analysis Complete");
          trustScoreModifier = parseAiTrustScore(aiAnalysis);
        }
      } else if (!domain) {
        return NextResponse.json({ error: 'Please provide some text or a file to scan.' }, { status: 400 });
      }

    } else {
      console.log("📧 Processing Email Scan...");
      if (!email) {
        return NextResponse.json({ error: 'Email address is required for this scan type.' }, { status: 400 });
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ error: 'Invalid email format provided.' }, { status: 400 });
      }
      domain = email.split('@')[1]?.toLowerCase() || '';
    }

    // 2. Verified Domain Check (Supabase)
    let company = null;
    if (domain) {
      const { data, error } = await supabase
        .from('verified_companies')
        .select('*')
        .eq('domain', domain)
        .single();
        
      if (error && error.code !== 'PGRST116') {
        console.error("❌ Supabase Error:", error.message);
      } else {
        company = data;
      }
    }

    // 3. Score Calculation
    let finalScore = 35;
    let finalStatus = 'Unverified';

    if (type === 'letter') {
      finalScore = Math.min(100, Math.max(0, 35 + trustScoreModifier));
      finalStatus = finalScore >= 70 ? 'Likely Safe' : finalScore >= 40 ? 'Moderate Risk' : 'High Risk';
    } else {
      // Email scan logic
      if (company) {
        finalScore = Math.min(100, Math.max(0, company.trust_score));
        finalStatus = 'Verified Employer';
      } else if (['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'].includes(domain)) {
        finalScore = 5;
        finalStatus = 'Public Email Warning';
      } else {
        finalScore = 35;
        finalStatus = 'Unverified Domain';
      }
    }

    return NextResponse.json({
      success: true,
      emailScanned: email,
      domain: domain || 'Unknown',
      trustScore: finalScore,
      status: finalStatus,
      isVerified: !!company,
      aiSummary: aiAnalysis
    });

  } catch (error: any) {
    console.error("🚨 VERIFICATION CRASH:", error.message);
    return NextResponse.json({ error: `Server Error: ${error.message}` }, { status: 500 });
  }
}
