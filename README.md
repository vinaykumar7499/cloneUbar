<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=1,12,24,35,46&height=220&section=header&text=Uber%20Clone&fontSize=65&fontColor=ffffff&animation=fadeIn&fontAlignY=38&desc=Full%20Stack%20Vehicle%20Booking%20Website%20%7C%20Next.js%20%26%20MongoDB&descFontSize=20&descAlignY=60" width="100%"/>

  <p align="center">
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-16%2B-black?style=for-the-badge&logo=next.js" alt="Next.js" /></a>
    <a href="https://reactjs.org"><img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" /></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /></a>
    <a href="https://www.mongodb.com"><img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" /></a>
    <a href="https://authjs.dev"><img src="https://img.shields.io/badge/NextAuth.js-v5-purple?style=for-the-badge&logo=next.js" alt="NextAuth" /></a>
  </p>
</div>

---

## ✨ Features

- 🔐 **Multi-Provider Authentication**: Email/Password login via Credentials provider + One-click Google OAuth with automatic database user synchronization.
- ⚡ **Next.js 16 & React 19**: Built using the latest App Router architecture, Server Actions, and Turbopack.
- 🗄️ **MongoDB Atlas with Mongoose**: Scalable database schema with cached connection pooling and IPv4 DNS failover.
- 🎨 **Responsive Modern UI**: Styled with Tailwind CSS for seamless mobile and desktop experience.
- 🛡️ **Role-Based Access**: Multi-role support (`user`, `admin`) embedded into JWT and session tokens.
- 🩺 **Health Check API**: Live `/api/health` endpoint for uptime monitoring and database connectivity verification.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router) |
| **Frontend** | React 19, Tailwind CSS 4, Motion/React |
| **Language** | TypeScript 5 |
| **Authentication** | NextAuth.js v5 (Auth.js) |
| **Database** | MongoDB Atlas with Mongoose |
| **Password Hashing** | Bcrypt.js |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/vinaykumar7499/cloneUbar.git
cd cloneUbar
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory and add:

```env
MONGO_URL=your_mongodb_connection_string
AUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (Optional for Google Sign-In)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
├── public/                 # Static assets (images, icons)
├── src/
│   ├── app/                # App Router (Pages, Layouts, API Routes)
│   │   ├── api/
│   │   │   ├── auth/       # NextAuth & Register route handlers
│   │   │   └── health/     # Database health check endpoint
│   │   ├── globals.css     # Global CSS
│   │   ├── layout.tsx      # Root Layout
│   │   └── page.tsx        # Home Landing Page
│   ├── components/         # Reusable UI Components
│   │   ├── AuthModal.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── Nav.tsx
│   │   ├── PublicHome.tsx
│   │   └── VehicleSlider.tsx
│   ├── lib/                # Database & Helper utilities (db.ts)
│   ├── models/             # Mongoose Schemas (user.model.ts)
│   ├── auth.ts             # NextAuth v5 configuration
│   └── types.d.ts          # Custom TypeScript declarations
└── README.md
```

---

## 👨‍💻 Author

**Vinay Kumar**
- GitHub: [@vinaykumar7499](https://github.com/vinaykumar7499)

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
