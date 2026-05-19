# Dunamis University Website

## Project Description

This repository contains the codebase for the official Dunamis University website. The project is designed to be a professional, dynamic, and user-friendly platform that showcases the university's mission, academic offerings, campus life, and institutional values. It aims to empower prospective students, faculty, and the wider community with essential information about Dunamis University.

The website features a modern, responsive design built with a React frontend and a Node.js/Express backend, utilizing Tailwind CSS for styling. Key sections include:

-   **Home**: A welcoming entry point with a hero section, key features, and strategic vision.
-   **The University**: Detailed sub-pages covering:
    -   **Values & Charter**: Outlining the university's core principles and foundational commitments.
    -   **Faculty**: Introducing the esteemed academic staff and departmental structure.
    -   **Accreditations**: Showcasing official recognitions and affiliations.
    -   **Campus & Infrastructure**: Highlighting the facilities and learning environment.
-   **Academics**: (Planned/Future expansion) Information on courses, programs, and faculties.
-   **Admissions**: (Planned/Future expansion) Details on the application process.
-   **Contact**: (Planned/Future expansion) Ways to get in touch with the university.

## Tech Stack

### Frontend
-   **React**: A JavaScript library for building user interfaces.
-   **React Router DOM**: For declarative routing in React applications.
-   **Axios**: Promise-based HTTP client for making API requests.
-   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
-   **Lucide React**: A collection of beautiful open-source icons.
-   **Vite**: A fast build tool for modern web projects.

### Backend
-   **Node.js**: JavaScript runtime environment.
-   **Express.js**: A fast, unopinionated, minimalist web framework for Node.js.
-   **CORS**: Middleware to enable Cross-Origin Resource Sharing.

### Data Storage
-   Currently, page content is managed directly within the `contentController.js` file for simplicity and rapid prototyping.
-   **Future Enhancement**: The architecture is designed to easily integrate with a database like MongoDB (using Mongoose) for more robust content management.

## Setup and Installation

### Prerequisites

-   Node.js (LTS version recommended)
-   npm (Node Package Manager) or Yarn

### 1. Backend Setup

Navigate to the `backend` directory, install dependencies, and start the server.

```bash
cd backend
npm install
npm start   # or node server.js (if your start script is not defined)
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Maintenance & Upgrades
If you are maintaining this project:
1. **Content:** Page data is served by `backend/controllers/contentController.js`. Modify the `siteData` object to update text.
2. **Styles:** All styling is handled via Tailwind CSS classes in the JSX files.
3. **Layout:** The Hero sections use `pt-32` padding to stay visible beneath the fixed navigation bar.
4. **Components:** Use the `InstitutionalInfoBlock` component for consistent information boxes across new pages.

## Deployment
- **Frontend:** Run `npm run build` and deploy the `dist` folder.
- **Backend:** Deploy the Node application to a service like Heroku or Render.

---
*Created for Dunamis University - Empowering Innovation & Excellence.*
