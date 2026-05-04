// Set global verbosity and PDFJS object before requiring to prevent initialization errors
process.env.PDFJS_VERBOSITY = '0';
if (typeof global !== 'undefined' && !global.PDFJS) {
  global.PDFJS = { verbosity: 0 };
}

const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const path = require('path');

/**
 * Clean extracted text: remove extra spaces, normalize line breaks, remove repeated symbols
 */
const cleanText = (text) => {
  if (!text) return '';
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
  if (!text) return 0;
  return text.split(/\s+/).filter((word) => word.length > 0).length;
};

/**
 * Extract text from PDF buffer
 * Note: This project uses pdf-parse v2.4.5 (Mehmet Kozan fork)
 * which requires using the PDFParse class.
 */
const extractFromPDF = async (buffer) => {
  if (!buffer || buffer.length === 0) {
    throw new Error('PDF buffer is empty or undefined');
  }

  try {
    // 1. Try the PDFParse class (correct for v2.4.5+)
    if (pdf.PDFParse && typeof pdf.PDFParse === 'function') {
      try {
        // v2.4.5 constructor takes LoadParameters and calls load() internally
        const parser = new pdf.PDFParse({ 
          data: buffer, 
          verbosity: 0 
        });
        
        const result = await parser.getText();
        if (result && result.text) return cleanText(result.text);
        if (typeof result === 'string') return cleanText(result);
      } catch (classError) {
        console.warn('PDFParse class usage failed, trying standard call:', classError.message);
      }
    }

    // 2. Fallback to standard function call (for older versions or different forks)
    const parseFunc = typeof pdf === 'function' ? pdf : pdf.default;
    
    if (typeof parseFunc === 'function') {
      const data = await parseFunc(buffer);
      const extractedText = typeof data === 'string' ? data : (data?.text || '');
      if (extractedText) return cleanText(extractedText);
    }
    
    throw new Error('Could not extract text from PDF using any available method');
  } catch (error) {
    console.error('PDF Extraction Error:', error.message);
    if (error.message && error.message.includes('verbosity')) {
      throw new Error('PDF library initialization failed (verbosity error). This is a known issue with the current library version.');
    }
    throw new Error(`Failed to parse PDF file: ${error.message}`);
  }
};

/**
 * Extract text from DOCX buffer
 */
const extractFromDOCX = async (buffer) => {
  if (!buffer || buffer.length === 0) {
    throw new Error('DOCX buffer is empty or undefined');
  }
  try {
    const result = await mammoth.extractRawText({ buffer: buffer });
    if (!result || !result.value) {
      throw new Error('No text content extracted from DOCX');
    }
    return cleanText(result.value);
  } catch (error) {
    console.error('DOCX Parse Error Details:', error);
    throw new Error(`Failed to parse DOCX file: ${error.message}`);
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
