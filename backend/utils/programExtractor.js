import fs from 'fs/promises';
import path from 'path';
import { PDFParse } from 'pdf-parse';
import mammoth from 'mammoth';
import { createWorker } from 'tesseract.js';

const courseCodePattern = /\b[A-Z]{2,5}\s?\d{3,4}\b/g;
const creditPattern = /\b(?:credit|credits|coef|coefficient|cu|ue)\s*[:\-]?\s*(\d{1,2})\b/i;

const readPdf = async (absolutePath) => {
  const buffer = await fs.readFile(absolutePath);
  const parser = new PDFParse({ data: buffer });
  const data = await parser.getText();
  return data.text || '';
};

const readPdfWithOcr = async (absolutePath) => {
  const { fromPath } = await import('pdf2pic');
  const converter = fromPath(absolutePath, {
    density: 160,
    saveFilename: `ocr-${Date.now()}`,
    savePath: path.dirname(absolutePath),
    format: 'png',
    width: 1200,
    height: 1600,
  });

  const pages = await converter.bulk(-1, { responseType: 'image' });
  const worker = await createWorker('eng');
  const chunks = [];

  try {
    for (const page of pages.slice(0, 12)) {
      const result = await worker.recognize(page.path);
      chunks.push(result.data.text);
      await fs.unlink(page.path).catch(() => {});
    }
  } finally {
    await worker.terminate();
  }

  return chunks.join('\n');
};

const readDocx = async (absolutePath) => {
  const result = await mammoth.extractRawText({ path: absolutePath });
  return result.value || '';
};

export const extractTextFromDocument = async (absolutePath) => {
  const ext = path.extname(absolutePath).toLowerCase();
  if (ext === '.pdf') {
    const text = await readPdf(absolutePath);
    if (text.replace(/\s+/g, '').length > 80) return text;
    return readPdfWithOcr(absolutePath);
  }
  if (ext === '.docx') return readDocx(absolutePath);
  if (ext === '.doc') {
    return {
      unsupported: true,
      text: '',
      message: 'Legacy .doc extraction is not supported by the current importer. Convert this file to .docx first.',
    };
  }
  return '';
};

export const inferCoursesFromText = (text, sourceDocument) => {
  if (!text || typeof text !== 'string') return [];

  const lines = text
    .split(/\r?\n/)
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter(Boolean);

  const courses = [];
  for (const line of lines) {
    const codes = line.match(courseCodePattern);
    if (!codes) continue;

    for (const rawCode of codes) {
      const code = rawCode.replace(/\s+/g, '').toUpperCase();
      const afterCode = line.slice(line.indexOf(rawCode) + rawCode.length).trim();
      const creditMatch = line.match(creditPattern);
      const numericTail = line.match(/\b(\d{1,2})\s*$/);
      const credits = Number(creditMatch?.[1] || numericTail?.[1] || 0);
      const title = afterCode.replace(creditPattern, '').replace(/\b\d{1,2}\s*$/, '').trim();

      courses.push({
        code,
        title: title || 'Course title requires review',
        credits,
        semester: 1,
        year: 1,
        category: 'Imported - requires review',
        ministrySource: sourceDocument,
        reviewRequired: !title || !credits,
      });
    }
  }

  const byCode = new Map();
  for (const course of courses) {
    if (!byCode.has(course.code)) byCode.set(course.code, course);
  }
  return Array.from(byCode.values());
};
