import express from 'express';
import fs from 'fs/promises';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import Program from '../models/Program.js';
import Student from '../models/Student.js';
import LectureSession from '../models/LectureSession.js';
import LectureAllocation from '../models/LectureAllocation.js';
import NewsPost from '../models/NewsPost.js';
import LibraryResource from '../models/LibraryResource.js';
import BorrowRequest from '../models/BorrowRequest.js';
import User from '../models/User.js';
import TimetableEntry from '../models/TimetableEntry.js';
import { programSources, transcriptTemplates } from '../data/programSources.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { extractTextFromDocument, inferCoursesFromText } from '../utils/programExtractor.js';
import { normalizeResult, summarizeTranscript } from '../utils/academic.js';
import { buildTranscriptPdf } from '../utils/transcriptPdf.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..', '..');
const uploadRoot = path.resolve(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const folder = req.path.includes('/library') ? 'library' : req.path.includes('/news-posts') ? 'news' : 'general';
    const target = path.join(uploadRoot, folder);
    await fs.mkdir(target, { recursive: true });
    cb(null, target);
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-z0-9.\-_]+/gi, '-').toLowerCase();
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const upload = multer({ storage });

const asyncRoute = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (error) {
    next(error);
  }
};

const generatePassword = () => {
  return `DU-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
};

const matriculeProgramPrefix = (programCode = '') => {
  const clean = String(programCode).replace(/[^a-z0-9]/gi, '').toUpperCase();
  return clean.slice(0, 2).padEnd(2, 'X');
};

const generateMatricule = async ({ academicYear, programCode, level }) => {
  const year = String(academicYear || new Date().getFullYear()).match(/\d{4}/)?.[0] || String(new Date().getFullYear());
  const programPart = matriculeProgramPrefix(programCode);
  const levelPart = String(level || 1).replace(/\D/g, '').slice(-1) || '1';
  const matriculeStart = `DHISP- ${programPart}`;

  for (let attempt = 0; attempt < 25; attempt += 1) {
    const count = await Student.countDocuments({ matricule: new RegExp(`^${matriculeStart.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`) });
    const suffix = String(11610 + count + attempt).padStart(5, '0');
    const matricule = `${matriculeStart}${suffix}${year}${levelPart}`;
    const exists = await Student.exists({ matricule });
    if (!exists) return matricule;
  }

  throw new Error('Unable to generate a unique student matricule. Please try again.');
};

const studentProfileFields = [
  'email',
  'phone',
  'sex',
  'dateOfBirth',
  'placeOfBirth',
  'nationality',
  'address',
  'emergencyContactName',
  'emergencyContactPhone',
];

const sanitizeProfileBody = (body) => {
  const sanitized = {};
  for (const field of studentProfileFields) {
    if (!Object.prototype.hasOwnProperty.call(body, field)) continue;
    if (field === 'dateOfBirth' && !body[field]) continue;
    sanitized[field] = body[field];
  }
  return sanitized;
};

const parseResultRowsFromText = (text) => {
  const rows = [];
  const linePattern = /\b([A-Z]{2,5}\s?\d{3,4})\b\s+(.+?)\s+(\d{1,2})\s+(\d{1,2}(?:\.\d{1,2})?)\s*$/;
  const studentLinePattern = /\b([A-Z0-9\/\-]{4,30})\b\s+([A-Z][A-Z\s.'-]{3,80}?)\s+\b([A-Z]{2,5}\s?\d{3,4})\b\s+(.+?)\s+(\d{1,2})\s+(\d{1,2}(?:\.\d{1,2})?)\s*$/i;

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.replace(/\s+/g, ' ').trim();
    const studentMatch = line.match(studentLinePattern);
    if (studentMatch) {
      rows.push({
        matricule: studentMatch[1].toUpperCase(),
        studentName: studentMatch[2].trim().replace(/\s+/g, ' '),
        courseCode: studentMatch[3].replace(/\s+/g, '').toUpperCase(),
        courseTitle: studentMatch[4].trim(),
        credits: Number(studentMatch[5]),
        finalMark: Number(studentMatch[6]),
      });
      continue;
    }

    const match = line.match(linePattern);
    if (!match) continue;
    rows.push({
      courseCode: match[1].replace(/\s+/g, '').toUpperCase(),
      courseTitle: match[2].trim(),
      credits: Number(match[3]),
      finalMark: Number(match[4]),
    });
  }

  return rows;
};

const normalizeName = (value = '') => value.toLowerCase().replace(/[^a-z]/g, '');

const allocateRowsToStudents = async ({ rows, programCode, year, semester }) => {
  const students = await Student.find(programCode ? { programCode } : {});
  const byMatricule = new Map(students.map((student) => [student.matricule.toUpperCase(), student]));
  const byName = new Map(students.map((student) => [normalizeName(`${student.firstName}${student.lastName}`), student]));
  const allocations = new Map();
  const unmatched = [];

  for (const row of rows) {
    const student =
      (row.matricule && byMatricule.get(row.matricule.toUpperCase())) ||
      (row.studentName && byName.get(normalizeName(row.studentName)));

    const result = normalizeResult({
      courseCode: row.courseCode,
      courseTitle: row.courseTitle,
      credits: row.credits,
      finalMark: row.finalMark,
      year,
      semester,
    });

    if (!student) {
      unmatched.push({ ...row, reason: 'No registered student matched by matricule or name' });
      continue;
    }

    const key = student.matricule;
    if (!allocations.has(key)) {
      allocations.set(key, {
        student: {
          matricule: student.matricule,
          firstName: student.firstName,
          lastName: student.lastName,
          programCode: student.programCode,
        },
        results: [],
      });
    }
    allocations.get(key).results.push(result);
  }

  return { allocations: Array.from(allocations.values()), unmatched };
};

router.get('/system/overview', asyncRoute(async (req, res) => {
  const [programs, students, posts, books, lectureSessions, borrowRequests] = await Promise.all([
    Program.countDocuments(),
    Student.countDocuments(),
    NewsPost.countDocuments(),
    LibraryResource.countDocuments(),
    LectureSession.countDocuments(),
    BorrowRequest.countDocuments(),
  ]);

  res.json({ programs, students, posts, books, lectureSessions, borrowRequests, programSources, transcriptTemplates });
}));

router.get('/program-sources', (req, res) => {
  res.json({ programSources, transcriptTemplates });
});

router.post('/program-sources/extract', requireAuth, requireRole('super_admin', 'academic_admin'), asyncRoute(async (req, res) => {
  const source = programSources.find((item) => item.path === req.body.path);
  if (!source) return res.status(404).json({ error: 'Source document not registered' });

  const absolutePath = path.resolve(projectRoot, source.path);
  const extracted = await extractTextFromDocument(absolutePath);
  if (extracted?.unsupported) return res.status(422).json(extracted);

  const text = typeof extracted === 'string' ? extracted : extracted.text;
  const inferredCourses = inferCoursesFromText(text, source.path);

  res.json({
    source,
    textPreview: text.slice(0, 2500),
    inferredCourses,
    reviewRequired: inferredCourses.filter((course) => course.reviewRequired).length,
  });
}));

router.get('/programs/:code/catalog', requireAuth, requireRole('super_admin', 'academic_admin', 'lecturer'), asyncRoute(async (req, res) => {
  const program = await Program.findOne({ code: req.params.code });
  if (!program) return res.status(404).json({ error: 'Program not found' });
  const byYear = program.courses.reduce((acc, course) => {
    const yearKey = `year${course.year}`;
    const semesterKey = `semester${course.semester}`;
    acc[yearKey] = acc[yearKey] || {};
    acc[yearKey][semesterKey] = acc[yearKey][semesterKey] || [];
    acc[yearKey][semesterKey].push(course);
    return acc;
  }, {});
  res.json({ program, byYear });
}));

router.post('/programs/import-from-source', requireAuth, requireRole('super_admin', 'academic_admin'), asyncRoute(async (req, res) => {
  const source = programSources.find((item) => item.path === req.body.sourcePath);
  if (!source) return res.status(404).json({ error: 'Source document not registered' });

  const program = await Program.findOneAndUpdate(
    { code: req.body.programCode },
    {
      name: req.body.name,
      code: req.body.programCode,
      cycle: req.body.cycle || source.cycle,
      faculty: req.body.faculty,
      language: req.body.language || 'bilingual',
      durationYears: req.body.durationYears || 3,
      courses: (req.body.courses || []).map((course) => ({ ...course, ministrySource: course.ministrySource || source.path })),
      sourceDocuments: [source.path],
      active: true,
    },
    { upsert: true, new: true, runValidators: true }
  );

  res.status(201).json(program);
}));

router.get('/programs', asyncRoute(async (req, res) => {
  const programs = await Program.find().sort({ cycle: 1, name: 1 });
  res.json(programs);
}));

router.post('/programs', requireAuth, requireRole('super_admin', 'academic_admin'), asyncRoute(async (req, res) => {
  const program = await Program.create(req.body);
  res.status(201).json(program);
}));

router.post('/programs/:code/courses', requireAuth, requireRole('super_admin', 'academic_admin'), asyncRoute(async (req, res) => {
  const program = await Program.findOne({ code: req.params.code });
  if (!program) return res.status(404).json({ error: 'Program not found' });
  program.courses.push(req.body);
  await program.save();
  res.status(201).json(program);
}));

router.get('/students', requireAuth, requireRole('super_admin', 'academic_admin'), asyncRoute(async (req, res) => {
  const students = await Student.find().sort({ lastName: 1, firstName: 1 });
  res.json(students);
}));

router.post('/students', requireAuth, requireRole('super_admin', 'academic_admin'), asyncRoute(async (req, res) => {
  const matricule = await generateMatricule({ academicYear: req.body.academicYear, programCode: req.body.programCode, level: req.body.level });
  const temporaryPassword = generatePassword();
  const student = await Student.create({
    ...req.body,
    matricule,
    portalLoginPassword: temporaryPassword,
    portalPasswordIssuedAt: new Date(),
  });
  const email = req.body.email || `${student.matricule.toLowerCase()}@students.dunamis.local`;

  let user = await User.findOne({ matricule: student.matricule });
  if (!user) {
    user = await User.create({
      name: `${student.firstName} ${student.lastName}`,
      email,
      password: temporaryPassword,
      role: 'student',
      matricule: student.matricule,
      active: true,
    });
  } else {
    user.name = `${student.firstName} ${student.lastName}`;
    user.email = email;
    user.password = temporaryPassword;
    user.role = 'student';
    user.active = true;
    await user.save();
  }

  res.status(201).json({
    student,
    login: {
      email,
      matricule: student.matricule,
      temporaryPassword,
      portal: '/login',
      note: 'Student access uses matricule plus this temporary password. Admin and staff access uses email plus password.',
    },
  });
}));

router.patch('/students/me/profile', requireAuth, requireRole('student'), upload.single('profilePhoto'), asyncRoute(async (req, res) => {
  const student = await Student.findOne({ matricule: req.user.matricule });
  if (!student) return res.status(404).json({ error: 'Student profile not found' });

  Object.assign(student, sanitizeProfileBody(req.body));
  if (req.file) student.profilePhotoUrl = `/uploads/general/${req.file.filename}`;
  await student.save();

  res.json({ student, message: 'Profile updated. Names, matricule, program, and results remain locked by administration.' });
}));

router.patch('/students/:matricule/reset-password', requireAuth, requireRole('super_admin', 'academic_admin'), asyncRoute(async (req, res) => {
  const matricule = String(req.params.matricule || '').trim().toUpperCase();
  const student = await Student.findOne({ matricule });
  if (!student) return res.status(404).json({ error: 'Student not found' });

  const user = await User.findOne({ matricule, role: 'student' });
  if (!user) return res.status(404).json({ error: 'Student login account not found' });

  const temporaryPassword = generatePassword();
  user.password = temporaryPassword;
  await user.save();

  student.portalLoginPassword = temporaryPassword;
  student.portalPasswordIssuedAt = new Date();
  student.portalPasswordChangedAt = undefined;
  await student.save();

  res.json({ student, login: { matricule: student.matricule, temporaryPassword } });
}));

router.post('/students/:matricule/results', requireAuth, requireRole('super_admin', 'academic_admin', 'lecturer'), asyncRoute(async (req, res) => {
  const student = await Student.findOne({ matricule: req.params.matricule });
  if (!student) return res.status(404).json({ error: 'Student not found' });

  const results = Array.isArray(req.body.results) ? req.body.results : [req.body];
  student.results.push(...results.map(normalizeResult));
  await student.save();

  res.status(201).json({ student, transcript: summarizeTranscript(student.results) });
}));

router.post('/results/import-pdf', requireAuth, requireRole('super_admin', 'academic_admin'), upload.single('file'), asyncRoute(async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'PDF file is required' });
  const text = await extractTextFromDocument(req.file.path);
  const rows = parseResultRowsFromText(typeof text === 'string' ? text : text.text);
  const year = Number(req.body.year || 1);
  const semester = Number(req.body.semester || 1);
  const programCode = req.body.programCode;
  const { allocations, unmatched } = await allocateRowsToStudents({ rows, programCode, year, semester });

  res.json({
    file: req.file.filename,
    programCode,
    rows,
    allocations,
    unmatched,
    reviewRequired: true,
    note: 'Review allocations before committing them to student transcripts.',
  });
}));

router.post('/results/commit', requireAuth, requireRole('super_admin', 'academic_admin'), asyncRoute(async (req, res) => {
  const committed = [];

  if (req.body.allocations) {
    for (const allocation of req.body.allocations) {
      const student = await Student.findOne({ matricule: allocation.student.matricule });
      if (!student) continue;
      const results = (allocation.results || []).map(normalizeResult);
      student.results.push(...results);
      await student.save();
      committed.push({ matricule: student.matricule, count: results.length, transcript: summarizeTranscript(student.results) });
    }
    return res.status(201).json({ committed });
  }

  const student = await Student.findOne({ matricule: req.body.matricule });
  if (!student) return res.status(404).json({ error: 'Student not found' });
  const results = (req.body.results || []).map(normalizeResult);
  student.results.push(...results);
  await student.save();
  return res.status(201).json({ student, transcript: summarizeTranscript(student.results) });
}));

router.get('/students/:matricule/transcript', requireAuth, asyncRoute(async (req, res) => {
  const student = await Student.findOne({ matricule: req.params.matricule });
  if (!student) return res.status(404).json({ error: 'Student not found' });

  const summary = summarizeTranscript(student.results);
  return res.json({
    student,
    transcript: {
      design: 'Dunamis standard year 1 to year 3 transcript',
      ...summary,
    },
  });
}));

router.get('/students/:matricule/transcript/print', requireAuth, requireRole('student', 'super_admin', 'academic_admin'), asyncRoute(async (req, res) => {
  const student = await Student.findOne({ matricule: req.params.matricule });
  if (!student) return res.status(404).json({ error: 'Student not found' });
  const program = await Program.findOne({ code: student.programCode });
  const pdf = await buildTranscriptPdf(student, program);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename="${student.matricule}-transcript.pdf"`);
  res.send(pdf);
}));

router.get('/students/:matricule/dashboard', requireAuth, asyncRoute(async (req, res) => {
  const student = await Student.findOne({ matricule: req.params.matricule });
  if (!student) return res.status(404).json({ error: 'Student not found' });
  if (req.user.role === 'student' && req.user.matricule !== student.matricule) return res.status(403).json({ error: 'Students can only view their own dashboard' });
  const summary = summarizeTranscript(student.results);
  const program = await Program.findOne({ code: student.programCode });
  const timetable = await TimetableEntry.find({
    programCode: { $in: [student.programCode, String(student.programCode || '').toUpperCase(), 'ALL'] },
    level: student.level,
    academicYear: { $in: [student.academicYear, 'ALL', ''] },
  }).sort({ dayOfWeek: 1, startTime: 1 });
  res.json({
    student,
    program,
    semesters: summary.yearlyResults,
    failedCourses: summary.failedCourses,
    resitCount: summary.resitCount,
    gpa: summary.gpa,
    average20: summary.average20,
    timetable,
  });
}));

router.get('/timetable', requireAuth, asyncRoute(async (req, res) => {
  const query = {};
  if (req.query.programCode) query.programCode = req.query.programCode;
  if (req.query.level) query.level = Number(req.query.level);
  if (req.query.academicYear) query.academicYear = req.query.academicYear;
  const entries = await TimetableEntry.find(query).sort({ programCode: 1, level: 1, dayOfWeek: 1, startTime: 1 });
  res.json(entries);
}));

router.post('/timetable', requireAuth, requireRole('super_admin', 'academic_admin'), asyncRoute(async (req, res) => {
  const entry = await TimetableEntry.create(req.body);
  res.status(201).json(entry);
}));

router.get('/lecture-allocations', requireAuth, requireRole('super_admin', 'academic_admin', 'lecturer'), asyncRoute(async (req, res) => {
  const allocations = await LectureAllocation.find().sort({ academicYear: -1, lecturerName: 1, courseCode: 1 });
  const sessions = await LectureSession.find();
  const sessionMap = sessions.reduce((acc, session) => {
    const key = String(session.allocationId || '');
    acc[key] = acc[key] || { total: 0, validated: 0 };
    acc[key].total += session.hours;
    if (session.validated) acc[key].validated += session.hours;
    return acc;
  }, {});

  res.json(allocations.map((allocation) => {
    const used = sessionMap[String(allocation._id)] || { total: 0, validated: 0 };
    return {
      ...allocation.toObject(),
      hoursDone: used.total,
      validatedHours: used.validated,
      remainingHours: Math.max(0, allocation.allocatedHours - used.validated),
    };
  }));
}));

router.post('/lecture-allocations', requireAuth, requireRole('super_admin', 'academic_admin'), asyncRoute(async (req, res) => {
  const allocation = await LectureAllocation.create(req.body);
  res.status(201).json(allocation);
}));

router.get('/lecture-hours', requireAuth, requireRole('super_admin', 'academic_admin', 'lecturer'), asyncRoute(async (req, res) => {
  const { lecturerName, programCode } = req.query;
  const query = {};
  if (lecturerName) query.lecturerName = lecturerName;
  if (programCode) query.programCode = programCode;

  const sessions = await LectureSession.find(query).sort({ date: -1 });
  const totalHours = sessions.reduce((sum, session) => sum + session.hours, 0);
  const validatedHours = sessions.filter((session) => session.validated).reduce((sum, session) => sum + session.hours, 0);

  res.json({ totalHours, validatedHours, pendingHours: totalHours - validatedHours, sessions });
}));

router.post('/lecture-hours', requireAuth, requireRole('super_admin', 'academic_admin', 'lecturer'), asyncRoute(async (req, res) => {
  let payload = req.body;
  if (req.body.allocationId) {
    const allocation = await LectureAllocation.findById(req.body.allocationId);
    if (!allocation) return res.status(404).json({ error: 'Lecture allocation not found' });
    payload = {
      ...req.body,
      lecturerName: allocation.lecturerName,
      courseCode: allocation.courseCode,
      courseTitle: allocation.courseTitle,
      programCode: allocation.programCode,
      level: allocation.level,
      semester: allocation.semester,
    };
  }
  const session = await LectureSession.create(payload);
  res.status(201).json(session);
}));

router.patch('/lecture-hours/:id/validate', requireAuth, requireRole('super_admin', 'academic_admin'), asyncRoute(async (req, res) => {
  const session = await LectureSession.findByIdAndUpdate(req.params.id, { validated: true }, { new: true });
  if (!session) return res.status(404).json({ error: 'Lecture session not found' });
  res.json(session);
}));

router.get('/news-posts', asyncRoute(async (req, res) => {
  const query = req.query.all === 'true' ? {} : { published: true };
  const posts = await NewsPost.find(query).sort({ createdAt: -1 });
  res.json(posts);
}));

router.post('/news-posts', requireAuth, requireRole('super_admin', 'academic_admin'), upload.array('media', 12), asyncRoute(async (req, res) => {
  const uploadedMedia = (req.files || [])
    .map((file) => {
      const type = file.mimetype?.startsWith('video/') ? 'video' : file.mimetype?.startsWith('image/') ? 'image' : null;
      if (!type) return null;
      return {
        url: `/uploads/news/${file.filename}`,
        type,
        originalName: file.originalname,
      };
    })
    .filter(Boolean);
  const manualMediaUrl = !uploadedMedia.length && req.body.mediaUrl ? req.body.mediaUrl : undefined;
  const manualMediaType = manualMediaUrl ? req.body.mediaType || 'image' : undefined;
  const media = uploadedMedia.length ? uploadedMedia : manualMediaUrl ? [{ url: manualMediaUrl, type: manualMediaType }] : [];
  const primaryMedia = media[0];
  const fileUrl = primaryMedia?.url;
  const mediaType = primaryMedia?.type || 'none';
  const payload = {
    ...req.body,
    slug: req.body.slug || req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    coverImage: req.body.coverImage || (mediaType === 'image' ? fileUrl : undefined),
    mediaUrl: fileUrl,
    mediaType,
    media,
    published: req.body.published === true || req.body.published === 'true',
    publishedAt: req.body.published === true || req.body.published === 'true' ? new Date() : undefined,
  };
  const post = await NewsPost.create(payload);
  res.status(201).json(post);
}));

router.get('/library', requireAuth, asyncRoute(async (req, res) => {
  const books = await LibraryResource.find().sort({ createdAt: -1 });
  res.json(books);
}));

router.post('/library', requireAuth, requireRole('super_admin', 'academic_admin', 'librarian'), upload.single('file'), asyncRoute(async (req, res) => {
  const fileUrl = req.file ? `/uploads/library/${req.file.filename}` : req.body.fileUrl;
  const book = await LibraryResource.create({ ...req.body, fileUrl });
  res.status(201).json(book);
}));

router.post('/library/:id/borrow', requireAuth, asyncRoute(async (req, res) => {
  const resource = await LibraryResource.findById(req.params.id);
  if (!resource) return res.status(404).json({ error: 'Library resource not found' });
  if (!resource.accessMode.includes('Borrowable')) return res.status(400).json({ error: 'This resource is not borrowable' });
  if (resource.availableCopies < 1) return res.status(400).json({ error: 'No copies available' });

  const request = await BorrowRequest.create({
    resourceId: resource._id,
    matricule: req.body.matricule,
    studentName: req.body.studentName,
    dueDate: req.body.dueDate,
  });
  res.status(201).json(request);
}));

router.patch('/library/borrow-requests/:id/:status', requireAuth, requireRole('super_admin', 'librarian'), asyncRoute(async (req, res) => {
  const allowed = ['Approved', 'Returned', 'Rejected'];
  if (!allowed.includes(req.params.status)) return res.status(400).json({ error: 'Invalid borrow status' });
  const request = await BorrowRequest.findByIdAndUpdate(req.params.id, { status: req.params.status }, { new: true });
  if (!request) return res.status(404).json({ error: 'Borrow request not found' });
  res.json(request);
}));

export default router;
