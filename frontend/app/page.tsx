"use client";

import PublicLayout from "./(public-pages)/layout"; // Wrap homepage with your PublicLayout
import api from "@/lib/axios";
import { useEffect, useState } from "react";

export default function RootHomePage() {
  const [message, setMessage] = useState("loading...");

  useEffect(() => {
    api
      .get("/api")
      .then((res) => setMessage(res.data))
      .catch(() => setMessage("⚠️ Backend is offline..."));
  }, []);

  return (
    <PublicLayout>
      <div className="p-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Online Quizzes!</h1>
        <p className="text-lg">{message}</p>
      </div>
    </PublicLayout>
  );
}
