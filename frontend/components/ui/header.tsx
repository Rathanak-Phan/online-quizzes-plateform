"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const [open, setOpen] = useState(false); // mobile menu
  const [user, setUser] = useState<{
    id: number;
    name: string;
    role: string;
  } | null>(null);
  const router = useRouter();

  // Update user state on login/logout
  useEffect(() => {
    const updateUser = () => {
      const storedUser = JSON.parse(
        localStorage.getItem("user") || sessionStorage.getItem("user") || "null"
      );
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("logout"));
    router.push("/login");
  };

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          <Link href="/">Online-Quiz</Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link href="/quizzes" className="hover:text-blue-600">
            Quizzes
          </Link>
          <Link href="/categories" className="hover:text-blue-600">
            Categories
          </Link>
          <Link href="/leaderboard" className="hover:text-blue-600">
            Leaderboard
          </Link>
        </nav>

        {/* Buttons */}
        <div className="hidden md:flex gap-4">
          {!user ? (
            <>
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="px-4 py-2 text-gray-700">
                Hello, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white px-6 pb-6 shadow-lg">
          <nav className="flex flex-col gap-4 text-gray-700 font-medium">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link href="/quizzes" className="hover:text-blue-600">
              Quizzes
            </Link>
            <Link href="/categories" className="hover:text-blue-600">
              Categories
            </Link>
            <Link href="/leaderboard" className="hover:text-blue-600">
              Leaderboard
            </Link>
          </nav>

          <div className="mt-4 flex flex-col gap-4">
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="w-full text-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="w-full text-center px-4 py-2 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <span className="text-center">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="w-full text-center px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
