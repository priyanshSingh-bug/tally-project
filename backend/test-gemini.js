require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
    const apiKey = process.env.GEMINI_API_KEY;

    console.log("--- Gemini API Test Debugger ---");
    if (!apiKey) {
        console.error("❌ ERROR: GEMINI_API_KEY is missing from process.env");
        return;
    }

    console.log(`✅ API Key found (Length: ${apiKey.length})`);
    console.log(`🔑 Key starts with: ${apiKey.substring(0, 4)}...`);
    console.log(`🔑 Key ends with: ...${apiKey.substring(apiKey.length - 4)}`);

    // Check for common issues
    if (apiKey.startsWith('"') || apiKey.startsWith("'")) {
        console.warn("⚠️ WARNING: API Key seems to be wrapped in quotes. In .env files, values should typically NOT be quoted unless necessary.");
    }
    if (apiKey.includes("YOUR_GEMINI_API_KEY")) {
        console.error("❌ ERROR: You are using the placeholder API key. Please generate a real key from Google AI Studio.");
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
        console.log("✅ SUCCESS! API and Model are working.");
        console.log("Response:", response.text());
    } catch (error) {
        console.error("❌ API Call Failed!");
        console.error("Error Message:", error.message);
        // console.error("Full Error:", JSON.stringify(error, null, 2));
    }
}

testGemini();
