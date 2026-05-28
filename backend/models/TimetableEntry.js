import mongoose from 'mongoose';

const TimetableEntrySchema = new mongoose.Schema(
  {
    programCode: { type: String, required: true, trim: true },
    level: { type: Number, min: 1, max: 3, required: true },
    semester: { type: Number, min: 1, max: 6, default: 1 },
    dayOfWeek: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    courseCode: { type: String, required: true },
    courseTitle: { type: String, required: true },
    lecturerName: { type: String },
    room: { type: String },
    academicYear: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('TimetableEntry', TimetableEntrySchema);
