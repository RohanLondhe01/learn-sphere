
import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500 shadow-[0_0_24px_rgba(66,127,255,0.6)]" />
          <span className="font-bold tracking-tight">
            Learn
            <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">Sphere</span>
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="px-3 py-2 rounded-lg font-semibold text-slate-100 border border-white/15 bg-white/5 hover:bg-white/10 transition"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="px-3 py-2 rounded-lg font-semibold text-white bg-gradient-to-tr from-indigo-600 to-blue-500 shadow-lg hover:shadow-xl transition"
          >
            Dashboard
          </Link>
          <Link
            to="/profile"
            className="px-3 py-2 rounded-lg font-semibold text-white bg-gradient-to-tr from-indigo-600 to-blue-500 shadow-lg hover:shadow-xl transition"
          >
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};
