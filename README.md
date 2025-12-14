# 🎯 Online Quizzes Platform

A full‑stack **Online Quizzes Platform** that allows users to take quizzes online. The project is built with a **modern frontend** and a **Node.js backend** connected to **PostgreSQL**, designed for learning, scalability, and real‑world deployment.

---

## 📂 Repository Structure

```text
online-quizzes-plateform/
 ├── frontend/        # Frontend application (Next.js / Vue)
 ├── backend/         # Backend API (Node.js + Express + PostgreSQL)
 └── README.md        # Project documentation
```

---

## 🚀 Tech Stack

### Frontend

* Next.js **or** Vue.js
* HTML, CSS, JavaScript
* Tailwind CSS
* Axios / Fetch API

### Backend

* Node.js
* Express.js
* PostgreSQL
* pg (PostgreSQL client)
* dotenv

### Deployment

* **Frontend**: Vercel
* **Backend**: Render
* **Database**: Render PostgreSQL

---

## ⚙️ Backend Setup (Local)

### 1️⃣ Go to backend folder

```bash
cd backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create `.env` file

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/quiz_db
NODE_ENV=development
```

### 4️⃣ Run backend

```bash
npm run dev
```

Backend runs at:

```
http://localhost:3000
```

---

## 🗄️ PostgreSQL Database

* Database: PostgreSQL
* Connection handled using `pg` Pool
* Database URL stored securely in environment variables

Test endpoint:

```
GET /db-test
```

---

## 🎨 Frontend Setup (Local)

### 1️⃣ Go to frontend folder

```bash
cd frontend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create `.env` file

#### Next.js

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

#### Vue.js

```env
VITE_API_URL=http://localhost:3000
```

### 4️⃣ Run frontend

```bash
npm run dev
```

---

## 🌍 Deployment Guide

### Backend (Render)

* Create **PostgreSQL** service
* Create **Web Service**
* Root Directory: `backend`
* Build Command: `npm install`
* Start Command: `npm start`
* Add environment variables in Render dashboard

### Frontend (Vercel)

* Import GitHub repository
* Set root directory to `frontend`
* Add API URL as environment variable
* Deploy

---

## 🔐 Environment Variables

| Variable            | Description                  |
| ------------------- | ---------------------------- |
| PORT                | Backend server port          |
| DATABASE_URL        | PostgreSQL connection string |
| NEXT_PUBLIC_API_URL | Frontend API URL             |
| VITE_API_URL        | Vue API URL                  |

---

## ✨ Features (Planned)

* User authentication (JWT)
* Quiz creation and management
* Multiple choice questions
* Score calculation
* Admin dashboard

---

## 📌 Best Practices

* Do not commit `.env`
* Use `process.env.PORT`
* Separate frontend and backend
* Use Render internal DB URL

---

## 👨‍💻 Author

**Rathanak Phan (Mey Mey)**
IT Engineering Student
Royal University of Phnom Penh

---

## 📄 License

This project is for **learning and educational purposes**.
