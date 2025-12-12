"use client";

import PublicLayout from "./layout";
import api from "@/lib/axios";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [message, setMessage] = useState("loading...");

  useEffect(() => {
    api
      .get("/api")
      .then((res) => setMessage(res.data))
      .catch(() => setMessage("⚠️ Backend is offline..."));
  }, []);

  return (
    <PublicLayout>
      <div>
        {/* <h1 className="text-4xl">Hello Frontend</h1>
        <p>{message}</p> */}
      </div>
    </PublicLayout>
  );
}
