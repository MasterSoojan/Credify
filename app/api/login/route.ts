import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ message: 'Email/UserID and password are required' }, { status: 400 });
        }

        let loginEmail = email;

        // If the user entered a User ID (no '@'), fetch their email first
        if (!email.includes('@')) {
            const { data: customUser, error: customError } = await supabase
                .from('users_custom')
                .select('email')
                .eq('user_id', email)
                .single();

            if (customError || !customUser) {
                return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
            }
            loginEmail = customUser.email;
        }

        // 1. Authenticate with Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: loginEmail,
            password: password,
        });

        if (authError) {
            console.error("Supabase Auth Login error:", authError);
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        // 2. Fetch the user_id for the response
        const { data: customUser } = await supabase
            .from('users_custom')
            .select('user_id')
            .eq('email', loginEmail)
            .single();

        return NextResponse.json({
            message: 'Login successful',
            user: { id: authData.user?.id, email: authData.user?.email, userId: customUser?.user_id }
        }, { status: 200 });

    } catch (error: any) {
        console.error("Login error:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}