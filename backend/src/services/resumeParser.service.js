const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const path = require('path');

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
 * Extract text from PDF buffer
 */
const extractFromPDF = async (buffer) => {
  try {
    const data = await pdf(buffer);
    return cleanText(data.text);
  } catch (error) {
    console.error('PDF Parse Error:', error);
    throw new Error('Failed to parse PDF file');
  }
};

/**
 * Extract text from DOCX buffer
 */
const extractFromDOCX = async (buffer) => {
  try {
    const result = await mammoth.extractRawText({ buffer: buffer });
    return cleanText(result.value);
  } catch (error) {
    console.error('DOCX Parse Error:', error);
    throw new Error('Failed to parse DOCX file');
  }
};

/**
 * Main parse service
 * @param {Buffer} buffer - The file buffer
 * @param {string} mimeType - The file mime type
 * @param {string} originalName - The original file name for extension fallback
 */
exports.parseResume = async (buffer, mimeType, originalName = '') => {
  let text = '';
  const extension = originalName ? path.extname(originalName).toLowerCase() : '';

  try {
    if (mimeType === 'application/pdf' || extension === '.pdf') {
      text = await extractFromPDF(buffer);
    } else if (
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      extension === '.docx'
    ) {
      text = await extractFromDOCX(buffer);
    } else {
      throw new Error('Unsupported file type for parsing. Only PDF and DOCX are supported.');
    }

    const wordCount = getWordCount(text);
    return { text, wordCount };
  } catch (error) {
    throw error;
  }
};
