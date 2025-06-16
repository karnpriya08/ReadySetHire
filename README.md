# 🚀 ReadySetHire

**ReadySetHire** is an innovative Mock Interview platform designed to empower job seekers by providing a seamless and interactive experience to prepare for interviews. The application allows users to schedule and manage mock interviews, track upcoming sessions, and receive detailed insights on completed interviews.

---

## 🌟 Key Features

- **Interview Scheduling & Management**  
  Effortlessly book mock interviews with a clean interface to view upcoming and completed sessions.

- **Detailed Feedback & Scoring**  
  Receive comprehensive feedback and performance scores after each interview to identify strengths and areas for improvement.

- **Resume & Profile Image Upload**  
  Personalize your profile by uploading resumes and profile images for interviewers.

- **Real-time Notifications & Alerts** *(Planned)*  
  Get reminders and alerts about your interview schedules.

- **Secure Authentication**  
  Seamless and secure user login using Firebase Authentication with Google sign-in.

- **Modern Tech Stack**  
  Built using React + Tailwind CSS, Redux, Node.js, and Express.

- **Scalable & Extensible Architecture**  
  Modular folder structure and clean codebase ready for future features like admin dashboards and analytics.

---

## 🌐 Live Demo

- **Frontend:** [https://readysethire.vercel.app](https://readysethire.vercel.app)  
- **Backend:** [https://readysethire-roqk.onrender.com](https://readysethire-roqk.onrender.com)

---

## 📦 Features Breakdown

- 🔐 JWT-based User Authentication  
- 🔐 Google Auth via Firebase  
- 📄 Resume & Profile Image Upload  
- 💬 Mock Interview Management  
- 👤 Profile Editing  
- 📋 Category-based Interview Questions  
- 🎯 Zoom-style "Join Interview" Experience  
- 🧠 Interview Scheduling & Feedback System  

---

## 🛠 Tech Stack

### Frontend

- React + Vite  
- Redux  
- TailwindCSS  
- Firebase SDK  

### Backend

- Node.js  
- Express.js  
- MongoDB (Atlas)  
- JWT Authentication  
- Firebase Admin SDK  

---

## 📁 folder Structure
Readysethire/
├── client/              # Frontend React app
│   ├── public/          # Public assets (favicon, index.html, etc.)
│   ├── src/             # Source code
│   │   ├── assets/      # Images, icons, fonts
│   │   ├── components/  # Reusable React components
│   │   ├── pages/       # Page-level components
│   │   ├── redux/       # Redux store, actions, reducers
│   │   ├── utils/       # Utility functions/helpers
│   │   ├── firebase.js  # Firebase client config
│   │   └── ...          # Other frontend source files
├── server/              # Backend server
│   ├── config/          # Configuration (DB, env variables)
│   ├── controllers/     # Request handlers / business logic
│   ├── firebase/        # Firebase admin setup and utilities
│   ├── middleware/      # Express middlewares
│   ├── models/          # Database models (Mongoose schemas)
│   ├── routes/          # API route definitions
│   ├── uploads/         # Uploaded files (resumes, images, etc.)
│   └── server.js        # Express server entry point
├── .env                 # Environment variables (not committed)
├── README.md            # Project documentation
└── package.json         # Project dependencies and scripts




---

## 🔐 Environment Setup

### Backend (`server/.env`)

```env
PORT=3001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FIREBASE_CONFIG={"type":"service_account",...}  # Paste full Firebase service account JSON stringified on one line


Frontend (client/.env)


VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_MEASUREMENT_ID=your_measurement_id


🚀 Getting Started

1. Clone the repository

git clone https://github.com/your-username/readysethire.git
cd readysethire


2. Install dependencies

# Frontend
cd client
npm install

# Backend
cd ../server
npm install


3. Run development servers

# In one terminal (backend)
cd server
npm run dev

# In another terminal (frontend)
cd client
npm run dev


📌 Future Improvements & Roadmap

Google OAuth login enhancements
Real-time video chat integration (WebRTC/Jitsi)
Admin bulk upload for interview questions
Improved analytics and reporting dashboard
Admin Panel & User Management


🤝 Contributing

Contributions are welcome! Please follow these steps:

Fork the repository
Create a new branch (git checkout -b feature-name)
Make your changes and commit (git commit -m "Description of your changes")
Push to your branch (git push origin feature-name)
Open a Pull Request describing your changes
Make sure your code follows the existing style and passes all tests.

Thank you for checking out ReadySetHire! 🚀