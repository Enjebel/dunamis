import mongoose from 'mongoose';

const BorrowRequestSchema = new mongoose.Schema(
  {
    resourceId: { type: mongoose.Schema.Types.ObjectId, ref: 'LibraryResource', required: true },
    matricule: { type: String, required: true },
    studentName: { type: String, required: true },
    dueDate: { type: Date },
    status: { type: String, enum: ['Requested', 'Approved', 'Returned', 'Rejected'], default: 'Requested' },
  },
  { timestamps: true }
);

export default mongoose.model('BorrowRequest', BorrowRequestSchema);
