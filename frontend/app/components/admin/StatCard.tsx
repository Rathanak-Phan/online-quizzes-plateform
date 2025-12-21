interface StatCardProps {
  title: string;
  value: number;
}

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="bg-white p-5 rounded shadow text-center">
      <p className="text-gray-500">{title}</p>
      <h3 className="text-3xl font-bold">{value}</h3>
    </div>
  );
}
