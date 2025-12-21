import StatCard from "../components/admin/StatCard";

export default function AdminDashboard() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Quizzes" value={12} />
        <StatCard title="Total Students" value={120} />
        <StatCard title="Total Submissions" value={340} />
      </div>
    </div>
  );
}
