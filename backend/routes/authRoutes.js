import express from 'express';
import User from '../models/User.js';
import Student from '../models/Student.js';
import PasswordResetRequest from '../models/PasswordResetRequest.js';
import { requireAuth, requireRole, signToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/auth/bootstrap-admin', async (req, res) => {
  const existingSuperAdmin = await User.findOne({ role: 'super_admin' });
  if (existingSuperAdmin) return res.status(403).json({ error: 'Super admin already exists' });

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: 'super_admin',
  });

  res.status(201).json({
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token: signToken(user),
  });
});

router.post('/auth/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select('+password');
  if (!user || !(await user.comparePassword(req.body.password))) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  if (user.role === 'student') {
    return res.status(403).json({ error: 'Students must login with matricule on the Student Access tab.' });
  }

  res.json({
    user: { id: user._id, name: user.name, email: user.email, role: user.role, matricule: user.matricule },
    token: signToken(user),
  });
});

router.post('/auth/student-login', async (req, res) => {
  const matricule = String(req.body.matricule || '').trim().toUpperCase();
  const user = await User.findOne({ matricule, role: 'student' }).select('+password');
  if (!user || !(await user.comparePassword(req.body.password))) {
    return res.status(401).json({ error: 'Invalid matricule or password' });
  }

  res.json({
    user: { id: user._id, name: user.name, email: user.email, role: user.role, matricule: user.matricule },
    token: signToken(user),
  });
});

router.post('/auth/password-reset-request', async (req, res) => {
  const matricule = String(req.body.matricule || '').trim().toUpperCase();
  const student = await Student.findOne({ matricule });
  if (!student) return res.status(404).json({ error: 'No student account was found with that matricule' });

  const existing = await PasswordResetRequest.findOne({ matricule, status: 'Pending' });
  if (existing) return res.json({ message: 'A password reset request is already pending with administration.' });

  await PasswordResetRequest.create({
    matricule,
    studentName: `${student.firstName} ${student.lastName}`,
  });

  res.status(201).json({ message: 'Password reset request sent. Please contact administration for the new password.' });
});

router.patch('/auth/me/password', requireAuth, async (req, res) => {
  if (!req.body.currentPassword || !req.body.newPassword) {
    return res.status(400).json({ error: 'Current password and new password are required' });
  }
  if (String(req.body.newPassword).length < 8) {
    return res.status(400).json({ error: 'New password must be at least 8 characters' });
  }

  const user = await User.findById(req.user._id).select('+password');
  if (!user || !(await user.comparePassword(req.body.currentPassword))) {
    return res.status(401).json({ error: 'Current password is incorrect' });
  }

  user.password = req.body.newPassword;
  await user.save();
  if (user.role === 'student' && user.matricule) {
    await Student.findOneAndUpdate({ matricule: user.matricule }, { portalPasswordChangedAt: new Date() });
  }
  res.json({ message: 'Password updated successfully' });
});

router.get('/auth/password-reset-requests', requireAuth, requireRole('super_admin', 'academic_admin'), async (req, res) => {
  const requests = await PasswordResetRequest.find().sort({ createdAt: -1 }).limit(100);
  res.json(requests);
});

router.patch('/auth/password-reset-requests/:id/resolve', requireAuth, requireRole('super_admin', 'academic_admin'), async (req, res) => {
  const request = await PasswordResetRequest.findById(req.params.id);
  if (!request) return res.status(404).json({ error: 'Password reset request not found' });

  const user = await User.findOne({ matricule: request.matricule, role: 'student' });
  if (!user) return res.status(404).json({ error: 'Student login account not found' });

  const temporaryPassword = `DU-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  user.password = temporaryPassword;
  await user.save();
  await Student.findOneAndUpdate(
    { matricule: request.matricule },
    {
      $set: { portalLoginPassword: temporaryPassword, portalPasswordIssuedAt: new Date() },
      $unset: { portalPasswordChangedAt: '' },
    }
  );

  request.status = 'Resolved';
  request.resolvedBy = req.user._id;
  request.resolvedAt = new Date();
  await request.save();

  res.json({ matricule: request.matricule, temporaryPassword, message: 'Give this temporary password to the student.' });
});

router.get('/auth/me', requireAuth, (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      matricule: req.user.matricule,
    },
  });
});

router.post('/users', requireAuth, requireRole('super_admin'), async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role });
});

export default router;
