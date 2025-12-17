"use client";

import { useState } from "react";
import {
  Plus, Search, Edit, Trash2, Eye, Users, Clock, Trophy, TrendingUp,
  BookOpen, AlertCircle, Bell
} from "lucide-react";

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("quizzes");
  const [searchQuery, setSearchQuery] = useState("");

  const menuItems = [
    { id: "overview", label: "Overview", icon: Trophy },
    { id: "quizzes", label: "My Quizzes", icon: BookOpen },
    { id: "create", label: "Create Quiz", icon: Plus },
    { id: "submissions", label: "Submissions", icon: Users },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">QuizMaster</h2>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 text-left transition-colors ${
                  activeTab === item.id
                    ? "bg-purple-100 text-purple-700 border-r-4 border-purple-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage quizzes, track progress, and engage students</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search quizzes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 w-80 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                TE
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "quizzes" && <QuizzesTab searchQuery={searchQuery} />}
          {activeTab === "create" && <CreateQuizTab />}
          {activeTab === "submissions" && <SubmissionsTab />}
          {activeTab === "analytics" && <AnalyticsTab />}
        </main>

        {/* Floating Create Button */}
        {activeTab !== "create" && (
          <button
            onClick={() => setActiveTab("create")}
            className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Plus className="w-7 h-7" />
          </button>
        )}
      </div>
    </div>
  );
}

// Tabs as separate components (pure Tailwind)

function OverviewTab() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Quizzes", value: "24", change: "+3 this month", color: "purple" },
          { label: "Active Students", value: "186", change: "+12 new", color: "blue" },
          { label: "Submissions", value: "1,248", change: "92 pending", color: "green" },
          { label: "Avg. Score", value: "87.4%", change: "+4.2%", color: "orange" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <p className="text-gray-600 text-sm">{stat.label}</p>
            <p className="text-4xl font-bold text-gray-900 mt-2">{stat.value}</p>
            <p className="text-sm text-green-600 mt-3 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" /> {stat.change}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
            <AlertCircle className="w-6 h-6 text-red-500" /> Upcoming Deadlines
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl">
              <div>
                <p className="font-semibold">JavaScript Basics</p>
                <p className="text-sm text-gray-600">Due Dec 20, 2025</p>
              </div>
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">2 days left</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">JD</div>
              <div>
                <p className="font-medium">John Doe submitted Quiz #12</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuizzesTab({ searchQuery }: { searchQuery: string }) {
  const quizzes = [
    { title: "JavaScript Fundamentals", questions: 20, submissions: 45, status: "published", difficulty: "Beginner" },
    { title: "React Hooks Quiz", questions: 15, submissions: 32, status: "draft", difficulty: "Advanced" },
  ];

  const filtered = quizzes.filter(q => q.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">My Quizzes</h2>
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <BookOpen className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-500">No quizzes found</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((quiz, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold">{quiz.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    quiz.status === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                  }`}>
                    {quiz.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{quiz.questions} questions • {quiz.difficulty}</p>
                <div className="flex gap-3">
                  <button className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" /> View
                  </button>
                  <button className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
                    <Edit className="w-4 h-4" /> Edit
                  </button>
                  <button className="p-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Other tabs can be built similarly with pure Tailwind...

function CreateQuizTab() {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">Create New Quiz</h2>
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quiz Title</label>
            <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="e.g., JavaScript Fundamentals" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Brief description..."></textarea>
          </div>
          <div className="flex justify-end gap-4 mt-8">
            <button className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50">Save Draft</button>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:opacity-90">Next: Add Questions</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SubmissionsTab() {
  return <div className="text-2xl font-bold">Submissions Tab (Coming soon)</div>;
}

function AnalyticsTab() {
  return <div className="text-2xl font-bold">Analytics Tab (Coming soon)</div>;
}