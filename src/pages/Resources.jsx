import Navbar from '../components/Navbar';
import { hotlines } from '../data/hotlines';

const categories = ['General', 'Women', 'Psychiatric Help', 'Family', 'Sexual Issues'];

const articles = [
  {
    title: 'Breathing Exercises for Stress',
    desc: 'Simple, evidence-backed breathing exercises you can do anywhere to calm your nervous system before and during exams.',
    url: 'https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/breathing-exercises-for-stress/',
  },
  {
    title: '14 Great Study Habits for a Lifetime',
    desc: 'Practical tips on structuring your day, using active recall, and avoiding burnout during heavy study periods.',
    url: 'https://www.psychologytoday.com/us/blog/open-gently/202305/14-great-study-habits-for-a-lifetime',
  },
  {
    title: 'How to Seek Help for a Mental Health Problem',
    desc: "It's okay to not be okay. Learn how to recognise when you need support and how to take that first step.",
    url: 'https://www.mind.org.uk/information-support/guides-to-support-and-services/seeking-help-for-a-mental-health-problem/where-to-start/',
  },
];

export default function Resources() {
  return (
    <div className="min-h-screen pb-24">
      <div className="px-8 pt-6 pb-3">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Resources 📚</h1>
      </div>

      <div className="px-8 pb-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

        {/* Left — NTU Resources + Articles */}
        <div className="flex flex-col gap-5">
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">NTU Resources</h2>
            <div className="flex flex-col gap-3">
              <a href="https://www.ntu.edu.sg/spms/students/peer-tutoring" target="_blank" rel="noreferrer"
                className="bg-white rounded-2xl p-4 shadow-sm flex justify-between items-center hover:shadow-md transition-shadow">
                <div>
                  <p className="font-medium text-gray-800">NTU Peer Tutoring</p>
                  <p className="text-xs text-gray-500 mt-0.5">Get help from senior students</p>
                </div>
                <span className="text-zen-500 text-sm font-medium">→</span>
              </a>
              <a href="https://entuedu.sharepoint.com/sites/Student/dept/uwo/SitePages/Counselling%20Services.aspx" target="_blank" rel="noreferrer"
                className="bg-white rounded-2xl p-4 shadow-sm flex justify-between items-center hover:shadow-md transition-shadow">
                <div>
                  <p className="font-medium text-gray-800">NTU Student Wellbeing</p>
                  <p className="text-xs text-gray-500 mt-0.5">Counselling, mental health & support services</p>
                </div>
                <span className="text-zen-500 text-sm font-medium">→</span>
              </a>
              <a href="https://quizlet.com" target="_blank" rel="noreferrer"
                className="bg-white rounded-2xl p-4 shadow-sm flex justify-between items-center hover:shadow-md transition-shadow">
                <div>
                  <p className="font-medium text-gray-800">Cue Cards / Online Quizzes</p>
                  <p className="text-xs text-gray-500 mt-0.5">Flashcards and practice quizzes to reinforce learning before exams.</p>
                </div>
                <span className="text-zen-500 text-sm font-medium">→</span>
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Self-Help Articles</h2>
            <div className="flex flex-col gap-3">
              {articles.map((a) => (
                <div key={a.title} className="bg-white rounded-2xl p-4 shadow-sm">
                  <p className="font-medium text-gray-800 mb-1">{a.title}</p>
                  <p className="text-xs text-gray-500 mb-3">{a.desc}</p>
                  <a href={a.url} target="_blank" rel="noreferrer" className="text-xs text-zen-600 font-medium hover:underline">
                    Read More
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Hotlines */}
        <div className="flex flex-col">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Mental Health Hotlines</h2>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Organisation</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Tel</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Hours</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => {
                  const rows = hotlines.filter((h) => h.category === cat);
                  return [
                    <tr key={cat} className="bg-zen-100">
                      <td colSpan={3} className="px-4 py-2 font-semibold text-zen-700 text-xs uppercase tracking-wide">{cat}</td>
                    </tr>,
                    ...rows.map((h) => (
                      <tr key={h.org} className="border-t border-gray-50 hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-800">{h.org}</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{h.tel}</td>
                        <td className="px-4 py-3 text-gray-500">{h.hours}</td>
                      </tr>
                    )),
                  ];
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
}
