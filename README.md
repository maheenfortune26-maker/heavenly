# 🏨 Heavenly — MERN Hotel Booking App

A full-stack hotel booking platform built with MongoDB, Express, React, and Node.js.

---

## ✨ Features

- 🔍 Search hotels by city, dates & guests
- 🏠 Hotel & room listings with filters (type, price, sort)
- 📅 Room detail page with booking form
- 💳 Stripe payment integration
- 📧 Booking confirmation emails (Nodemailer)
- 🧑‍💼 Owner dashboard — add rooms, toggle availability, view bookings
- 🔐 JWT authentication (register/login)
- 📱 Fully responsive design

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
# Client
cd client && npm install

# Server
cd ../server && npm install
```

### 2. Configure environment variables

**Server** — copy `.env.example` to `.env` and fill in:

```env
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=you@gmail.com
SMTP_PASS=your_app_password
CLIENT_URL=http://localhost:5173
```

**Client** — copy `.env.example` to `.env`:

```env
VITE_BACKEND_URL=http://localhost:5000
```

### 3. Run in development

```bash
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
cd client && npm run dev
```

App runs at: **http://localhost:5173**

---

## 📁 Project Structure

```
Heavenly/
├── client/                  # React + Vite frontend
│   ├── src/
│   │   ├── assets/          # Images, icons, dummy data
│   │   ├── components/      # Navbar, Hero, Footer, etc.
│   │   ├── context/         # AppContext (global state)
│   │   └── pages/           # Home, AllRooms, RoomDetails, MyBookings
│   │       └── owner/       # Dashboard, AddRoom, ListRooms
│   └── package.json
│
├── server/                  # Node.js + Express backend
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API route handlers
│   ├── middleware/          # JWT auth middleware
│   └── server.js
│
└── README.md
```

---

## 🔌 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/users/register` | Register user |
| POST | `/api/users/login` | Login user |
| GET | `/api/users/me` | Get current user |
| POST | `/api/hotels/register` | Register hotel (owner) |
| GET | `/api/hotels` | Get all hotels |
| POST | `/api/rooms` | Add room (owner) |
| GET | `/api/rooms` | Get all rooms |
| GET | `/api/rooms/:id` | Get room details |
| PATCH | `/api/rooms/:id/availability` | Toggle availability |
| POST | `/api/bookings/check-availability` | Check room availability |
| POST | `/api/bookings` | Create booking |
| GET | `/api/bookings/my` | Get my bookings |
| GET | `/api/bookings/owner` | Get hotel bookings |
| POST | `/api/bookings/stripe-session` | Create Stripe checkout |
| POST | `/api/bookings/webhook` | Stripe webhook |
| PATCH | `/api/bookings/:id/cancel` | Cancel booking |

---

## 🚢 Deployment (Vercel)

1. Push to GitHub
2. Deploy `server/` as a Node.js project on Vercel
3. Deploy `client/` as a Vite project on Vercel
4. Set all environment variables in Vercel dashboard
5. Update `VITE_BACKEND_URL` to your deployed backend URL

---

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite, Tailwind CSS, React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT (bcryptjs) |
| Payments | Stripe |
| Email | Nodemailer |
| Deploy | Vercel |
