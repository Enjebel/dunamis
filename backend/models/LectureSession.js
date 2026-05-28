import mongoose from 'mongoose';

const LectureSessionSchema = new mongoose.Schema(
  {
    allocationId: { type: mongoose.Schema.Types.ObjectId, ref: 'LectureAllocation' },
    lecturerName: { type: String, required: true },
    courseCode: { type: String, required: true },
    courseTitle: { type: String, required: true },
    programCode: { type: String, required: true },
    level: { type: Number, min: 1, max: 3, required: true },
    semester: { type: Number, min: 1, max: 6, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    hours: { type: Number, required: true, min: 0 },
    topic: { type: String },
    validated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('LectureSession', LectureSessionSchema);
