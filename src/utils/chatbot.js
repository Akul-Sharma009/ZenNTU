// Hardcoded responses for the 4 demo prompt chips.
// Keys must exactly match chip labels (lowercased + trimmed).
export const HARDCODED_RESPONSES = {
  "i dont feel like studying":
    "That feeling is completely normal — your brain needs rest too. Try starting with just 5 minutes on the easiest task you have. Often, getting started is the hardest part, and momentum builds from there. If you're burnt out, a short walk or a snack break might be all you need. 🌿",
  "i'm feeling overwhelmed 😔":
    "I hear you — exam season can be really tough. Let's break it down together. What's weighing on you the most right now? Sometimes just naming it helps. 🌿",
  "help me make a study plan 📅":
    "Sure! A simple plan: break your subjects into daily chunks, use 25-min Pomodoro sessions, and schedule short breaks. Want me to help you map out a specific week?",
  "i can't focus at all":
    "That's completely normal under stress. Try this: close all tabs, set a 5-minute timer, and just start — don't aim to finish, just begin. The focus usually follows. 🍅",
  "i'm stressed about exams":
    "Exam stress is real, and you're not alone. Remember: you've prepared more than you think. Try the Pomodoro timer to tackle one topic at a time. You've got this 💪",
};

const FALLBACK_RESPONSE =
  "I'm best at responding to the suggested prompts above — try one of those! 🌿";

const CRISIS_KEYWORDS = ["hurt myself", "end it", "suicide", "don't want to be here", "can't go on"];

const CRISIS_RESPONSE =
  "I'm really concerned about you. Please reach out for help right now:\n\n" +
  "🆘 Samaritans of Singapore (SOS): 1800 221 4444 (24 hours)\n" +
  "🏥 IMH Crisis Helpline: 6389 2222 (24 hours)\n\n" +
  "You are not alone. Please talk to someone. 💛";

export function getResponse(userInput) {
  const lower = userInput.toLowerCase().trim();

  // Always check for crisis keywords first
  if (CRISIS_KEYWORDS.some(kw => lower.includes(kw))) {
    return CRISIS_RESPONSE;
  }

  // Return hardcoded response if chip matches
  if (HARDCODED_RESPONSES[lower]) {
    return HARDCODED_RESPONSES[lower];
  }

  // Friendly fallback for everything else
  return FALLBACK_RESPONSE;
}
