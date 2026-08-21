import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function POST(request: Request) {
    try {
        const { email, password, backupEmail } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
        }

        // 1. Sign up with Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (authError) {
            console.error("Supabase Auth Signup error:", authError);
            return NextResponse.json({ message: authError.message }, { status: 400 });
        }

        // 2. Generate a random User ID (e.g., credify_a1b2c3)
        const userId = 'credify_' + Math.random().toString(36).substring(2, 8);

        // 3. Store additional profile info in users_custom
        const { error: insertError } = await supabase
            .from('users_custom')
            .insert([{ 
                id: authData.user?.id,
                email, 
                user_id: userId, 
                backup_email: backupEmail || null
            }]);

        if (insertError) {
            console.error("Signup insert error:", insertError);
            // Non-blocking error, user is already created in Auth
        }

        return NextResponse.json({
            message: 'User created successfully',
            user: { id: authData.user?.id, email, userId }
        }, { status: 201 });

    } catch (error: any) {
        console.error("Signup error:", error);
        return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
