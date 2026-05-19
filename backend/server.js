import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Admission from './models/Admission.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected: Cluster0 Active'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Admission Application Route
app.post('/api/apply', async (req, res) => {
  try {
    const application = new Admission(req.body);
    await application.save();
    res.status(201).json({ message: 'Application received successfully!' });
  } catch (error) {
    res.status(400).json({ error: 'Submission failed. Please check your data.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});