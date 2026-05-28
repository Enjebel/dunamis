import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Admission from './models/Admission.js';
import portalRoutes from './routes/portalRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { getMongoUri } from './utils/config.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;
const MONGO_URI = getMongoUri();

if (!MONGO_URI) {
  console.warn('MONGO_URI is not set. API routes that need MongoDB will fail until backend/.env is configured.');
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected: Cluster0 Active'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

app.get('/', (req, res) => {
  res.json({
    service: 'Dunamis University API',
    status: 'running',
    health: '/api/health',
    frontend: 'Run the frontend with npm run dev inside /frontend',
  });
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'Dunamis University API' });
});

app.post('/api/apply', async (req, res) => {
  try {
    const application = new Admission(req.body);
    await application.save();
    res.status(201).json({ message: 'Application received successfully!' });
  } catch (error) {
    res.status(400).json({ error: 'Submission failed. Please check your data.' });
  }
});

app.use('/api', authRoutes);
app.use('/api', portalRoutes);

app.use('/api', (req, res) => {
  res.status(404).json({ error: `API route not found: ${req.method} ${req.originalUrl}` });
});

app.use((error, req, res, next) => {
  console.error(error);
  if (res.headersSent) return next(error);
  return res.status(error.status || 500).json({ error: error.message || 'Server error' });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Stop the existing process or set another PORT in backend/.env.`);
    process.exit(1);
  }

  console.error('Server startup error:', error);
  process.exit(1);
});
