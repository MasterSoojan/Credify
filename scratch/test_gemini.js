
const { GoogleGenAI } = require('@google/genai');

async function listModels() {
  const apiKey = "AIzaSyBHqPaz9TaOwIykqYHuSyXf5O5FckBgsKk";
  const ai = new GoogleGenAI({ apiKey: apiKey });

  try {
    console.log("Listing models...");
    // The new SDK might have a different way to list models or we can try common names
    // Actually, let's try 'gemini-1.5-flash-latest' or 'gemini-1.5-flash-8b'
    
    const models = ['gemini-1.5-flash', 'gemini-1.5-flash-latest', 'gemini-1.5-flash-002', 'gemini-2.0-flash-exp'];
    
    for (const model of models) {
      try {
        console.log(`Testing ${model}...`);
        const response = await ai.models.generateContent({
          model: model,
          contents: "Hi",
        });
        console.log(`Success with ${model}:`, response.text);
        break;
      } catch (e) {
        console.log(`Failed ${model}:`, e.message.substring(0, 100));
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

listModels();
