# Dunamis University Website & Portal System

This project contains the public Dunamis University website and a dynamic university management system with administration, student, news, timetable, transcript, lecture-hour, and library portals.

## Main Documentation

Read the full plain-language system documentation here:

```text
docs/SYSTEM_DOCUMENTATION.md
docs/Dunamis-System-Documentation.pdf
```

It explains:

- System architecture
- Frontend structure
- Backend logic
- MongoDB schemas
- Database relationships
- Authentication and roles
- Student registration and matricule generation
- Result import and transcript logic
- Lecture-hour validation
- Library workflow
- News publishing with multiple media files
- User guide for admins, students, librarians, and visitors
- Deployment notes

To regenerate the PDF after documentation changes:

```bash
node docs/generate-system-documentation-pdf.mjs
```

## Tech Stack

Frontend:

- React
- Vite
- React Router
- Tailwind CSS
- i18next EN/FR language switching

Backend:

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- multer file uploads

## Local Setup

### Backend

```bash
cd backend
npm install
node server.js
```

The backend reads configuration from `backend/.env`.

Typical values:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Optional frontend environment value:

```env
VITE_API_URL=http://localhost:5001/api
```

## Build

Frontend production build:

```bash
cd frontend
npm run build
```

Backend syntax checks:

```bash
node --check backend\routes\portalRoutes.js
node --check backend\models\NewsPost.js
```

## Important Routes

Public site:

- `/`
- `/university`
- `/training`
- `/admission`
- `/apprenticeship`
- `/international`
- `/student-life`
- `/businesses`
- `/news`
- `/contact`

Portals:

- `/login/staff`
- `/login/student`
- `/admin`
- `/admin/academics`
- `/admin/lectures`
- `/admin/news`
- `/admin/timetable`
- `/student`
- `/library`

## Deployment Notes

Frontend can be hosted on Vercel using:

- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`

Backend can be hosted on Render using:

- Root directory: `backend`
- Build command: `npm install`
- Start command: `node server.js`

Set `VITE_API_URL` in the frontend deployment to the deployed backend API URL.
