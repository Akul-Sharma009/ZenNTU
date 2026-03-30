import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import MoodPopup from './components/MoodPopup';
import Login from './pages/Login';
import Home from './pages/Home';
import StudyGroups from './pages/StudyGroups';
import Pomodoro from './pages/Pomodoro';
import Chat from './pages/Chat';
import Resources from './pages/Resources';
import Journal from './pages/Journal';

function AppRoutes() {
  const location = useLocation();
  const [showMoodPopup, setShowMoodPopup] = useState(false);

  useEffect(() => {
    const isLoggedIn = !!sessionStorage.getItem('studentId');
    const moodChecked = sessionStorage.getItem('moodChecked') === 'true';
    if (isLoggedIn && !moodChecked && location.pathname !== '/') {
      setShowMoodPopup(true);
    }
  }, [location.pathname]);

  return (
    <>
      {showMoodPopup && (
        <MoodPopup onClose={() => setShowMoodPopup(false)} />
      )}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/study-groups" element={<StudyGroups />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/journal" element={<Journal />} />
      </Routes>
    </>
  );
}

export default function App() {
  return <AppRoutes />;
}
