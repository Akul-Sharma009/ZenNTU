import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';

const hardcodedEntries = [
  {
    date: '2026-03-28',
    text: "Tutorial was rough but I didn't completely blank when the prof asked me something. Small win. Also managed to grab a seat at the library before 9am which basically never happens.",
  },
  {
    date: '2026-03-26',
    text: "Submitted the CZ1115 assignment at 11:58pm. Not my best work but it's done. Going to actually sleep before midnight for once.",
  },
  {
    date: '2026-03-24',
    text: "Had lunch with Priya at the canteen and we just talked for like an hour. No studying, no phones. Honestly needed that more than I realised.",
  },
  {
    date: '2026-03-21',
    text: "Couldn't focus at all today. Wasted most of the afternoon staring at my laptop. But I made myself go for a walk around the school at sunset and it helped a little. Sometimes just moving is enough.",
  },
  {
    date: '2026-03-19',
    text: "Midterm results came back. Did better than I expected honestly. I keep forgetting I'm allowed to feel good about that.",
  },
];

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-SG', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function Journal() {
  const navigate = useNavigate();
  const saved = JSON.parse(localStorage.getItem('journalEntries') || '[]');
  const allEntries = [...saved, ...hardcodedEntries].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="min-h-screen pb-24">
      <div className="max-w-3xl mx-auto px-8 pt-8">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate('/home')}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">My Journal 📓</h1>
        </div>

        {allEntries.length === 0 ? (
          <p className="text-center text-gray-400 text-sm mt-16">
            No entries yet. Write your first one from the home page.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {allEntries.map((entry, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">
                <p className="text-xs text-gray-400 font-medium mb-2">
                  {formatDate(entry.date)}
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">{entry.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Navbar />
    </div>
  );
}
