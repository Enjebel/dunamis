import mongoose from 'mongoose';

const ResultSchema = new mongoose.Schema(
  {
    courseCode: { type: String, required: true },
    courseTitle: { type: String, required: true },
    credits: { type: Number, required: true },
    semester: { type: Number, required: true },
    year: { type: Number, required: true },
    caMark: { type: Number, default: 0 },
    examMark: { type: Number, default: 0 },
    finalMark: { type: Number, required: true },
    grade: { type: String },
    status: { type: String, enum: ['Passed', 'Failed', 'Resit', 'Pending'], default: 'Pending' },
  },
  { _id: false }
);

const StudentSchema = new mongoose.Schema(
  {
    matricule: { type: String, required: true, unique: true, trim: true, uppercase: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    sex: { type: String, enum: ['Male', 'Female', 'Other', ''], default: '' },
    dateOfBirth: { type: Date },
    placeOfBirth: { type: String },
    nationality: { type: String },
    address: { type: String },
    emergencyContactName: { type: String },
    emergencyContactPhone: { type: String },
    profilePhotoUrl: { type: String },
    programCode: { type: String, required: true },
    level: { type: Number, min: 1, max: 3, default: 1 },
    academicYear: { type: String, required: true },
    portalLoginPassword: { type: String },
    portalPasswordIssuedAt: { type: Date },
    portalPasswordChangedAt: { type: Date },
    results: [ResultSchema],
    status: { type: String, enum: ['Active', 'Suspended', 'Graduated'], default: 'Active' },
  },
  { timestamps: true }
);

StudentSchema.virtual('failedCourses').get(function failedCourses() {
  return this.results.filter((result) => result.status === 'Failed' || result.status === 'Resit');
});

StudentSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Student', StudentSchema);
