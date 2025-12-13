// app/page.tsx
"use client";
import Header from "@/components/ui/header";
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
    <div>
      <Header />
      <div className="p-4 text-center">
        <h1 className="text-4xl">Hello Frontend</h1>
        <p>{message}</p>
      </div>
    </div>
  );
}
