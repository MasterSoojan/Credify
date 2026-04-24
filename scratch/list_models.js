
const { GoogleGenAI } = require('@google/genai');

async function listModels() {
  const apiKey = "AIzaSyBHqPaz9TaOwIykqYHuSyXf5O5FckBgsKk";
  const ai = new GoogleGenAI({ apiKey: apiKey });

  try {
    console.log("Listing available models...");
    const response = await ai.models.list();
    console.log("Response status:", response ? "Got response" : "No response");
    if (response && response.models) {
      response.models.forEach(m => {
        console.log(`- ${m.name} (${m.displayName})`);
      });
    } else {
      console.log("No models found in response.");
    }
  } catch (error) {
    console.error("Error listing models:", error.message);
    if (error.response) {
      console.error("Response data:", JSON.stringify(error.response.data));
    }
  }
}

listModels();
