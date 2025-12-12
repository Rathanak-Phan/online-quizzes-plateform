// app/page.tsx
"use client";

import PublicLayout from "./(public-pages)/layout";
import api from "@/lib/axios";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [message, setMessage] = useState("loading...");

  useEffect(() => {
    api
      .get("/api")
      .then((res) => setMessage(res.data))
      .catch(() => setMessage("⚠️ Backend is offline"));

  }, []);

  return (
    <PublicLayout>
      <div className="p-4 text-center">
        <h1 className="text-4xl">Hello Frontend</h1>
        <p>{message}</p>
      </div>
    </PublicLayout>
  );
}
