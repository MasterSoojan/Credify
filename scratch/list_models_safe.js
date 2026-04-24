
const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({ apiKey: apiKey });

  try {
    const response = await ai.models.list();
    fs.writeFileSync('scratch/models_list.txt', JSON.stringify(response, null, 2));
    console.log("Done");
  } catch (error) {
    fs.writeFileSync('scratch/models_list.txt', "Error: " + error.message);
  }
}

listModels();
