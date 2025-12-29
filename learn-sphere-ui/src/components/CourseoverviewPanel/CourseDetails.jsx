// src/components/CourseoverviewPanel/CourseDetails.jsx
import React from "react";
import { Link } from "react-router-dom";

const CourseDetails = ({ course, isEnrolled }) => {
  // Example modules — you can replace with real data later
  const modules = ["Module 1", "Module 2", "Module 3", "Module 4"];

  return (
    <div className="course-details border rounded-lg p-4 bg-[var(--card)]">
      {/* Course header */}
      <h3 className="text-xl font-semibold mb-4">{course.title}</h3>
      <p className="text-[var(--text)]/80 mb-4">Instructor: {course.instructor}</p>

      {/* Module list */}
      <div className="grid grid-cols-2 gap-4">
        {modules.map((mod, idx) => (
          <Link
            key={idx}
            to={
              isEnrolled
                ? `/course/${course.id}/module/${idx + 1}`
                : `/not-enrolled/${course.id}/module/${idx + 1}`
            }
            className="px-4 py-2 rounded border border-[var(--border)] bg-[var(--card)] hover:brightness-110 transition block text-center"
          >
            {mod}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CourseDetails;


