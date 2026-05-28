import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { getMongoUri } from '../utils/config.js';

dotenv.config();

const generatePassword = () => {
  return `ADMIN-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
};

const run = async () => {
  const uri = getMongoUri();
  if (!uri) throw new Error('Missing MONGO_URI');
  await mongoose.connect(uri);

  const email = process.env.ADMIN_EMAIL || 'admin@dunamis.local';
  const existing = await User.findOne({ email });
  if (existing) {
    console.log(`Admin already exists: ${email}`);
    await mongoose.disconnect();
    return;
  }

  const password = process.env.ADMIN_PASSWORD || generatePassword();
  await User.create({
    name: process.env.ADMIN_NAME || 'Dunamis Super Admin',
    email,
    password,
    role: 'super_admin',
  });

  console.log('Admin account created');
  console.log(`Email: ${email}`);
  console.log(`Temporary password: ${password}`);
  await mongoose.disconnect();
};

run().catch(async (error) => {
  console.error(error.message);
  await mongoose.disconnect();
  process.exit(1);
});
