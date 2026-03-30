import { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getResponse } from '../utils/chatbot';

const CHIPS = [
  "I'm feeling overwhelmed 😔",
  'Help me make a study plan 📅',
  "I can't focus at all",
  "I'm stressed about exams",
];

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  function handleSend(text) {
    const value = text ?? input;
    if (!value.trim() || typing) return;

    const userMessage = { role: 'user', content: value };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    const reply = getResponse(value);
    const words = reply.split(' ');
    setTyping(true);

    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          content: words.slice(0, i).join(' '),
        };
        return updated;
      });
      if (i >= words.length) {
        clearInterval(interval);
        setTyping(false);
      }
    }, 60);
  }

  return (
    <div className="min-h-screen flex flex-col pb-24">
      {/* Header */}
      <div className="px-8 pt-6 pb-3 shrink-0">
        <h1 className="text-2xl font-bold text-gray-800 text-center">ZenBot 🌿</h1>
        <p className="text-xs text-gray-400 text-center mt-0.5">Here to listen, always</p>
      </div>

      {/* Message thread */}
      <div className="flex-1 overflow-y-auto px-8 py-4 w-full max-w-4xl mx-auto flex flex-col gap-3">
        {messages.length === 0 && (
          <div className="flex flex-col gap-2 mt-4">
            <p className="text-sm text-gray-400 text-center mb-2">What's on your mind?</p>
            {CHIPS.map((chip) => (
              <button
                key={chip}
                onClick={() => handleSend(chip)}
                className="bg-white border border-gray-200 text-gray-700 text-sm px-4 py-3 rounded-2xl text-left hover:border-zen-300 hover:bg-zen-50 transition-colors shadow-sm"
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm whitespace-pre-line ${
                m.role === 'user'
                  ? 'bg-zen-500 text-white rounded-br-sm'
                  : 'bg-gray-100 text-gray-800 rounded-bl-sm'
              }`}
            >
              {m.content}
              {typing && i === messages.length - 1 && m.role === 'assistant' && (
                <span className="inline-block w-1.5 h-3.5 bg-gray-400 ml-0.5 align-middle animate-pulse rounded-sm" />
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="px-8 py-3 w-full max-w-4xl mx-auto">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            disabled={typing}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zen-300 disabled:opacity-50"
          />
          <button
            onClick={() => handleSend()}
            disabled={typing}
            className="bg-zen-500 hover:bg-zen-600 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-colors disabled:opacity-50"
          >
            Send
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          ZenBot is an AI and not a substitute for professional help.
        </p>
      </div>

      <Navbar />
    </div>
  );
}
