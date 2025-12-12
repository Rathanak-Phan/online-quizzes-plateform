"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          <Link href="/">Online-Quiz</Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/quizzes" className="hover:text-blue-600">Quizzes</Link>
          <Link href="/categories" className="hover:text-blue-600">Categories</Link>
          <Link href="/leaderboard" className="hover:text-blue-600">Leaderboard</Link>
        </nav>

        {/* Buttons */}
        <div className="hidden md:flex gap-4">
          <a
            href="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            Login
          </a>
          <a
            href="/register"
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50"
          >
            Register
          </a>
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white px-6 pb-6 shadow-lg">
          <nav className="flex flex-col gap-4 text-gray-700 font-medium">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/quizzes" className="hover:text-blue-600">Quizzes</Link>
            <Link href="/categories" className="hover:text-blue-600">Categories</Link>
            <Link href="/leaderboard" className="hover:text-blue-600">Leaderboard</Link>
          </nav>

          <div className="mt-4 flex flex-col gap-4">
            <a
              href="/login"
              className="w-full text-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            >
              Login
            </a>
            <a
              href="/register"
              className="w-full text-center px-4 py-2 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50"
            >
              Register
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
