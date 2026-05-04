const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');
const mammoth = require('mammoth');

/**
 * Clean extracted text: remove extra spaces, normalize line breaks, remove repeated symbols
 */
const cleanText = (text) => {
  return text
    .replace(/\r\n/g, '\n') // Normalize line breaks
    .replace(/[ \t]+/g, ' ') // Remove extra spaces/tabs
    .replace(/\n\s*\n/g, '\n\n') // Remove excessive empty lines
    .replace(/[•●■▪◦]/g, '-') // Normalize bullets
    .trim();
};

/**
 * Calculate word count
 */
const getWordCount = (text) => {
  return text.split(/\s+/).filter((word) => word.length > 0).length;
};

/**
 * Extract text from PDF
 */
const extractFromPDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const parser = new PDFParse({ data: dataBuffer });
  try {
    const data = await parser.getText();
    return cleanText(data.text);
  } finally {
    await parser.destroy();
  }
};

/**
 * Extract text from DOCX
 */
const extractFromDOCX = async (filePath) => {
  const result = await mammoth.extractRawText({ path: filePath });
  return cleanText(result.value);
};

/**
 * Main parse service
 */
exports.parseResume = async (filePath, mimeType) => {
  let text = '';
  const extension = path.extname(filePath).toLowerCase();

  try {
    if (mimeType === 'application/pdf' || extension === '.pdf') {
      text = await extractFromPDF(filePath);
    } else if (
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      extension === '.docx'
    ) {
      text = await extractFromDOCX(filePath);
    } else {
      throw new Error('Unsupported file type for parsing');
    }

    const wordCount = getWordCount(text);

    // Delete temporary file after parsing
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return { text, wordCount };
  } catch (error) {
    // Ensure file is deleted even if parsing fails
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw error;
  }
};
