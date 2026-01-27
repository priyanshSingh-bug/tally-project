const fs = require('fs');
const pdf = require('pdf-parse');
const tesseract = require('tesseract.js');

const parsePdf = async (filePath) => {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
};

const parseImage = async (filePath) => {
    const { data: { text } } = await tesseract.recognize(filePath, 'eng');
    return text;
};

const extractText = async (file) => {
    const filePath = file.path;
    const fileType = file.mimetype;

    try {
        if (fileType === 'application/pdf') {
            return await parsePdf(filePath);
        } else if (fileType.startsWith('image/')) {
            return await parseImage(filePath);
        } else {
            throw new Error('Unsupported file type');
        }
    } catch (error) {
        throw error;
    }
};

module.exports = { extractText };
