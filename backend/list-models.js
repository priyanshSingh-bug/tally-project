require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("No API Key found.");
        return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    try {
        console.log("Fetching available models...");
        // Use a basic model to get the client, then list models (if supported directly or via other ID)
        // actually the SDK exposes it on the class or via a 'getGenerativeModel' which we can't use without a name.
        // Wait, the SDK doesn't have a direct 'listModels' method exposed easily in the main entry?
        // Let's try the direct HTTP approach if SDK is obscure, OR just try 'gemini-pro' as a fallback.

        // Actually, let's try a few known candidates in a loop.
        const candidates = [
            "gemini-1.5-flash",
            "gemini-1.5-flash-latest",
            "gemini-1.5-pro",
            "gemini-pro",
            "gemini-1.0-pro"
        ];

        for (const modelName of candidates) {
            process.stdout.write(`Testing ${modelName}... `);
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Test.");
                await result.response;
                console.log("✅ WORKS");
            } catch (e) {
                console.log(`❌ FAILED (${e.message.split('[')[0].trim()})`);
            }
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

listModels();
