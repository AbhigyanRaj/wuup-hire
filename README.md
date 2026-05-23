# Wuup Hire
Built by Abhigyan Raj, who also built Voicely a production voice AI S2S pipeline.

Wuup Hire is a premium, AI-powered technical evaluation and interviewing platform. It allows engineering teams to deploy bespoke AI voice agents to automatically screen, interview, and evaluate candidates in a natural, conversational manner.

## Highlights
- **Agentic Voice AI Pipeline**: Connects candidate responses with dynamic, real-time evaluation rubrics.
- **Sleek Production Dashboard**: Fully featured dashboard to manage Jobs, Candidates, and live Interview streams.
- **Automated Scorecards**: Candidates are automatically evaluated against job requirements, generating structured feedback and actionable hire/no-hire recommendations.
- **Premium UX/UI**: Implements a highly technical, dark-mode inspired UI using a modern design system.

## Setup & Local Development

This repository contains two main packages: `frontend` (React + Vite) and `backend` (Express + Prisma).

### 1. Backend

Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Set up your environment variables by creating a `.env` file (see `.env.example` if available).

Initialize the database using Prisma:
```bash
npx prisma generate
npx prisma db push
```

Start the backend server:
```bash
npm run dev
```

### 2. Frontend

Open a new terminal window, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

Start the Vite development server:
```bash
npm run dev
```

Your app will be running at `http://localhost:5173`.

## Documentation

- **Backend API Reference**: For full endpoint details, see [backend/API.md](./backend/API.md)
- **Frontend Architecture**: The frontend is built using React, React Query, Tailwind CSS, and Framer Motion for animations.

---

*This repository represents a complete transition from a raw assignment into a fully polished production-grade application.*
