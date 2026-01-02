import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// IMPORTANT: This version keeps your theme tokens: bg-[var(--card)], text-[var(--text)], border-[var(--border)]
// It removes hover-expand jitter and uses a fixed width on desktop for better alignment.

export default function Sidebar() {
  // Persisted collapse (manual toggle). Default: expanded (false) for stable desktop alignment.
  const [collapsed, setCollapsed] = useState(() => {
    try {
      const raw = localStorage.getItem("sidebar:collapsed");
      return raw === "true";
    } catch {
      return false;
    }
  });

  // Courses submenu
  const [coursesOpen, setCoursesOpen] = useState(() => {
    try {
      return localStorage.getItem("sidebar:coursesOpen") === "true";
    } catch {
      return true; // open by default to show structure
    }
  });

  // Mobile panel
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("sidebar:collapsed", collapsed ? "true" : "false");
    } catch {}
  }, [collapsed]);

  useEffect(() => {
    try {
      localStorage.setItem(
        "sidebar:coursesOpen",
        coursesOpen ? "true" : "false"
      );
    } catch {}
  }, [coursesOpen]);

  // Base link classes (keep simple & consistent)
  const linkBase =
    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const linkActive = "bg-white/10 text-[var(--text)]"; // subtle active; adjust per theme if you have utility class
  const linkInactive = "text-[var(--text)] hover:bg-white/5";

  const navClass = ({ isActive }) =>
    `${linkBase} ${isActive ? linkActive : linkInactive}`;

  // Simple, crisp icons (reuse your current ones; kept sizes consistent)
  const Icon = ({ path, className = "h-5 w-5" }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );

  const ICONS = {
    courses: "M3 13h8V3H3v10zM3 21h8v-6H3v6zM13 21h8V11h-8v10zM13 3v6h8V3h-8z",
    quizzes: "M12 2l3 6h6l-5 4 2 6-6-3-6 3 2-6L3 8h6l3-6z",
    assignments:
      "M6 2h8a2 2 0 012 2v16l-4-2-4 2V4a2 2 0 012-2zM8 6h6v2H8zM8 10h8v2H8z",
    community:
      "M12 12a5 5 0 100-10 5 5 0 000 10zM2 20c0-3.3 4.5-5 10-5s10 1.7 10 5v1H2v-1z",
    chevronRight: "M8 5v14l11-7L8 5z",
  };

  // Fixed widths: stable alignment
  const DESKTOP_WIDTH_EXPANDED = "w-64"; // ~256px
  const DESKTOP_WIDTH_COLLAPSED = "w-16"; // icon-only
  const MOBILE_WIDTH = "w-72"; // overlay

  // Helper: label visibility in collapsed mode
  const Label = ({ children }) => (
    <span className={`truncate ${collapsed ? "hidden" : "block"}`}>
      {children}
    </span>
  );

  return (
    <>
      {/* Mobile toggle (only shows on small screens) */}
      <div className="md:hidden p-2">
        <button
          aria-label="Open sidebar"
          onClick={() => setMobileOpen((s) => !s)}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-[var(--card)] border border-[var(--border)] text-[var(--text)]"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 6h18M3 12h18M3 18h18"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-sm">Menu</span>
        </button>
      </div>

      {/* Desktop sidebar (stable width; no hover expansion) */}
      <aside
        role="complementary"
        aria-label="Sidebar Navigation"
        className={`hidden md:flex flex-col h-screen p-3 border-r border-[var(--border)] bg-[var(--card)] text-[var(--text)] transition-all duration-200 overflow-hidden ${
          collapsed ? DESKTOP_WIDTH_COLLAPSED : DESKTOP_WIDTH_EXPANDED
        }`}
      >
        {/* Header row: brand + collapse toggle */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            {/* Brand mark */}
            <span className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500 shadow-sm" />
            {/* Brand text (hide when collapsed) */}
            {!collapsed && (
              <div className="text-sm font-bold tracking-tight">
                <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
                  LearnSphere
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => setCollapsed((s) => !s)}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="p-1 rounded-md hover:bg-white/5"
          >
            {/* Use a simple chevron for consistency */}
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex-1 overflow-auto" aria-label="Main navigation">
          <ul className="space-y-1">
            {/* Courses (parent) */}
            <li>
              <button
                onClick={() => setCoursesOpen((s) => !s)}
                className={`w-full ${linkBase} ${linkInactive} justify-between`}
                aria-expanded={coursesOpen}
              >
                <span className="flex items-center gap-3">
                  <Icon path={ICONS.courses} />
                  <Label>Courses</Label>
                </span>
                {/* Rotate chevron when open; hide when collapsed to reduce clutter */}
                {!collapsed && (
                  <svg
                    className={`h-4 w-4 transform transition-transform ${
                      coursesOpen ? "rotate-90" : "rotate-0"
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path d={ICONS.chevronRight} fill="currentColor" />
                  </svg>
                )}
              </button>

              {/* Sub-items (indent + consistent padding) */}
              <div
                className={`mt-2 ${collapsed ? "hidden" : "block"} ${
                  coursesOpen ? "block" : "hidden"
                }`}
              >
                <ul className="space-y-1 pl-9 pr-2">
                  <li>
                    <NavLink to="/my-courses" className={navClass}>
                      <span className="text-[0.95rem]">My Courses</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/enrolled-courses" className={navClass}>
                      <span className="text-[0.95rem]">Enrolled Courses</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>

            {/* Quizzes */}
            <li>
              <NavLink to="/quizzes" className={navClass}>
                <Icon path={ICONS.quizzes} />
                <Label>Quizzes</Label>
              </NavLink>
            </li>

            {/* Assignments */}
            <li>
              <NavLink to="/assignments" className={navClass}>
                <Icon path={ICONS.assignments} />
                <Label>Assignments</Label>
              </NavLink>
            </li>

            {/* Community Help */}
            <li>
              <NavLink to="/community" className={navClass}>
                <Icon path={ICONS.community} />
                <Label>Community Help</Label>
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Footer (optional small label; hide when collapsed) */}
        {!collapsed && (
          <div className="mt-4 text-xs opacity-80">v0.1 • Sidebar</div>
        )}
      </aside>

      {/* Mobile overlay sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <aside
            role="complementary"
            aria-label="Sidebar Navigation"
            className={`absolute left-0 top-0 h-full ${MOBILE_WIDTH} p-4 border-r border-[var(--border)] bg-[var(--card)] text-[var(--text)]`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500 shadow-sm" />
                <div className="text-sm font-bold">LearnSphere</div>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 rounded-md hover:bg-white/5"
                aria-label="Close sidebar"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 6l12 12M6 18L18 6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <nav className="mt-6">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setCoursesOpen((s) => !s)}
                    className={`${linkBase} ${linkInactive} w-full justify-between`}
                    aria-expanded={coursesOpen}
                  >
                    <span className="flex items-center gap-3">
                      <Icon path={ICONS.courses} />
                      <span>Courses</span>
                    </span>
                    <svg
                      className={`h-4 w-4 transform transition-transform ${
                        coursesOpen ? "rotate-90" : "rotate-0"
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path d={ICONS.chevronRight} fill="currentColor" />
                    </svg>
                  </button>
                  {coursesOpen && (
                    <ul className="mt-2 pl-6 space-y-1">
                      <li>
                        <NavLink
                          to="/my-courses"
                          className={navClass}
                          onClick={() => setMobileOpen(false)}
                        >
                          My Courses
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/enrolled-courses"
                          className={navClass}
                          onClick={() => setMobileOpen(false)}
                        >
                          Enrolled Courses
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </li>

                <li>
                  <NavLink
                    to="/quizzes"
                    className={navClass}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon path={ICONS.quizzes} />
                    <span>Quizzes</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/assignments"
                    className={navClass}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon path={ICONS.assignments} />
                    <span>Assignments</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/community"
                    className={navClass}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon path={ICONS.community} />
                    <span>Community Help</span>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
