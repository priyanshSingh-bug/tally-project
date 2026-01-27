const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

console.log("API Key loaded:", process.env.GEMINI_API_KEY ? "✓ Present" : "✗ Missing");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const extractInvoiceData = async (invoiceText) => {
  // Using gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

  const prompt = `
    You are an expert data extraction AI. Extract the following information from the invoice text below and return it as a STRICT JSON object.
    
    Rules:
    - If a field is missing, return "-".
    - Do NOT invent or guess values.
    - Money values should be strings with currency symbols removed if possible (e.g., "1200.00").
    - The JSON structure MUST exactly match the schema below.
    
    Schema:
    {
      "invoice_number": "-",
      "invoice_date": "-",
      "seller": {
        "name": "-",
        "gstin": "-",
        "address": "-"
      },
      "buyer": {
        "name": "-",
        "gstin": "-",
        "address": "-"
      },
      "items": [
        {
          "item_name": "-",
          "description": "-",
          "hsn": "-",
          "quantity": "-",
          "rate": "-",
          "taxable_value": "-",
          "gst_rate": "-",
          "cgst": "-",
          "sgst": "-",
          "igst": "-"
        }
      ],
      "gst_summary": {
        "cgst": "-",
        "sgst": "-",
        "igst": "-"
      },
      "total_amount": "-"
    }
    
    Invoice Text:
    ${invoiceText}
    `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up markdown code blocks if present
    const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to process invoice with Gemini");
  }
};

module.exports = { extractInvoiceData };
