"use client";

import Header from "../components/admin/Header";
import Sidebar from "../components/admin/Sidebar";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
  allowedRoles = ["admin"],
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read user from localStorage
    const user = JSON.parse(localStorage.getItem("user") || "null");

    // If not logged in and not on login page → redirect to login
    if (!user && pathname !== "/admin/login") {
      router.replace("/admin/login");
      return;
    }

    // If logged in as admin and on login page → redirect to admin dashboard
    if (user?.role === "admin" && pathname === "/admin/login") {
      router.replace("/admin");
      return;
    }

    // Stop loading if checks passed
    setLoading(false);
  }, [pathname, router]);

  // Prevent rendering layout while checking auth
  if (loading) return null;

  // Login page should render children only (no sidebar/header)
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Admin pages
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
