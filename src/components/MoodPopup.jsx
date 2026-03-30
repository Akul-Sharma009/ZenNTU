import { useState } from 'react';

const moods = [
  { emoji: '😊', label: 'Great', color: '#22c55e', message: 'Wonderful! Keep it up 🌟' },
  { emoji: '😐', label: 'Okay', color: '#eab308', message: "That's alright. Take it one step at a time." },
  { emoji: '😔', label: 'Meh', color: '#f97316', message: "It's okay to feel that way. ZenBot is here if you need to talk." },
  { emoji: '😤', label: 'Stressed', color: '#ef4444', message: "Let's do a Pomodoro session to regain focus." },
  { emoji: '😰', label: 'Anxious', color: '#8b5cf6', message: 'Take a breath. Check out our resources or chat with ZenBot.' },
];

export default function MoodPopup({ onClose }) {
  const [selected, setSelected] = useState(null);

  function handleSelect(mood) {
    setSelected(mood);
    sessionStorage.setItem('userMood', mood.label);
  }

  function handleContinue() {
    if (selected) {
      sessionStorage.setItem('moodChecked', 'true');
      const history = JSON.parse(localStorage.getItem('moodHistory') || '[]');
      history.push({ mood: selected.label, timestamp: new Date().toISOString() });
      localStorage.setItem('moodHistory', JSON.stringify(history));
      window.dispatchEvent(new CustomEvent('moodUpdated'));
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-5">
          How are you feeling today? 🌤️
        </h2>

        <div className="flex justify-around mb-5">
          {moods.map((mood) => (
            <button
              key={mood.label}
              onClick={() => handleSelect(mood)}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                selected?.label === mood.label
                  ? 'bg-gray-100 scale-110 ring-2 ring-offset-1'
                  : 'hover:bg-gray-50'
              }`}
              style={selected?.label === mood.label ? { ringColor: mood.color } : {}}
            >
              <span className="text-3xl">{mood.emoji}</span>
              <span className="text-xs text-gray-600 font-medium">{mood.label}</span>
            </button>
          ))}
        </div>

        {selected && (
          <p className="text-center text-sm text-gray-600 mb-4 bg-gray-50 rounded-xl p-3">
            {selected.message}
          </p>
        )}

        <button
          onClick={handleContinue}
          disabled={!selected}
          className="w-full bg-zen-500 hover:bg-zen-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-medium py-2.5 rounded-xl transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
