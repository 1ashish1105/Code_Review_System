import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
  try {
    const modelList = await genAI.getGenerativeModel({ model: "gemini-pro" }); 
    // We use a dummy call to see what the server suggests
    console.log("Checking available models...");
    
    // The SDK doesn't have a direct 'listModels' in some versions, 
    // so we'll try to reach the endpoint directly or use a known list.
    console.log("Please run the following command in your terminal to see your allowed models:");
    console.log(`curl "https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GOOGLE_GEMINI_KEY}"`);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

listModels();
