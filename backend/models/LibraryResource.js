import mongoose from 'mongoose';

const LibraryResourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String },
    category: { type: String, default: 'General' },
    programCode: { type: String },
    fileUrl: { type: String, required: true },
    coverImage: { type: String },
    accessMode: { type: String, enum: ['Online', 'Borrowable', 'Online and Borrowable'], default: 'Online' },
    availableCopies: { type: Number, default: 0 },
    uploadedBy: { type: String, default: 'Library Admin' },
  },
  { timestamps: true }
);

export default mongoose.model('LibraryResource', LibraryResourceSchema);
