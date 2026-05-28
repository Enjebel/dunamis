import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    credits: { type: Number, required: true, min: 0 },
    semester: { type: Number, required: true, min: 1, max: 6 },
    year: { type: Number, required: true, min: 1, max: 3 },
    category: { type: String, default: 'Core' },
    ministrySource: { type: String },
  },
  { _id: false }
);

const ProgramSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, trim: true },
    cycle: { type: String, required: true, enum: ['BTS', 'HND', 'Bachelor', 'Master', 'Certification'] },
    faculty: { type: String, required: true },
    language: { type: String, enum: ['en', 'fr', 'bilingual'], default: 'bilingual' },
    durationYears: { type: Number, default: 3 },
    courses: [CourseSchema],
    sourceDocuments: [{ type: String }],
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Program', ProgramSchema);
