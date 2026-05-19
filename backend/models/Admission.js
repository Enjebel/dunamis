import mongoose from 'mongoose';

const AdmissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  program: { type: String, required: true },
  message: { type: String },
  status: { type: String, default: 'Pending' },
  appliedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Admission', AdmissionSchema);