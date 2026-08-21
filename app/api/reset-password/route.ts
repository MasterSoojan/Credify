import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ message: 'Email is required' }, { status: 400 });
        }

        // Send reset password email using Supabase Auth
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/reset-password/update`,
        });

        if (error) {
            console.error("Reset password error:", error);
            return NextResponse.json({ message: error.message }, { status: 400 });
        }

        return NextResponse.json({
            message: 'Password reset email sent successfully',
        }, { status: 200 });

    } catch (error: any) {
        console.error("Reset password error:", error);
        return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
