import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("learnsphere_user") || "null");
  } catch (e) {
    user = null;
  }

  const onLogout = () => {
    localStorage.removeItem("learnsphere_user");
    // keep profile form data as-is, but remove studentName if you want a full clear
    navigate("/");
    // reload to update UI immediately
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500 shadow-[0_0_24px_rgba(66,127,255,0.6)]" />
          <span className="font-bold tracking-tight">
            Learn
            <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Sphere
            </span>
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* show Home only when NOT logged in */}
          {!user && (
            <Link
              to="/"
              className="px-3 py-2 rounded-lg font-semibold text-slate-100 border border-white/15 bg-white/5 hover:bg-white/10 transition"
            >
              Home
            </Link>
          )}

          {user ? (
            <>
              <Link
                to="/dashboard"
                title="Dashboard"
                className="flex items-center gap-2 px-3 py-2 rounded-lg font-semibold text-white bg-gradient-to-tr from-indigo-600 to-blue-500 shadow-lg hover:shadow-xl transition"
              >
                {/* simple grid icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3 3h4v4H3V3zM7 3h4v4H7V3zM11 3h6v4h-6V3zM3 7h4v4H3V7zM7 7h4v4H7V7zM11 7h6v4h-6V7zM3 11h4v6H3v-6zM7 11h4v6H7v-6zM11 11h6v6h-6v-6z" />
                </svg>
                <span className="hidden sm:inline">Dashboard</span>
              </Link>

              <Link
                to="/profile"
                title="Profile"
                className="flex items-center gap-2 px-3 py-2 rounded-lg font-semibold text-white bg-gradient-to-tr from-indigo-600 to-blue-500 shadow-lg hover:shadow-xl transition"
              >
                {/* user icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a5 5 0 100-10 5 5 0 000 10zm-7 7a7 7 0 0114 0H3z" />
                </svg>
                <span className="hidden sm:inline">
                  {user.name || "Profile"}
                </span>
              </Link>

              <button
                onClick={onLogout}
                className="px-3 py-2 rounded-lg font-semibold text-[var(--text)] border border-[var(--border)] bg-[var(--card)]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="px-3 py-2 rounded-lg font-semibold text-white bg-gradient-to-tr from-indigo-600 to-blue-500 shadow-lg hover:shadow-xl transition"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="px-3 py-2 rounded-lg font-semibold border border-[var(--border)] bg-[var(--card)] text-[var(--text)] hover:brightness-110 transition"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
