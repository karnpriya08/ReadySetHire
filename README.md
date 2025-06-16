# 🚀 ReadySetHire

Project Overview

ReadySetHire is an innovative Mock Interview platform designed to empower job seekers by providing a seamless and interactive experience to prepare for interviews. The application allows users to schedule and manage mock interviews, keeping track of their upcoming sessions and providing detailed insights on completed interviews.

Key Features:
Interview Scheduling & Management: Users can effortlessly book mock interviews, with a clean interface to view upcoming and completed interviews.
Detailed Feedback & Scoring: After each interview, users receive comprehensive feedback and performance scores to identify strengths and areas for improvement.
Resume & Profile Image Upload: Users can upload their resumes and profile images to personalize their profiles and have relevant documents ready for interviewers.
Real-time Notifications & Alerts: Integrated notification system to remind users about their interview schedules (planned future enhancement).
Secure Authentication: Leveraging Firebase Authentication for seamless and secure user login with Google sign-in.
Modern Tech Stack: Built using React with Tailwind CSS for a responsive frontend, Redux for state management, and Node.js with Express for a robust backend API.
Scalable and Extensible Architecture: Modular folder structure and clean codebase make it easy to add future features like admin dashboards or enhanced analytics.
Why ReadySetHire?
This platform bridges the gap between preparation and opportunity, enabling users to practice in a realistic environment and track their progress over time. By combining scheduling, feedback, and document management, it offers an all-in-one solution for interview readiness.


## 🌐 Live Demo

- **Frontend**: [https://readysethire.vercel.app](https://readysethire.vercel.app)  
- **Backend**: [https://readysethire-roqk.onrender.com](https://readysethire-roqk.onrender.com)

---

## 📦 Features

- 🔐 User authentication (JWT-based)
- 🔐 User Authentication with **Google Auth via Firebase**
- 📄 Resume upload & Image Upload 
- 💬 Mock Interview Management
- 👤 Profile Editing
- 📋 Category-based interview questions
- 🎯 Zoom-style "Join Interview" mock experience
- 🧠 Interview Scheduling & Feedback System

---

## 🛠 Tech Stack

**Frontend**

- React + Vite  
- Redux   
- TailwindCSS 
- Firebase SDK  

**Backend**

- Node.js
- Express.js
- MongoDB (Atlas)
- JWT Authentication
- Firebase Admin SDK


---

## 📁 Project Structure

eadysethire/
.
├── client/ # Frontend React app
│ ├── public/ # Public assets (favicon, index.html, etc.)
│ ├── src/ # Source code
│ │ ├── tests/ # Frontend test files
│ │ ├── assets/ # Images, icons, fonts
│ │ ├── components/ # Reusable React components
│ │ ├── pages/ # Page-level components
│ │ ├── redux/ # Redux store, actions, reducers
│ │ ├── utils/ # Utility functions/helpers
│ │ ├── app.jsx # Main App component
│ │ ├── firebase.js # Firebase client config
│ │ ├── index.css # Global CSS
│ │ ├── main.jsx # React DOM render entry
│ │ └── ... # Other frontend source files
├── server/ # Backend server
│ ├── config/ # Configuration (DB, env variables)
│ ├── controllers/ # Request handlers / business logic
│ ├── firebase/ # Firebase admin setup and utilities
│ ├── middleware/ # Express middlewares
│ ├── models/ # Database models (Mongoose schemas)
│ ├── routes/ # API route definitions
│ ├── tests/ # Backend test files
│ ├── uploads/ # Uploaded files (resumes, images, etc.)
│ ├── blogDB.js # Blog database helper or seed data
│ ├── questions.json # Static questions data file
│ ├── questionsDB.js # Questions database helper or seed data
│ ├── blog.json # Blog data or other static JSON files
│ └── server.js # Express server entry point
├── .env # Environment variables (not committed)
├── README.md # Project documentation
└── package.json # Project dependencies and scripts

---

## 🔐 Environment Setup

### Backend (`server/.env`)

PORT=3001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FIREBASE_CONFIG={"type":"service_account",...} # Your Firebase JSON config as a string

> Use `JSON.stringify()` to paste the full Firebase service account JSON on one line.

---

### Frontend (`/client/.env`)



### Frontend (`client/.env`)

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_MEASUREMENT_ID=your_measurement_id


---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/readysethire.git
   cd readysethire

Install frontend dependencies

cd client
npm install

Install backend dependencies

cd ../server
npm install

Run development servers

# In one terminal
cd server
npm run dev

# In another terminal
cd client
npm run dev


 Future Improvements

Google OAuth login
Real-time video chat (WebRTC or integration)
Admin bulk upload for questions
Improved analytics & reports

📌 Roadmap / Future Scope

 Admin Panel & Dashboard for managing users and interviews
 Google OAuth improvements & Social Login Enhancements
 Interview Video Call via WebRTC or Jitsi Integration
 Bulk Upload of Interview Questions by Admin
 Performance Analytics & Reporting

 Contributing

Contributions are welcome! If you'd like to improve this project, please follow these steps:

Fork the repository.
Create a new branch for your feature or bug fix (git checkout -b feature-name).
Make your changes and commit them (git commit -m "Description of your changes").
Push to your branch (git push origin feature-name).
Open a Pull Request describing your changes.
Please make sure your code follows the existing style and passes all tests.

