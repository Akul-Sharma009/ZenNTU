import { useState } from 'react';
import Navbar from '../components/Navbar';
import { mockStudents } from '../data/mockStudents';
import { mockPosts } from '../data/mockPosts';

const years = ['All Years', 'Year 1', 'Year 2', 'Year 3'];

export default function StudyGroups() {
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('All Years');
  const [requested, setRequested] = useState({});
  const [posts, setPosts] = useState(mockPosts);
  const [showModal, setShowModal] = useState(false);
  const [newModule, setNewModule] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const filteredStudents = mockStudents.filter((s) => {
    const matchesSearch =
      !search.trim() ||
      s.modules.some((m) => m.toLowerCase().includes(search.toLowerCase()));
    const matchesYear =
      yearFilter === 'All Years' || s.year === parseInt(yearFilter.split(' ')[1]);
    return matchesSearch && matchesYear;
  });

  function handlePost() {
    if (!newModule.trim() || !newMessage.trim()) return;
    const post = {
      id: Date.now(),
      author: sessionStorage.getItem('studentId') || 'You',
      module: newModule.trim().toUpperCase(),
      message: newMessage.trim(),
      time: 'Just now',
    };
    setPosts((prev) => [post, ...prev]);
    setNewModule('');
    setNewMessage('');
    setShowModal(false);
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="px-8 pt-6 pb-3 shrink-0">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Study 👥</h1>
      </div>

      <div className="flex-1 overflow-hidden px-8 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Left — Find Students */}
        <div className="flex flex-col gap-3 overflow-y-auto pb-2 min-h-0">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Study Groups</h2>
          <input
            type="text"
            placeholder="Search by module code (e.g. IE0005)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-zen-300"
          />
          <div className="flex gap-2 flex-wrap">
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setYearFilter(y)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  yearFilter === y
                    ? 'bg-zen-500 text-white'
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                {y}
              </button>
            ))}
          </div>
          {filteredStudents.map((s) => (
            <div key={s.id} className="bg-white rounded-2xl p-4 shadow-sm flex gap-4 items-start">
              <div className={`${s.color} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                {s.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800">{s.name}</p>
                <p className="text-xs text-gray-500 mb-2">Y{s.year} {s.course}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {s.modules.map((m) => (
                    <span key={m} className="bg-zen-100 text-zen-700 text-xs px-2 py-0.5 rounded-full font-medium">{m}</span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mb-3">{s.bio}</p>
                <button
                  onClick={() => setRequested((r) => ({ ...r, [s.id]: true }))}
                  disabled={requested[s.id]}
                  className={`text-xs font-medium px-3 py-1.5 rounded-xl transition-colors ${
                    requested[s.id] ? 'bg-gray-100 text-gray-400' : 'bg-zen-500 hover:bg-zen-600 text-white'
                  }`}
                >
                  {requested[s.id] ? '✓ Requested' : 'Send Friend Request'}
                </button>
              </div>
            </div>
          ))}
          {filteredStudents.length === 0 && (
            <p className="text-center text-gray-400 text-sm py-8">No students match your search.</p>
          )}
        </div>

        {/* Right — Discussion Board */}
        <div className="flex flex-col gap-3 overflow-y-auto pb-2 min-h-0">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Module Discussion Board</h2>
            <button
              onClick={() => setShowModal(true)}
              className="bg-zen-500 hover:bg-zen-600 text-white text-sm font-medium px-3 py-1.5 rounded-xl transition-colors"
            >
              + Create Post
            </button>
          </div>
          {posts.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium text-sm text-gray-800">{p.author}</span>
                <span className="bg-calm-100 text-calm-600 text-xs px-2 py-0.5 rounded-full font-medium">{p.module}</span>
                <span className="text-xs text-gray-400 ml-auto">{p.time}</span>
              </div>
              <p className="text-sm text-gray-700 mb-3">{p.message}</p>
              <button className="text-xs text-gray-400 hover:text-gray-600">💬 Reply</button>
            </div>
          ))}
        </div>
      </div>

      {/* Create Post Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Create Post</h3>
            <input
              type="text"
              placeholder="Module Code (e.g. IE0005)"
              value={newModule}
              onChange={(e) => setNewModule(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-zen-300"
            />
            <textarea
              placeholder="What's on your mind?"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              rows={4}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-zen-300 resize-none"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-200 text-gray-600 font-medium py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePost}
                className="flex-1 bg-zen-500 hover:bg-zen-600 text-white font-medium py-2.5 rounded-xl transition-colors"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      <Navbar />
    </div>
  );
}
