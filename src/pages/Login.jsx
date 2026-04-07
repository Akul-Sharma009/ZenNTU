import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    if (studentId.trim() && password.trim()) {
      sessionStorage.setItem('studentId', studentId.trim());
      navigate('/home');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-zen-300/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-calm-300/40 rounded-full blur-3xl pointer-events-none" />

      <div className="bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl shadow-xl p-8 w-full max-w-sm relative">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-zen-600">NTUZen</h1>
          <p className="text-gray-500 mt-2 font-medium">Say Bye to Str*ss</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zen-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zen-300"
          />
          <button
            type="submit"
            className="bg-zen-500 hover:bg-zen-600 text-white font-semibold py-3 rounded-xl transition-colors mt-2"
          >
            Login with NTU
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-4">
          Demo mode — any credentials work
        </p>
      </div>
    </div>
  );
}
