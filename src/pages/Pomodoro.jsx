import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';

const MODES = {
  Focus: 25 * 60,
  'Short Break': 5 * 60,
  'Long Break': 15 * 60,
  Custom: null,
};

function playBeep() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.value = 440;
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.8);
}

export default function Pomodoro() {
  const [mode, setMode] = useState('Focus');
  const [customMinutes, setCustomMinutes] = useState(30);
  const [timeLeft, setTimeLeft] = useState(MODES['Focus']);
  const [total, setTotal] = useState(MODES['Focus']);
  const [running, setRunning] = useState(false);
  const [session, setSession] = useState(1);
  const intervalRef = useRef(null);

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / total) * circumference;

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            playBeep();
            handleTimerEnd();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, mode]);

  function handleTimerEnd() {
    setSession((s) => {
      const next = s + 1;
      if (mode === 'Focus') {
        if (next > 4) { switchMode('Long Break'); return 1; }
        else { switchMode('Short Break'); return next; }
      } else {
        switchMode('Focus');
        return s;
      }
    });
  }

  function switchMode(newMode) {
    setRunning(false);
    setMode(newMode);
    if (newMode === 'Custom') {
      const t = customMinutes * 60;
      setTimeLeft(t);
      setTotal(t);
    } else {
      const t = MODES[newMode];
      setTimeLeft(t);
      setTotal(t);
    }
  }

  function applyCustom() {
    const mins = Math.max(1, Math.min(180, customMinutes));
    const t = mins * 60;
    setTimeLeft(t);
    setTotal(t);
    setRunning(false);
  }

  function handleReset() {
    setRunning(false);
    setTimeLeft(total);
  }

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  const minutes = pad(Math.floor(timeLeft / 60));
  const seconds = pad(timeLeft % 60);
  const isFocus = mode === 'Focus' || mode === 'Custom';

  return (
    <div className="min-h-screen pb-24">
      <div className="px-8 pt-6 pb-3">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Focus Timer ⏱️</h1>
      </div>
      <div className="px-8 flex flex-col items-center">

        {/* Mode toggle */}
        <div className="flex gap-2 mb-6 bg-white rounded-2xl p-1 shadow-sm flex-wrap justify-center">
          {Object.keys(MODES).map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                mode === m ? 'bg-zen-500 text-white' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Custom duration input */}
        {mode === 'Custom' && (
          <div className="flex items-center gap-3 mb-6">
            <input
              type="number"
              min={1}
              max={180}
              value={customMinutes}
              onChange={(e) => setCustomMinutes(Number(e.target.value))}
              className="w-20 border border-gray-200 rounded-xl px-3 py-2 text-center text-sm focus:outline-none focus:ring-2 focus:ring-zen-300"
            />
            <span className="text-sm text-gray-500">minutes</span>
            <button
              onClick={applyCustom}
              className="bg-zen-500 hover:bg-zen-600 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
            >
              Set
            </button>
          </div>
        )}

        {/* SVG circular timer */}
        <div className="relative mb-8">
          <svg width="220" height="220" className="-rotate-90">
            <circle cx="110" cy="110" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="12" />
            <circle
              cx="110"
              cy="110"
              r={radius}
              fill="none"
              stroke={isFocus ? '#22c55e' : '#3b82f6'}
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-gray-800 tabular-nums">
              {minutes}:{seconds}
            </span>
            <span className="text-sm text-gray-500 mt-1">{mode}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setRunning((r) => !r)}
            className="bg-zen-500 hover:bg-zen-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
          >
            {running ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={handleReset}
            className="border border-gray-200 text-gray-600 font-medium px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Reset
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-2">Session {session} of 4</p>
        <p className="text-sm text-gray-500 italic">
          {isFocus ? "Stay focused. You're doing great 💪" : "Take a breath. You've earned it 🌿"}
        </p>
      </div>
      <Navbar />
    </div>
  );
}
