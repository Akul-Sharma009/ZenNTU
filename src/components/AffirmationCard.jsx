import { affirmations } from '../data/affirmations';

export default function AffirmationCard() {
  const today = new Date().getDate();
  const affirmation = affirmations[today % affirmations.length];

  return (
    <div className="bg-gradient-to-r from-zen-100 to-calm-100 rounded-2xl p-4 shadow-md">
      <p className="text-xs font-semibold text-zen-700 uppercase tracking-wide mb-2 flex items-center gap-2">
        <span className="w-1 h-3.5 bg-zen-500 rounded-full inline-block" />
        ✨ Daily Affirmation
      </p>
      <p className="text-gray-700 italic text-sm leading-relaxed">{affirmation}</p>
    </div>
  );
}
