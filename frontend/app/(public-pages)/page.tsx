import api from "@/lib/axios";

export default async function Home() {
  const res = await api.get("/api");

  return (
    <div className="p-4">
      <p className="text-4xl text-center">Hello frontend</p>
      <p className="text-center">{res.data}</p>
    </div>
  );
}
