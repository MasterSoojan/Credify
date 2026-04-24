import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: Request) {
  try {
    // 1. Tell TypeScript that we guarantee this is a string
    const apiKey = process.env.GEMINI_API_KEY as string;
    
    if (!apiKey) {
      console.error("Missing API Key");
      return NextResponse.json({ reply: "System Error: Missing API Key." }, { status: 500 });
    }

    // 2. Initialize AI
    const ai = new GoogleGenAI({ apiKey: apiKey });
    
    // 3. Extract message safely
    const body = await req.json();
    const message = body.message || "Hello";

    const prompt = `
      You are the official AI assistant for 'Credify', a forensic placement verification engine.
      Your goal is to help students identify job scams and provide career safety tips.
      Keep your answers brief, professional, and empathetic. Do not use markdown.
      
      User message: "${message}"
    `;

    // 4. Call Gemini API
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    // 5. Handle the response safely for TypeScript
    const replyText = response.text ? String(response.text) : "No response generated.";

    return NextResponse.json({ reply: replyText });

  } catch (error) {
    // TypeScript safe error handling (no "any")
    console.error("==== CHATBOT CRASH REPORT ====");
    console.error(error);
    
    return NextResponse.json(
      { reply: "I'm currently experiencing high traffic. Please try again in a moment." }, 
      { status: 500 }
    );
  }
}
