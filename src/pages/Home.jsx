import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AffirmationCard from '../components/AffirmationCard';
import MoodPopup from '../components/MoodPopup';
import { mockPosts } from '../data/mockPosts';

const moodConfig = {
  Great: {
    emoji: '😊',
    bg: 'bg-green-50 border-green-200',
    textColor: 'text-green-700',
    message: "You're in a great headspace today!",
    suggestion: "Channel that energy — connect with fellow students or tackle something new.",
    actions: [{ label: 'Find a Study Group', to: '/study-groups' }],
  },
  Okay: {
    emoji: '😐',
    bg: 'bg-yellow-50 border-yellow-200',
    textColor: 'text-yellow-700',
    message: "Doing okay — that's perfectly fine.",
    suggestion: "A focused Pomodoro session could help you make solid progress today.",
    actions: [{ label: 'Start a Pomodoro', to: '/pomodoro' }],
  },
  Meh: {
    emoji: '😔',
    bg: 'bg-orange-50 border-orange-200',
    textColor: 'text-orange-700',
    message: "Feeling a bit low today.",
    suggestion: "ZenBot is here to listen whenever you're ready — no pressure.",
    actions: [{ label: 'Talk to ZenBot', to: '/chat' }],
  },
  Stressed: {
    emoji: '😤',
    bg: 'bg-purple-50 border-purple-200',
    textColor: 'text-purple-700',
    message: "Stress is running high.",
    suggestion: "Let's break things down. Try a Pomodoro to regain focus, or talk it out with ZenBot.",
    actions: [
      { label: 'Start Pomodoro', to: '/pomodoro' },
      { label: 'Talk to ZenBot', to: '/chat' },
    ],
    crisis: {
      bg: 'bg-purple-50 border-purple-200',
      title: 'text-purple-700',
      body: 'text-purple-600',
      btn: 'text-purple-700 border-purple-100 hover:bg-purple-100',
    },
  },
  Anxious: {
    emoji: '😰',
    bg: 'bg-red-50 border-red-200',
    textColor: 'text-red-700',
    message: "Feeling anxious — you're not alone.",
    suggestion: "Take a breath. Check out our mental health resources or chat with ZenBot.",
    actions: [
      { label: 'Browse Resources', to: '/resources' },
      { label: 'Talk to ZenBot', to: '/chat' },
    ],
    crisis: {
      bg: 'bg-red-50 border-red-200',
      title: 'text-red-700',
      body: 'text-red-600',
      btn: 'text-red-700 border-red-100 hover:bg-red-100',
    },
  },
};

const peerMoodData = [
  { mood: 'Great',    emoji: '😊', pct: 18, color: 'bg-green-400' },
  { mood: 'Okay',     emoji: '😐', pct: 28, color: 'bg-yellow-400' },
  { mood: 'Meh',      emoji: '😔', pct: 22, color: 'bg-orange-400' },
  { mood: 'Stressed', emoji: '😤', pct: 24, color: 'bg-red-400' },
  { mood: 'Anxious',  emoji: '😰', pct: 8,  color: 'bg-purple-400' },
];

const dailyChallenges = [
  "Text a classmate you haven't spoken to in a while 💬",
  "Take a 10-minute walk between study sessions 🚶",
  "Drink 8 glasses of water today 💧",
  "Write down 3 things you're grateful for tonight ✍️",
  "Step outside for 5 minutes of fresh air ☀️",
  "Reach out to a friend and ask how they're doing 🤝",
  "Spend 10 minutes on something you enjoy, no guilt 🎮",
  "Try studying in a new spot on campus today 📍",
  "Eat a proper meal away from your screen 🍱",
  "Do a 5-minute stretch between study blocks 🧘",
  "Stay off social media for 2 hours and notice the difference 📵",
  "Compliment someone today — make their day ☀️",
  "Block out a proper break in your schedule 🗓️",
  "Tidy your study space for 5 minutes 🧹",
];

const breathPhases = [
  { label: 'Inhale', duration: 4 },
  { label: 'Hold',   duration: 7 },
  { label: 'Exhale', duration: 8 },
];

const moodEmojis = { Great: '😊', Okay: '😐', Meh: '😔', Stressed: '😤', Anxious: '😰' };

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

function relativeTime(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(diff / 3600000);
  if (hours < 24) return `${hours}h ago`;
  if (hours < 48) return 'Yesterday';
  return new Date(iso).toLocaleDateString('en-SG', { day: 'numeric', month: 'short' });
}

export default function Home() {
  const navigate = useNavigate();
  const studentId = sessionStorage.getItem('studentId') || 'Student';

  const [mood, setMood] = useState(sessionStorage.getItem('userMood'));
  const [showMoodPopup, setShowMoodPopup] = useState(false);
  const [streak, setStreak] = useState(1);
  const [moodHistory, setMoodHistory] = useState([]);
  const [breathPhase, setBreathPhase] = useState(0);
  const [breathCount, setBreathCount] = useState(4);
  const [breathActive, setBreathActive] = useState(false);
  const [journalText, setJournalText] = useState('');
  const [journalSaved, setJournalSaved] = useState(false);

  useEffect(() => {
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem('lastVisit');
    const saved = parseInt(localStorage.getItem('streak') || '0');
    let newStreak = 1;
    if (lastVisit === today) {
      newStreak = saved || 1;
    } else {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      newStreak = lastVisit === yesterday ? saved + 1 : 1;
      localStorage.setItem('lastVisit', today);
      localStorage.setItem('streak', String(newStreak));
    }
    setStreak(newStreak);
  }, []);

  useEffect(() => {
    setMoodHistory(JSON.parse(localStorage.getItem('moodHistory') || '[]').slice(-7));
  }, [mood]);

  useEffect(() => {
    function handleMoodUpdated() {
      setMood(sessionStorage.getItem('userMood'));
      setMoodHistory(JSON.parse(localStorage.getItem('moodHistory') || '[]').slice(-7));
    }
    window.addEventListener('moodUpdated', handleMoodUpdated);
    return () => window.removeEventListener('moodUpdated', handleMoodUpdated);
  }, []);

  useEffect(() => {
    if (!breathActive) return;
    if (breathCount > 1) {
      const t = setTimeout(() => setBreathCount((c) => c - 1), 1000);
      return () => clearTimeout(t);
    } else {
      const next = breathPhase + 1;
      if (next >= breathPhases.length) {
        const t = setTimeout(() => {
          setBreathActive(false);
          setBreathPhase(0);
          setBreathCount(breathPhases[0].duration);
        }, 1000);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          setBreathPhase(next);
          setBreathCount(breathPhases[next].duration);
        }, 1000);
        return () => clearTimeout(t);
      }
    }
  }, [breathActive, breathCount, breathPhase]);

  function handleMoodClose() {
    setShowMoodPopup(false);
    setMood(sessionStorage.getItem('userMood'));
  }

  function saveJournal() {
    if (!journalText.trim()) return;
    const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    entries.unshift({ text: journalText.trim(), date: new Date().toISOString().split('T')[0] });
    localStorage.setItem('journalEntries', JSON.stringify(entries));
    setJournalText('');
    setJournalSaved(true);
    setTimeout(() => setJournalSaved(false), 2000);
  }

  const config = mood ? moodConfig[mood] : null;
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const todayChallenge = dailyChallenges[dayOfYear % dailyChallenges.length];
  const isExpanded = breathPhase === 0 || breathPhase === 1;

  return (
    <>
      {showMoodPopup && <MoodPopup onClose={handleMoodClose} />}
      <div className="h-screen flex flex-col overflow-hidden relative">
        {/* Decorative background blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-zen-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-16 right-0 w-96 h-96 bg-calm-300/30 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="px-8 pt-6 pb-3 shrink-0 relative flex items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            {getGreeting()}, {studentId}! 👋
          </h1>
          <div className="absolute right-8 flex items-center gap-1.5 bg-orange-50 border border-orange-200 rounded-xl px-3 py-1.5">
            <span>🔥</span>
            <span className="text-sm font-semibold text-orange-600">
              {streak} day{streak !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* 3-column grid */}
        <div className="flex-1 overflow-hidden px-8 pb-20 grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Column 1 — Today */}
          <div className="flex flex-col gap-4 overflow-y-auto pb-2 min-h-0">

            {/* Mood card */}
            {config ? (
              <div className={`rounded-2xl border p-5 ${config.bg}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-5xl">{config.emoji}</span>
                  <div>
                    <p className={`font-semibold text-lg ${config.textColor}`}>{mood}</p>
                    <p className="text-sm text-gray-600">{config.message}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-4">{config.suggestion}</p>
                <div className="flex gap-2 flex-wrap">
                  {config.actions.map(({ label, to }) => (
                    <button
                      key={to}
                      onClick={() => navigate(to)}
                      className="bg-white text-gray-800 text-sm font-medium px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-white to-zen-100 rounded-2xl border border-zen-200 shadow-sm p-5 text-center">
                <p className="text-gray-400 text-sm">No mood logged yet today.</p>
              </div>
            )}

            {/* Crisis banner */}
            {config?.crisis && (
              <div className={`border rounded-2xl p-4 ${config.crisis.bg}`}>
                <p className={`text-sm font-semibold mb-1 ${config.crisis.title}`}>
                  You don't have to deal with this alone 💙
                </p>
                <p className={`text-xs mb-3 ${config.crisis.body}`}>
                  NTU counselling is free and confidential. Reach out whenever you're ready.
                </p>
                <div className="flex flex-col gap-1.5">
                  <a href="tel:18002214444" className={`text-xs font-medium bg-white rounded-xl px-3 py-2 border transition-colors ${config.crisis.btn}`}>
                    📞 SOS Helpline — 1800 221 4444 (24/7)
                  </a>
                  <a href="tel:63892222" className={`text-xs font-medium bg-white rounded-xl px-3 py-2 border transition-colors ${config.crisis.btn}`}>
                    📞 IMH Crisis — 6389 2222 (24/7)
                  </a>
                </div>
              </div>
            )}

            {/* Mood history */}
            <div className="bg-gradient-to-br from-white to-zen-100 rounded-2xl border border-zen-200 shadow-sm p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                <span className="w-1 h-3.5 bg-zen-400 rounded-full inline-block" />
                📊 Your mood today
              </p>
              {moodHistory.length > 0 ? (
                <div className="flex gap-4 overflow-x-auto pb-1">
                  {moodHistory.map((entry, i) => (
                    <div key={i} className="flex flex-col items-center gap-1 shrink-0">
                      <span className="text-2xl">{moodEmojis[entry.mood]}</span>
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {relativeTime(entry.timestamp)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">Your mood check-ins will appear here.</p>
              )}
            </div>

            {/* Re-check mood */}
            <button
              onClick={() => setShowMoodPopup(true)}
              className="w-full text-sm text-gray-500 hover:text-zen-600 py-3 rounded-2xl border border-dashed border-gray-300 hover:border-zen-400 transition-colors"
            >
              How are you feeling now? ✨
            </button>
          </div>

          {/* Column 2 — Wellness */}
          <div className="flex flex-col gap-4 overflow-y-auto pb-2 min-h-0">

            <AffirmationCard />

            {/* Peer mood pulse */}
            <div className="bg-gradient-to-br from-calm-100 to-white rounded-2xl border border-calm-100 shadow-sm p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                <span className="w-1 h-3.5 bg-calm-400 rounded-full inline-block" />
                💬 How NTU students are feeling right now
              </p>
              <div className="flex flex-col gap-2.5">
                {peerMoodData.map(({ mood: m, emoji, pct, color }) => (
                  <div key={m} className="flex items-center gap-2">
                    <span className="text-base w-6">{emoji}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div className={`${color} h-2 rounded-full`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs text-gray-400 w-8 text-right">{pct}%</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">Based on anonymous check-ins today</p>
            </div>

            {/* Breathing exercise */}
            <div className="bg-gradient-to-br from-white to-calm-100 rounded-2xl border border-calm-100 shadow-sm p-5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4 flex items-center gap-2">
                <span className="w-1 h-3.5 bg-blue-300 rounded-full inline-block" />
                🫁 4-7-8 Breathing
              </p>
              <div className="flex flex-col items-center gap-4">
                <div
                  className={`w-20 h-20 rounded-full border-4 flex items-center justify-center ${
                    breathActive
                      ? isExpanded
                        ? 'border-blue-400 bg-blue-50 scale-125'
                        : 'border-green-400 bg-green-50 scale-90'
                      : 'border-zen-300 bg-zen-50'
                  }`}
                  style={{
                    ...(breathActive ? { transition: `transform ${breathPhases[breathPhase].duration}s ease-in-out` } : {}),
                    boxShadow: breathActive
                      ? isExpanded
                        ? '0 0 32px rgba(96,165,250,0.35)'
                        : '0 0 32px rgba(74,222,128,0.35)'
                      : '0 0 20px rgba(134,239,172,0.25)',
                  }}
                >
                  <span className="text-xl font-bold text-gray-700">
                    {breathActive ? breathCount : '4'}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-600">
                  {breathActive ? breathPhases[breathPhase].label : 'Inhale · Hold · Exhale'}
                </p>
                <button
                  onClick={() => {
                    if (breathActive) {
                      setBreathActive(false);
                      setBreathPhase(0);
                      setBreathCount(4);
                    } else {
                      setBreathPhase(0);
                      setBreathCount(4);
                      setBreathActive(true);
                    }
                  }}
                  className="bg-zen-500 hover:bg-zen-600 text-white text-sm font-medium px-6 py-2 rounded-xl transition-colors"
                >
                  {breathActive ? 'Stop' : 'Start'}
                </button>
              </div>
            </div>
          </div>

          {/* Column 3 — Community */}
          <div className="flex flex-col gap-4 overflow-y-auto pb-2 min-h-0">

            {/* Daily challenge */}
            <div className="bg-gradient-to-br from-orange-100 to-white rounded-2xl border border-orange-200 shadow-sm p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-2">
                <span className="w-1 h-3.5 bg-orange-300 rounded-full inline-block" />
                🌟 Today's Challenge
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">{todayChallenge}</p>
            </div>

            {/* Study group preview */}
            <div className="bg-gradient-to-br from-white to-zen-100 rounded-2xl border border-zen-200 shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-2">
                  <span className="w-1 h-3.5 bg-zen-400 rounded-full inline-block" />
                  👥 From the Community
                </p>
                <button
                  onClick={() => navigate('/study-groups')}
                  className="text-xs text-zen-600 font-medium hover:underline"
                >
                  See all
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {mockPosts.slice(0, 2).map((post) => (
                  <div key={post.id} className="border-l-2 border-zen-300 pl-3">
                    <p className="text-xs font-medium text-gray-700">
                      {post.author} · {post.module}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{post.message}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Journal */}
            <div className="bg-gradient-to-br from-white to-calm-100 rounded-2xl border border-calm-100 shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-2">
                  <span className="w-1 h-3.5 bg-calm-400 rounded-full inline-block" />
                  📓 One Good Thing
                </p>
                <button
                  onClick={() => navigate('/journal')}
                  className="text-xs text-zen-600 font-medium hover:underline"
                >
                  View journal
                </button>
              </div>
              <textarea
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                placeholder="What's one good thing about today?"
                rows={3}
                className="w-full text-sm text-gray-700 border border-gray-200 rounded-xl px-3 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-zen-300 placeholder:text-gray-400"
              />
              <div className="flex items-center justify-between mt-2">
                <span className={`text-xs text-green-600 font-medium transition-opacity ${journalSaved ? 'opacity-100' : 'opacity-0'}`}>
                  Saved ✓
                </span>
                <button
                  onClick={saveJournal}
                  disabled={!journalText.trim()}
                  className="bg-zen-500 hover:bg-zen-600 disabled:bg-gray-200 disabled:text-gray-400 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        <Navbar />
      </div>
    </>
  );
}
