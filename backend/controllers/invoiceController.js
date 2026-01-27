const fs = require('fs');
const { extractText } = require('../services/ocrService');
const { extractInvoiceData } = require('../services/geminiService');
const { generateTallyXML } = require('../services/xmlGenService');

let lastExtractedData = null; // In-memory store for MVP download

const uploadInvoice = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        console.log('Processing file:', req.file.path);

        // 1. Extract Text
        const text = await extractText(req.file);

        // 2. Extract Data with Gemini
        const data = await extractInvoiceData(text);

        // Save for download endpoints
        lastExtractedData = data;

        // Cleanup uploaded file
        fs.unlinkSync(req.file.path);

        res.json(data);
    } catch (error) {
        console.error('Error processing invoice:', error);
        res.status(500).json({ error: 'Failed to process invoice', details: error.message });
    }
};

const downloadJSON = (req, res) => {
    if (!lastExtractedData) {
        return res.status(404).json({ error: 'No data available to download' });
    }

    res.setHeader('Content-Disposition', 'attachment; filename=invoice_data.json');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(lastExtractedData, null, 2));
};

const downloadXML = (req, res) => {
    if (!lastExtractedData) {
        return res.status(404).json({ error: 'No data available to download' });
    }

    try {
        const xml = generateTallyXML(lastExtractedData);
        res.setHeader('Content-Disposition', 'attachment; filename=tally_import.xml');
        res.setHeader('Content-Type', 'application/xml');
        res.send(xml);
    } catch (error) {
        console.error('Error generating XML:', error);
        res.status(500).json({ error: 'Failed to generate XML' });
    }
};

module.exports = { uploadInvoice, downloadJSON, downloadXML };
