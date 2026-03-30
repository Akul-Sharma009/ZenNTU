# ZenNTU 🌿

> Say Bye to Str*ss — A mental health and study companion app for NTU students.

Built as a demo project for the Digital Health & Wellbeing module at Nanyang Technological University.

---

## Features

- 🌤️ **Mood Check-in** — Daily emoji-based mood tracker with personalised suggestions
- 🏠 **Dashboard** — Daily affirmations and quick access to all features
- 👥 **Study Groups** — Find study partners by module, send friend requests, post on the discussion board
- 🍅 **Pomodoro Timer** — Focus and break timer with session tracking
- 💬 **ZenBot** — AI-style wellness chatbot with supportive responses
- 📚 **Resources** — Singapore mental health hotlines, NTU peer tutoring, and self-help articles

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/zen-ntu.git
cd zen-ntu

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

**Login:** Use any student ID and password (demo mode — no real authentication).

---

## Project Structure

```
src/
├── components/     # Navbar, MoodPopup, AffirmationCard
├── pages/          # Login, Home, StudyGroups, Pomodoro, Chat, Resources
├── data/           # Mock students, posts, affirmations, hotlines
└── utils/          # Chatbot response logic
```

---

## Built With

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Lucide Icons](https://lucide.dev/)

---

## Disclaimer

ZenBot is not a substitute for professional mental health support. If you or someone you know is in crisis, please call the Samaritans of Singapore at **1800 221 4444** (24 hours).
