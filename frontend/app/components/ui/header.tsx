"use client";

import { useState, useEffect } from "react";
import { Menu, X, Bell } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Notification from "./notification";

export default function Header() {
  const [open, setOpen] = useState(false); // mobile menu
  const [user, setUser] = useState<{
    id: number;
    name: string;
    role: string;
    profileImage?: string;
  } | null>(null);
  const [openDropdown, setOpenDropdown] = useState(false); // dropdown menu
  const router = useRouter();

  const handleNotifications = () => {
    alert("Notifications clicked!");
  };

  // Update user state on login/logout
  useEffect(() => {
    const updateUser = () => {
      const storedUser = JSON.parse(
        localStorage.getItem("user") || sessionStorage.getItem("user") || "null"
      );
      setUser(storedUser);
    };

    updateUser();
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
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    window.dispatchEvent(new Event("logout"));
    router.push("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".dropdown")) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white shadow-sm fixed z-100">
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

        {/* Desktop Profile / Auth Buttons */}
        <div className="hidden md:flex items-center gap-4 relative dropdown">
          <Notification />

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
            <div className="relative">
              {/* Profile Image */}
              <img
                src={user.profileImage || "frontend/public/logo.png"}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-600 cursor-pointer"
                onClick={() => setOpenDropdown(!openDropdown)}
              />

              {/* Dropdown Menu */}
              {openDropdown && (
                <div className="absolute right-0 mt-2 w-44 bg-white shadow-xl rounded-lg flex flex-col z-50 border border-gray-100 overflow-hidden">
                  {/* Profile Link */}
                  <Link
                    href="/profile"
                    className="px-4 py-3 hover:bg-blue-50 text-gray-800 text-sm font-medium transition-colors duration-200"
                  >
                    Profile
                  </Link>

                  {/* Settings Link */}
                  <Link
                    href="/settings"
                    className="px-4 py-3 hover:bg-blue-50 text-gray-800 text-sm font-medium transition-colors duration-200"
                  >
                    Settings
                  </Link>

                  {/* Divider */}
                  <div className="border-t border-gray-100"></div>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="px-4 py-3 text-red-600 hover:bg-red-50 text-sm font-medium transition-colors duration-200 text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
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

          {/* Mobile Profile Dropdown */}
          {user && (
            <div className="mt-4 flex flex-col items-center gap-2 relative dropdown">
              <img
                src={user.profileImage || "/default-profile.png"}
                alt={user.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-blue-600 cursor-pointer"
                onClick={() => setOpenDropdown(!openDropdown)}
              />

              {openDropdown && (
                <div className="absolute top-16 right-0 w-40 bg-white shadow-lg rounded-xl flex flex-col z-50">
                  <Link
                    href="/profile"
                    className="px-4 py-2 hover:bg-blue-50 text-gray-700 rounded-t-xl"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="px-4 py-2 hover:bg-blue-50 text-gray-700"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-b-xl text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
}
