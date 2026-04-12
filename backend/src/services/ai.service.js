import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateContent(prompt) {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

  // These specific 'latest' IDs are the ones Google supports for your account type
  const modelsToTry = ["gemini-flash-latest", "gemini-pro-latest", "gemini-1.5-flash"];

  let lastError = null;

  for (const modelName of modelsToTry) {
    try {
      console.log(`--- TRYING MODEL: ${modelName} ---`);
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: `
            You are a Senior Software Engineer. Review the code for bugs, 
            security, and performance. Provide Markdown feedback with code snippets.
        `
      });

      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (err) {
      console.warn(`Model ${modelName} failed:`, err.message);
      lastError = err;
      continue; // Try the next model
    }
  }

  throw lastError; // If all fail, throw the last error
}
