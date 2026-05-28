import mongoose from 'mongoose';

const PasswordResetRequestSchema = new mongoose.Schema(
  {
    matricule: { type: String, required: true, trim: true, uppercase: true },
    studentName: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Resolved'], default: 'Pending' },
    resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    resolvedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model('PasswordResetRequest', PasswordResetRequestSchema);
