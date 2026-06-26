# SkillVault 🎓

A premium course selling platform built with the MERN stack + TailwindCSS v4.

![SkillVault](https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80)

## ✨ Features

- 🎨 **Minimalistic & Modern UI** — Glassmorphism, smooth animations, dark mode
- 📚 **Course Catalog** — Browse, search, filter by category/level
- 👤 **User Authentication** — JWT-based register/login with secure password hashing
- 📝 **Course Details** — Curriculum, instructor info, reviews, pricing
- 🎯 **Enrollment System** — Enroll in courses and track progress
- 👤 **Profile Dashboard** — View enrolled courses and profile details
- 🔘 **Round Profile Icon** — Click the avatar in the top-right to see your details
- ⚡ **Buttery Smooth Animations** — Framer Motion throughout

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 8, TailwindCSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Backend | Node.js, Express 4 |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1. Clone & Install

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Configure Environment

Edit `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/skillvault
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
```

### 3. Seed the Database

```bash
cd server
npm run seed
```

### 4. Run the App

```bash
# Terminal 1 — Start the server
cd server
npm run dev

# Terminal 2 — Start the client
cd client
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api/health

## 📁 Project Structure

```
courseSellingApp/
├── client/               # React + Vite + TailwindCSS v4
│   ├── src/
│   │   ├── components/   # Navbar, CourseCard, Hero, Footer, etc.
│   │   ├── pages/        # Home, Courses, CourseDetail, Login, Register, Profile
│   │   ├── context/      # AuthContext (JWT session)
│   │   └── services/     # Axios API layer
│   └── ...
├── server/               # Node.js + Express
│   ├── config/           # MongoDB connection
│   ├── controllers/      # Auth, Course, User controllers
│   ├── middleware/        # JWT auth, error handler
│   ├── models/           # User, Course Mongoose schemas
│   ├── routes/           # API routes
│   ├── seed/             # Database seed script (12 courses)
│   └── server.js
└── README.md
```

## 📡 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login & get JWT |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/courses` | List courses (search, filter, sort) |
| GET | `/api/courses/featured` | Get featured/bestseller courses |
| GET | `/api/courses/categories` | Get categories with count |
| GET | `/api/courses/:id` | Get course details |
| POST | `/api/courses/:id/enroll` | Enroll in a course |
| GET | `/api/users/my-courses` | Get enrolled courses |
| PUT | `/api/users/profile` | Update profile |

## 📄 License

MIT
