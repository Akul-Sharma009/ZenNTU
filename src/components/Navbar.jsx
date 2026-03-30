import { NavLink } from 'react-router-dom';
import { Home, Users, Timer, MessageCircle, BookOpen } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Home', to: '/home' },
  { icon: Users, label: 'Study', to: '/study-groups' },
  { icon: Timer, label: 'Focus', to: '/pomodoro' },
  { icon: MessageCircle, label: 'ZenBot', to: '/chat' },
  { icon: BookOpen, label: 'Resources', to: '/resources' },
];

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/70 backdrop-blur-lg border-t border-zen-200/40 z-50 shadow-[0_-4px_20px_rgba(34,197,94,0.08)]">
      <div className="flex justify-around items-center h-16 px-8">
        {navItems.map(({ icon: Icon, label, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors ${
                isActive ? 'text-zen-600' : 'text-gray-400'
              }`
            }
          >
            <Icon size={22} />
            <span className="text-xs font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
