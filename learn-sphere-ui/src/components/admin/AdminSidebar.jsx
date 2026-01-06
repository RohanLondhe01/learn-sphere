
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineCollection,
  HiOutlineAcademicCap,
  HiOutlineUserGroup,
  HiOutlineUser,
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineChevronDown,
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineLogout,
} from "react-icons/hi";

// Item style: highlights the active route, hover state otherwise
const itemClass = ({ isActive }) =>
  [
    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium",
    isActive ? "bg-white/10" : "hover:bg-white/5",
  ].join(" ");

const menuConfig = [
  {
    id: "insights",
    label: "Insights",
    icon: HiOutlineChartBar,
    items: [
      { label: "Dashboard", path: "/admin", icon: HiOutlineHome, end: true },
      { label: "Analytics", path: "/admin/analytics", icon: HiOutlineChartBar },
    ],
  },
  {
    id: "content",
    label: "Content Management",
    icon: HiOutlineCollection,
    items: [
      { label: "Courses", path: "/admin/courses", icon: HiOutlineAcademicCap },
      { label: "Assessments", path: "/admin/assessments", icon: HiOutlineCollection },
    ],
  },
  {
    id: "users",
    label: "User Management",
    icon: HiOutlineUserGroup,
    items: [
      { label: "Users", path: "/admin/users", icon: HiOutlineUserGroup },
      { label: "Profile", path: "/admin/profile", icon: HiOutlineUser },
    ],
  },
  {
    id: "system",
    label: "System",
    icon: HiOutlineCog,
    items: [{ label: "Settings", path: "/admin/settings", icon: HiOutlineCog }],
  },
];

// Persisted collapsible state
const getInitialOpenGroups = () => {
  try {
    const raw = localStorage.getItem("admin_sidebar_groups");
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  // default: open first group, collapse others
  const open = {};
  menuConfig.forEach((g, idx) => (open[g.id] = idx === 0));
  return open;
};

export default function AdminSidebar() {
  const [open, setOpen] = React.useState(false); // mobile drawer
  const [groupsOpen, setGroupsOpen] = React.useState(getInitialOpenGroups());
  const [theme, setTheme] = React.useState(
    document.documentElement.getAttribute("data-theme") || "dark"
  );
  const navigate = useNavigate();

  // Persist group open state
  React.useEffect(() => {
    localStorage.setItem("admin_sidebar_groups", JSON.stringify(groupsOpen));
  }, [groupsOpen]);

  // Close on ESC (mobile)
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Theme toggler
  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  };

  const logout = () => {
    localStorage.removeItem("learnsphere_user");
    window.dispatchEvent(new Event("userUpdated"));
    navigate("/login");
  };

  const SidebarContent = ({ onNavigate }) => (
    <aside
      className="w-64 p-4 border-r border-[var(--border)] bg-[var(--card)] text-[var(--text)]"
      aria-label="Admin sidebar"
      role="navigation"
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500" />
          <span className="font-bold">Admin</span>
        </div>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-white/10"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          title="Toggle theme"
        >
          {theme === "dark" ? <HiOutlineSun /> : <HiOutlineMoon />}
        </button>
      </div>

      {/* Menu groups */}
      <nav className="space-y-2" aria-label="Admin navigation">
        {menuConfig.map((group) => (
          <div key={group.id} className="mb-2">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-2 px-3 py-2 rounded-md hover:bg-white/5"
              onClick={() =>
                setGroupsOpen((g) => ({ ...g, [group.id]: !g[group.id] }))
              }
              aria-expanded={!!groupsOpen[group.id]}
              aria-controls={`group-${group.id}`}
            >
              <span className="flex items-center gap-2 text-sm font-semibold">
                <group.icon className="text-lg" />
                {group.label}
              </span>
              <HiOutlineChevronDown
                className={`transition-transform ${
                  groupsOpen[group.id] ? "rotate-180" : ""
                }`}
              />
            </button>

            <div id={`group-${group.id}`} className="mt-1 space-y-1">
              {groupsOpen[group.id] &&
                group.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    className={itemClass}
                    onClick={() => onNavigate?.()}
                    aria-current={(match) => (match ? "page" : undefined)}
                  >
                    <item.icon className="text-base" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer actions */}
      <div className="mt-6 pt-4 border-t border-[var(--border)]">
        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-600/20 text-red-400 text-sm"
        >
          <HiOutlineLogout className="text-base" />
          Logout
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Mobile toggle button (visible < md) */}
      <button
        type="button"
        className="md:hidden fixed top-3 left-3 z-50 px-3 py-2 rounded-md bg-[var(--card)] border border-[var(--border)] text-[var(--text)]"
        onClick={() => setOpen(true)}
        aria-label="Open admin menu"
      >
        ☰
      </button>

      {/* Mobile drawer overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer content */}
      <div
        className={`md:hidden fixed top-0 left-0 z-50 h-screen w-64 transform transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Admin menu"
      >
        <div className="h-full bg-[var(--card)] border-r border-[var(--border)] text-[var(--text)] p-4">
          {/* Close button */}
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500" />
              <span className="font-bold">Admin</span>
            </div>
            <button
              type="button"
              className="px-3 py-1 rounded-md hover:bg-white/10"
              onClick={() => setOpen(false)}
              aria-label="Close admin menu"
            >
              ✕
            </button>
          </div>

          <SidebarContent onNavigate={() => setOpen(false)} />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <SidebarContent />
      </div>
    </>
  );
}
