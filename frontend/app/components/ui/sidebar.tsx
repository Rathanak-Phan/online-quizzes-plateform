"use client";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const tabs = [
    { id: "quizzes", label: "📋 My Quizzes" },
    { id: "create", label: "➕ Create Quiz" },
    { id: "submissions", label: "📊 Submissions" },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white p-6">
      <h1 className="text-xl font-bold mb-6">Teacher Dashboard</h1>
      <ul className="space-y-2">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`cursor-pointer p-2 rounded ${
              activeTab === tab.id ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
