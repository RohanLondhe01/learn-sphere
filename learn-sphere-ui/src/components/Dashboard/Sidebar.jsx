import React, { useState, useSyncExternalStore } from "react";
import { NavLink } from "react-router-dom";
import { subscribe, getSnapshot } from "../EnrollmentStore";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(true);

  const enrolled = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const linkBase =
    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const navClass = ({ isActive }) =>
    `${linkBase} ${
      isActive ? "bg-white/10 text-[var(--text)]" : "text-[var(--text)] hover:bg-white/5"
    }`;

  const Label = ({ children }) => (
    <span
      className={`truncate transition-all duration-200 ${
        expanded ? "inline opacity-100" : "hidden opacity-0"
      }`}
    >
      {children}
    </span>
  );

  const handleBlur = (e) => {
    const next = e.relatedTarget;
    if (!e.currentTarget.contains(next)) setExpanded(false);
  };

  return (
    <>
      <div
        className={`hidden md:block fixed left-0 top-0 h-screen z-30 
                    border-r border-[var(--border)] bg-[var(--card)] text-[var(--text)]
                    transition-all duration-200 overflow-hidden ${
                      expanded ? "w-64" : "w-16"
                    }`}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        tabIndex={0}
        onFocus={() => setExpanded(true)}
        onBlur={handleBlur}
      >
        <aside className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-3 flex items-center gap-3">
            <span className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500 shadow-sm" />
            <span
              className={`text-sm font-bold bg-gradient-to-r from-blue-400 to-indigo-300 
              bg-clip-text text-transparent transition-all duration-200 ${
                expanded ? "inline opacity-100" : "hidden opacity-0"
              }`}
            >
              LearnSphere
            </span>
          </div>

          <nav className="mt-2 flex-1 overflow-auto ml-2" aria-label="Main navigation">
            <ul className="space-y-1">
              {/* Courses */}
              <li>
                <button
                  onClick={() => setCoursesOpen((s) => !s)}
                  className={`${linkBase} text-[var(--text)] hover:bg-white/5 w-full justify-between`}
                  aria-expanded={coursesOpen}
                  aria-controls="courses-submenu"
                >
                  <span className="flex items-center gap-3">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M3 13h8V3H3v10zM3 21h8v-6H3v6zM13 21h8V11h-8v10zM13 3v6h8V3h-8z" />
                    </svg>
                    <Label>Courses</Label>
                  </span>

                  {expanded && (
                    <span className="flex items-center gap-2">
                      <span className="text-xs bg-white/10 px-2 py-[2px] rounded">
                        {enrolled.length}
                      </span>
                      <svg
                        className={`h-4 w-4 transition-transform ${
                          coursesOpen ? "rotate-90" : "rotate-0"
                        }`}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M8 5v14l11-7L8 5z" />
                      </svg>
                    </span>
                  )}
                </button>

                {expanded && coursesOpen && (
                  <div id="courses-submenu" className="mt-2 pl-2 pr-2">
                    <ul className="space-y-1">
                      <li>
                        <NavLink to="/my-courses" className={navClass}>
                          <span>My Courses</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/enrolled-courses" className={navClass}>
                          <span>Enrolled Courses</span>
                        </NavLink>
                      </li>
                    </ul>

                    {/* Dynamic enrolled course list */}
                    <div className="mt-3 border-t border-[var(--border)] pt-2">
                      <p className="text-xs opacity-70 px-3">Enrolled</p>

                      {enrolled.length > 0 ? (
                        <ul className="mt-1 space-y-1">
                          {enrolled.map((e) => (
                            <li key={e.id}>
                              <NavLink
                                to={`/course/${e.id}`}
                                className={navClass}
                                title={e.title}
                              >
                                <span className="truncate">{e.title}</span>
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs opacity-60 px-3 mt-1">No enrolled courses</p>
                      )}
                    </div>
                  </div>
                )}
              </li>

              {/* Other main links */}
              <li>
                <NavLink to="/quizzes" className={navClass}>
                  <Label>Quizzes</Label>
                </NavLink>
              </li>

              <li>
                <NavLink to="/assignments" className={navClass}>
                  <Label>Assignments</Label>
                </NavLink>
              </li>

              <li>
                <NavLink to="/community" className={navClass}>
                  <Label>Community Help</Label>
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
}
