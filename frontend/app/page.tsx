// app/page.tsx
"use client";

import Header from "@/components/ui/header";
import api from "@/lib/axios";
import { useEffect, useState } from "react";

export default function RootHomePage() {
  const [message, setMessage] = useState("loading...");
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  // Check backend
  useEffect(() => {
    api
      .get("/api")
      .then((res) => setMessage(res.data))
      .catch(() => setMessage("⚠️ Backend is offline..."));
  }, []);

  // Load logged-in user and listen for login/logout events
  useEffect(() => {
    const updateUser = () => {
      const storedUser =
        JSON.parse(localStorage.getItem("user") || "null") ||
        JSON.parse(sessionStorage.getItem("user") || "null");
      setUser(storedUser);
    };

    updateUser(); // initial check
    window.addEventListener("login", updateUser);
    window.addEventListener("logout", updateUser);

    return () => {
      window.removeEventListener("login", updateUser);
      window.removeEventListener("logout", updateUser);
    };
  }, []);

  return (
    <div
      className={`transition-opacity duration-500 ${
        loggingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <Header />
      <div className="p-4 text-center">
        <h1 className="text-4xl">Hello Frontend</h1>
        <p>{message}</p>

        <div className="text-4xl my-5">
          {user ? (
            <p className="text-blue-400">Welcome, {user.name}!</p>
          ) : (
            <p className="text-red-500">Please login to see your name...</p>
          )}
        </div>
      </div>
    </div>
  );
}
