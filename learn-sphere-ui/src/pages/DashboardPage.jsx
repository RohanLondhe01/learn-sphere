import React, { useMemo, useState, useRef, useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar.jsx"; // already implemented in your app

export const DashboardPage = () => {
  const location = useLocation();

  // Resolve the display name (location.state, or localStorage, or fallback)
  let name = location.state?.name ?? "Student";
  try {
    const user = JSON.parse(localStorage.getItem("learnsphere_user") ?? "null");
    if (user?.name) name = user.name;
  } catch {
    /* ignore */
  }

  /** ----------------------------------------------------------------
   * Sidebar width tracking (no changes to Sidebar logic)
   * - Works even if Sidebar renders position:fixed
   * - We measure the actual DOM node produced by <Sidebar/>
   * ---------------------------------------------------------------- */
  const asideRef = useRef(null);
  const sidebarShellRef = useRef(null); // wrapper around <Sidebar/>
  const [sidebarWidth, setSidebarWidth] = useState(0);

  useLayoutEffect(() => {
    const shell = sidebarShellRef.current;
    if (!shell) return;

    // If Sidebar is fixed inside shell, shell width may be 0.
    // So we try to measure its first child (the actual rendered node).
    const target = shell.firstElementChild || shell;

    const measure = () => {
      // Use bounding box width to handle fixed/absolute elements reliably.
      const rect = target.getBoundingClientRect();
      const w = Math.max(0, Math.round(rect.width)); // pixel snap
      setSidebarWidth(w);
    };

    // Initial measure (after mount & next paint)
    measure();
    // In case Sidebar toggles right after mount (animations), re-measure shortly
    const t = setTimeout(measure, 0);

    // React to expand/collapse via ResizeObserver
    const ro = new ResizeObserver(measure);
    ro.observe(target);

    // Also listen to window resize to keep in sync with breakpoints
    window.addEventListener("resize", measure);

    return () => {
      clearTimeout(t);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  /** --------------------------------
   * Demo data (replace with API responses later)
   * -------------------------------- */
  const [liveSessions] = useState([
    {
      id: "ls-101",
      title: "Intro to DSA – Live",
      instructor: "Instructor A",
      startTime: "2025-12-20T18:00:00+05:30",
      durationMins: 90,
      thumbnail: "/assets/live-dsa.jpg",
      isLive: true,
    },
    {
      id: "ls-102",
      title: "System Design: Caching & Queues",
      instructor: "Instructor B",
      startTime: "2025-12-22T19:30:00+05:30",
      durationMins: 120,
      thumbnail: "/assets/live-sd.jpg",
      isLive: false,
    },
    {
      id: "ls-103",
      title: "Frontend Deep Dive: Performance",
      instructor: "Instructor C",
      startTime: "2025-12-25T17:00:00+05:30",
      durationMins: 75,
      thumbnail: "/assets/live-fe.jpg",
      isLive: false,
    },
  ]);

  const [courses] = useState([
    {
      id: "c-201",
      title: "Complete Web Development Cohort",
      level: "Beginner → Advanced",
      lessons: 120,
      thumbnail: "/assets/webdev.jpg",
    },
    {
      id: "c-202",
      title: "Complete Web3 Cohort",
      level: "Intermediate",
      lessons: 80,
      thumbnail: "/assets/web3.jpg",
    },
    {
      id: "c-203",
      title: "ADHOC Practice Sets",
      level: "All levels",
      lessons: 45,
      thumbnail: "/assets/adhoc.jpg",
    },
  ]);

  /** -------------------------------
   * UI state: search + sort
   * ------------------------------- */
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("newest"); // 'newest' | 'az'

  /** -------------------------------
   * Helpers
   * ------------------------------- */
  const formatDateTime = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return iso;
    }
  };

  /** -------------------------------
   * Derived lists
   * ------------------------------- */
  const filteredLive = useMemo(() => {
    const list = liveSessions.filter(
      (s) =>
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.instructor.toLowerCase().includes(query.toLowerCase())
    );
    switch (sortKey) {
      case "az":
        return [...list].sort((a, b) => a.title.localeCompare(b.title));
      case "newest":
      default:
        return [...list].sort(
          (a, b) => new Date(b.startTime) - new Date(a.startTime)
        );
    }
  }, [liveSessions, query, sortKey]);

  const filteredCourses = useMemo(() => {
    const list = courses.filter(
      (c) =>
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.level?.toLowerCase().includes(query.toLowerCase())
    );
    switch (sortKey) {
      case "az":
        return [...list].sort((a, b) => a.title.localeCompare(b.title));
      case "newest":
      default:
        return list; // adjust when you have createdAt/popularity
    }
  }, [courses, query, sortKey]);

  /** -------------------------------
   * Layout
   * ------------------------------- */
  return (
    <div
      className="flex min-h-dvh"
      style={{ ["--sidebar-current-width"]: `${sidebarWidth}px` }}
    >
      {/* Sidebar wrapper reserves real width so main never overlaps */}
      <aside
        ref={asideRef}
        className="flex-shrink-0"
        style={{
          width: "var(--sidebar-current-width)",
          transition: "width 50ms ease",
        }}
      >
        {/* The shell lets us measure whatever <Sidebar/> renders (fixed or not) */}
        <div ref={sidebarShellRef}>
          <Sidebar />
        </div>
      </aside>

      {/* Scrollable content area – aligned beside reserved space */}
      <main className="flex-1 overflow-y-auto">
        <section
          className="mx-auto max-w-7xl px-4 py-6"
          style={{ color: "var(--text)" }}
        >
          {/* Top: Welcome + Sort */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Welcome, {name}!</h2>
              <p className="mt-1 opacity-80">
                Search live sessions or explore courses to continue learning.
              </p>
            </div>
            {/* Sort by */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm opacity-80">
                Sort by
              </label>
              <select
                id="sort"
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value)}
                className="rounded-lg border px-3 py-2 text-sm"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--card)",
                  color: "var(--text)",
                }}
              >
                <option value="newest">Newest</option>
                <option value="az">A–Z</option>
              </select>
            </div>
          </div>

          {/* Search bar */}
          <div className="mt-6 flex items-center gap-3">
            <input
              type="text"
              placeholder="Search here"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
              style={{
                borderColor: "var(--border)",
                background: "var(--card)",
                color: "var(--text)",
              }}
              aria-label="Search"
            />
            <button className="rounded-lg px-4 py-2 font-semibold text-white bg-gradient-to-tr from-indigo-600 to-blue-500 shadow-lg hover:shadow-xl transition">
              Search
            </button>
          </div>

          {/* Live Sessions */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Live Sessions</h3>
              <Link
                to="/sessions"
                className="text-sm underline opacity-80 hover:opacity-100 transition"
              >
                View all
              </Link>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredLive.map((s) => (
                <article
                  key={s.id}
                  className="rounded-xl border overflow-hidden group"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--card)",
                  }}
                >
                  {/* Thumbnail */}
                  <div
                    className="h-32 w-full bg-center bg-cover"
                    style={{ backgroundImage: `url('${s.thumbnail}')` }}
                    aria-label={s.title}
                  />
                  {/* Body */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-sm font-bold">{s.title}</h4>
                      {s.isLive ? (
                        <span className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-white bg-red-600">
                          ● LIVE
                        </span>
                      ) : (
                        <span
                          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold"
                          style={{
                            background: "var(--card)",
                            color: "var(--text)",
                            border: `1px solid var(--border)`,
                          }}
                        >
                          Upcoming
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm opacity-80">By {s.instructor}</p>
                    <p className="mt-1 text-sm opacity-70">
                      {formatDateTime(s.startTime)} · {s.durationMins} mins
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <Link
                        to={`/session/${s.id}`}
                        className="rounded-lg px-3 py-2 text-sm font-semibold text-white bg-gradient-to-tr from-indigo-600 to-blue-500 shadow hover:shadow-md transition"
                      >
                        {s.isLive ? "Join now" : "Set reminder"}
                      </Link>
                      <Link
                        to={`/session/${s.id}`}
                        className="rounded-lg px-3 py-2 text-sm font-semibold border transition"
                        style={{
                          borderColor: "var(--border)",
                          background: "var(--card)",
                          color: "var(--text)",
                        }}
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Explore Courses */}
          <div className="mt-10">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Explore Courses</h3>
              <Link
                to="/courses"
                className="text-sm underline opacity-80 hover:opacity-100 transition"
              >
                View all
              </Link>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredCourses.map((c) => (
                <article
                  key={c.id}
                  className="rounded-xl border overflow-hidden group"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--card)",
                  }}
                >
                  {/* Thumbnail */}
                  <div
                    className="h-32 w-full bg-center bg-cover"
                    style={{ backgroundImage: `url('${c.thumbnail}')` }}
                    aria-label={c.title}
                  />
                  {/* Body */}
                  <div className="p-4">
                    <h4 className="text-sm font-bold">{c.title}</h4>
                    <p className="mt-1 text-sm opacity-80">{c.level}</p>
                    <p className="mt-1 text-sm opacity-70">
                      {c.lessons} lessons
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <Link
                        to={`/course/${c.id}`}
                        className="rounded-lg px-3 py-2 text-sm font-semibold text-white bg-gradient-to-tr from-indigo-600 to-blue-500 shadow hover:shadow-md transition"
                      >
                        Continue
                      </Link>
                      <Link
                        to={`/course/${c.id}`}
                        className="rounded-lg px-3 py-2 text-sm font-semibold border transition"
                        style={{
                          borderColor: "var(--border)",
                          background: "var(--card)",
                          color: "var(--text)",
                        }}
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
