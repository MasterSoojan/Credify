import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; // Import your database connection

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Extract domain from email
    const domain = email.split('@')[1].toLowerCase();

    // WARNING LOGIC: Catch free email providers immediately
    if (['gmail.com', 'yahoo.com', 'hotmail.com'].includes(domain)) {
      return NextResponse.json({
        success: true,
        emailScanned: email,
        domain,
        trustScore: 5,
        status: 'Critical Warning: Public Email',
        isVerified: false
      });
    }

    // DATABASE QUERY: Check if the domain exists in your Supabase table
    const { data: company, error } = await supabase
      .from('verified_companies')
      .select('*')
      .eq('domain', domain)
      .single(); // We only expect one match

    if (error && error.code !== 'PGRST116') {
      // PGRST116 just means no rows found, which is fine. Other errors are bad.
      console.error('Supabase error:', error);
      throw new Error('Database query failed');
    }

    // RESULT GENERATION
    if (company) {
      // It's a match in the database!
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
      // Not in database, but not a public email either
      return NextResponse.json({
        success: true,
        emailScanned: email,
        domain,
        trustScore: 35,
        status: 'Unknown Domain / Unverified',
        isVerified: false
      });
    }

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}