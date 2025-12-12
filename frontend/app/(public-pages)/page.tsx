"use client";

import api from "@/lib/axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("loading...");

  useEffect(() => {
    api
      .get("/api")
      .then((res) => setMessage(res.data))
      .catch(() => setMessage("⚠️ Backend is offline"));
  }, []);

  return (
    <div className="p-4">
      <p className="text-4xl text-center">Hello frontend</p>
      <p className="text-center">{message}</p>
    </div>
  );
}
