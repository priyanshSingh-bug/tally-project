require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
    const apiKey = process.env.GEMINI_API_KEY;

    console.log("--- Gemini API Test Debugger ---");
    if (!apiKey) {
        console.error("ERROR:API_KEY is missing from process.env");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    // Try reliable model first
    const modelName = "gemini-1.5-flash";
    console.log(`\nTesting model: ${modelName}...`);

    try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello, simple test.");
        const response = await result.response;
        console.log("SUCCESS! API and Model are working.");
        console.log("Response:", response.text());
    } catch (error) {
        console.error("API Call Failed!");
        console.error("Error Message:", error.message);
    }
}

testGemini();
