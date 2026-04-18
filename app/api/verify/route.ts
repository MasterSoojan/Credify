import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase'; 

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const domain = email.split('@')[1]?.toLowerCase();

    if (!domain) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    if (['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'].includes(domain)) {
      return NextResponse.json({
        success: true,
        emailScanned: email,
        domain,
        trustScore: 5,
        status: 'Critical Warning: Public Email',
        isVerified: false
      });
    }

    const { data: company, error } = await supabase
      .from('verified_companies')
      .select('*')
      .eq('domain', domain)
      .single(); 

    // 🚨 WE CHANGED THIS: Now it sends the exact Supabase error to your popup!
    if (error && error.code !== 'PGRST116') {
      return NextResponse.json({ 
        error: `Supabase Database Error: ${error.message} (Code: ${error.code})` 
      }, { status: 500 });
    }

    if (company) {
      return NextResponse.json({
        success: true,
        emailScanned: email,
        companyName: company.company_name,
        domain: company.domain,
        trustScore: company.trust_score,
        status: 'Verified Secure',
        isVerified: true,
        verifiedAt: company.verified_at
      });
    } else {
      return NextResponse.json({
        success: true,
        emailScanned: email,
        domain,
        trustScore: 35,
        status: 'Unknown Domain / Unverified',
        isVerified: false
      });
    }

  } catch (error: any) {
    // 🚨 WE CHANGED THIS: Catches network timeouts or bad keys
    return NextResponse.json({ 
      error: `Connection Crash: ${error.message}` 
    }, { status: 500 });
  }
}