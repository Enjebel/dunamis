import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const signToken = (user) => {
  const secret = process.env.JWT_SECRET || 'change-this-secret';
  return jwt.sign({ id: user._id, role: user.role, email: user.email }, secret, { expiresIn: '8h' });
};

export const requireAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : req.query.token;
    if (!token) return res.status(401).json({ error: 'Authentication required' });

    const secret = process.env.JWT_SECRET || 'change-this-secret';
    const payload = jwt.verify(token, secret);
    const user = await User.findById(payload.id);
    if (!user || !user.active) return res.status(401).json({ error: 'Invalid user' });

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const requireRole = (...roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'Authentication required' });
  if (!roles.includes(req.user.role)) return res.status(403).json({ error: 'Not allowed for this role' });
  return next();
};
