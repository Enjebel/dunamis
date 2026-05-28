import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import Program from '../models/Program.js';
import { programSources } from '../data/programSources.js';
import { getMongoUri } from '../utils/config.js';
import { extractTextFromDocument, inferCoursesFromText } from '../utils/programExtractor.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..', '..');

const facultyFromTitle = (title) => {
  const lower = title.toLowerCase();
  if (lower.includes('health')) return 'Faculty of Health Sciences';
  if (lower.includes('business') || lower.includes('finance') || lower.includes('management')) return 'Faculty of Commerce, Finance & Management';
  if (lower.includes('engineering') || lower.includes('ict') || lower.includes('technology')) return 'Faculty of Engineering & Technology';
  return 'Ministry Program Catalogue';
};

const importSource = async (source, index) => {
  const absolutePath = path.resolve(projectRoot, source.path);
  const extracted = await extractTextFromDocument(absolutePath);
  if (extracted?.unsupported) {
    return { source: source.path, skipped: true, reason: extracted.message };
  }

  const text = typeof extracted === 'string' ? extracted : extracted.text;
  const courses = inferCoursesFromText(text, source.path).map((course) => ({
    ...course,
    credits: course.credits || 1,
  }));

  const code = `${source.cycle}-${String(index + 1).padStart(2, '0')}`;
  const program = await Program.findOneAndUpdate(
    { code },
    {
      name: source.title,
      code,
      cycle: source.cycle,
      faculty: facultyFromTitle(source.title),
      language: source.cycle === 'HND' ? 'en' : 'fr',
      durationYears: 3,
      courses,
      sourceDocuments: [source.path],
      active: true,
    },
    { upsert: true, new: true, runValidators: true }
  );

  return { source: source.path, code: program.code, courses: courses.length };
};

const run = async () => {
  const uri = getMongoUri();
  if (!uri) throw new Error('Missing MONGO_URI');
  await mongoose.connect(uri);

  const results = [];
  for (const [index, source] of programSources.entries()) {
    results.push(await importSource(source, index));
  }

  console.table(results);
  await mongoose.disconnect();
};

run().catch(async (error) => {
  console.error(error.message);
  await mongoose.disconnect();
  process.exit(1);
});
