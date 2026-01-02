import { Link, useLocation } from "react-router-dom";
import CourseOverviewPanel from "../components/Dashboard/CourseOverviewPanel.jsx";
import Sidebar from "../components/Dashboard/Sidebar.jsx";

export const DashboardPage = () => {
  const location = useLocation();
  let name = location.state?.name || "Student";
  try {
    const user = JSON.parse(localStorage.getItem("learnsphere_user") || "null");
    if (user?.name) name = user.name;
  } catch (e) {
    // ignore
  }

  const allCourses = [
    { id: 2, title: "JavaScript", instructor: "Code with harry" },
    { id: 1, title: "React Basics", instructor: "chai aur code" },
    { id: 3, title: ".NET", instructor: " babbar" },
  ];

  // Define your enrolled courses here with progress percentages
  const enrolledCourses = [
    { id: 2, title: "JavaScript", instructor: "Code with harry", progress: 45 },
    {
      id: 1,
      title: "React Basics",
      instructor: "chai aur code",
      progress: 100,
    },
  ];

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 py-10">
          <h2 className="text-2xl font-bold text-[var(--text)]">
            Welcome, {name}!
          </h2>
          <p className="mt-2 text-[var(--text)]/80">
            Your courses will appear here
          </p>

          <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
            <CourseOverviewPanel
              allCourses={allCourses}
              enrolledCourses={enrolledCourses}
            />
          </div>
        </section>
      </main>
    </div>
  );
};
