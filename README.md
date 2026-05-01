# 🎙️ Andres English Tutor
### *Your AI-Powered Personal Language Coach*

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)

**Andres English Tutor** is a high-end, browser-based language learning platform designed for Spanish-speaking learners. It bridges the gap between passive learning and active conversation by providing an interactive AI tutor capable of real-time speech interaction, pronunciation feedback, and guided practice.

---

## ✨ Key Features

### 🤖 Intelligent AI Tutor (Andres)
Engage in natural conversations with **Andres**, an AI persona optimized for language coaching. Powered by **Google Gemini**, Andres provides short, clear, and encouraging feedback tailored to your learning level.

### 🗣️ Voice-First Interaction
- **Real-time Speech Recognition**: Practice speaking naturally using the Web Speech API.
- **Natural Voice Synthesis**: Listen to perfect English pronunciation with `SpeechSynthesisUtterance`.
- **Integrated Audio Controls**: Play back any AI response to master every nuance.

### 🎯 Practice Modes
Tailor your session to your current needs:
- **Pronunciation**: Focus on accuracy and clarity.
- **Daily Conversation**: Natural, casual dialogue.
- **Vocabulary Builder**: Learn new words through context.
- **Interview Prep**: Simulate basic job interviews.
- **Repeat After Me**: Traditional drilling to build muscle memory.

### 💎 Premium Design System
- **Glassmorphism UI**: A modern, clean, and editorial-style interface.
- **Responsive Layout**: Optimized for Desktop (1920px), Tablets (768px), and Mobile (360px+).
- **IA Usage Monitoring**: Real-time token tracking to manage API consumption effectively.

---

## 🛠️ Technical Architecture

The project follows a modular and secure architecture designed for scalability:

```text
src/
  ├── components/    # Reusable UI (Chat, AIUsage, Learning Path)
  ├── services/      # Gemini & Supabase secure communication
  ├── styles/        # Premium CSS Grid & Flexbox design system
  ├── data/          # Static module & lesson definitions
  └── utils/         # Performance & fingerprinting utilities

supabase/
  └── functions/     # Edge Functions for secure API orchestration
```

### 🔒 Security & Orchestration
- **Edge Function Proxy**: The Gemini API key is never exposed to the frontend. All AI traffic is proxied through Supabase Edge Functions.
- **Server-Side Accounting**: Token usage is calculated and recorded server-side to prevent unauthorized API consumption.
- **Fingerprint-Based Limits**: Fair usage is enforced via client fingerprinting and anonymous ledger entries.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- A Supabase Project
- Google Gemini API Key

### 2. Installation
```bash
git clone https://github.com/Andresito202/andres-english-tutor.git
cd andres-english-tutor
npm install
```

### 3. Environment Setup
Create a `.env` file based on `.env.example`:
```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_USE_DIRECT_GEMINI=false
```

### 4. Run Development Server
```bash
npm run dev
```
*Access locally at `http://localhost:5173` or on your mobile device using the Network URL.*

---

## 🏗️ Engineering Highlights

- **Structural Layout Strategy**: Uses a hybrid Flexbox/Grid system for absolute vertical stability.
- **Mobile-First Responsiveness**: Implements `100dvh` and dynamic grid columns for seamless mobile experience.
- **Diagnostic Panel**: Built-in voice and audio diagnostics for debugging browser APIs.
- **CI/CD**: Automated deployment to GitHub Pages via GitHub Actions.

---

## 📈 Roadmap
- [ ] User authentication with Supabase Auth.
- [ ] Remote progress persistence for all lessons.
- [ ] Persistent chat history and session analysis.
- [ ] Gamified learning streaks and achievements.

---

Developed with ❤️ by **Andres** | [Visit Portfolio](https://andresito202.github.io/andres-english-tutor/)
