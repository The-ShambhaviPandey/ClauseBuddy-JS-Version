# Backend — ClauseBuddy API

Node.js + Express REST API handling authentication, file management, chat persistence, and communication with the Python microservice.

---

## Purpose

This service is the core API layer of ClauseBuddy. It handles:

- User authentication via JWT and Google OAuth
- PDF file uploads and storage
- Chat history persistence in MongoDB
- Proxying AI queries to the Python microservice on port 8000

---

## File Structure

```
Backend/
├── src/
│   ├── config/
│   │   ├── db.js               # MongoDB connection setup
│   │   └── passport.js         # Google OAuth 2.0 strategy
│   ├── controllers/
│   │   └── userController.js   # User profile logic
│   ├── middleware/
│   │   └── auth.js             # JWT verification middleware
│   ├── models/
│   │   ├── Chat.js             # Chat history schema
│   │   ├── File.js             # Uploaded file metadata schema
│   │   └── User.js             # User schema
│   ├── routes/
│   │   ├── authRoutes.js       # /api/auth — login, OAuth
│   │   ├── chatRoutes.js       # /api/chat — messages
│   │   └── userRoutes.js       # /api/user — profile
│   └── index.js                # Express entry point
├── uploads/                    # Temporary PDF storage
├── .env                        # Environment variables (not committed)
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## Architecture

```
Incoming Request
    │
    ▼
Express Router (index.js)
    ├── auth.js middleware — JWT check on protected routes
    ├── authRoutes    → Passport.js → Google OAuth / JWT issue
    ├── chatRoutes    → Forward query to Microservice (port 8000)
    └── userRoutes    → MongoDB (User model)
                │
                ▼
         MongoDB Atlas / Local
         (User, Chat, File collections)
```

---

## Setup

### Prerequisites

- Node.js v18+
- MongoDB running locally or a MongoDB Atlas URI
- Google OAuth 2.0 credentials

### Install & Run

```bash
cd Backend
npm install
npm start          # production
npm run dev        # development with nodemon (auto-reload)
```

Server runs on `http://localhost:5000`

---

## Environment Variables

Create a `.env` file in the `Backend/` directory:

```env
PORT=5000
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:5000

JWT_SECRET=your-secret-key

MONGODB_URI=mongodb://localhost:27017/clausebuddy

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

NODE_ENV=development
```

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project → Enable **Google+ API**
3. Go to Credentials → Create **OAuth 2.0 Client ID** (Web Application)
   - Authorized JavaScript origins: `http://localhost:5173`
   - Authorized redirect URI: `http://localhost:5000/api/auth/google/callback`
4. Copy the Client ID and Secret into your `.env`

---

## API Endpoints

| Method | Route                       | Auth | Description              |
| ------ | --------------------------- | ---- | ------------------------ |
| GET    | `/api/auth/google`          | —    | Initiate Google OAuth    |
| GET    | `/api/auth/google/callback` | —    | OAuth redirect callback  |
| POST   | `/api/auth/login`           | —    | Email/password login     |
| GET    | `/api/user/profile`         | JWT  | Get current user profile |
| POST   | `/api/chat`                 | JWT  | Send a message / query   |
| GET    | `/api/chat/history`         | JWT  | Retrieve chat history    |

---

## Dependencies

| Package                                | Purpose                        |
| -------------------------------------- | ------------------------------ |
| `express`                              | HTTP server framework          |
| `mongoose`                             | MongoDB ODM                    |
| `passport` + `passport-google-oauth20` | Google OAuth                   |
| `jsonwebtoken`                         | JWT creation and verification  |
| `bcryptjs`                             | Password hashing               |
| `multer`                               | Multipart file upload handling |
| `pdf-parse`                            | PDF text extraction on backend |
| `cors`                                 | Cross-origin request handling  |
| `dotenv`                               | Load `.env` variables          |
| `nodemon`                              | Dev auto-reload                |

---

## Notes

- Never commit `.env` to version control — it is listed in `.gitignore`
- The `uploads/` folder stores PDFs temporarily; consider cloud storage (S3 / GCS) for production
- Use a long, random string for `JWT_SECRET` in production
- `MONGODB_URI` should point to your Atlas cluster URI in production

---
