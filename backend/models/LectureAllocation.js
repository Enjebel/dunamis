import mongoose from 'mongoose';

const LectureAllocationSchema = new mongoose.Schema(
  {
    lecturerName: { type: String, required: true },
    lecturerPhone: { type: String },
    courseCode: { type: String, required: true },
    courseTitle: { type: String, required: true },
    programCode: { type: String, required: true },
    level: { type: Number, min: 1, max: 3, required: true },
    semester: { type: Number, min: 1, max: 6, required: true },
    academicYear: { type: String, required: true },
    allocatedHours: { type: Number, required: true, min: 0 },
    hourlyRate: { type: Number, default: 0, min: 0 },
    validated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('LectureAllocation', LectureAllocationSchema);
