// src/components/CourseoverviewPanel/CourseDetails.jsx
import React, { useState } from "react";

const CourseDetails = ({ course, isEnrolled }) => {
  const [selectedModule, setSelectedModule] = useState(null);

  // Example modules — you can replace with real data later
  const modules = ["Module 1", "Module 2", "Module 3", "Module 4"];

  const handleModuleClick = (module) => {
    if (!isEnrolled) {
      // Show popup/alert if not enrolled
      alert("You have not enrolled in this course, so you cannot see content.");
    } else {
      // Show content if enrolled
      setSelectedModule(module);
    }
  };

  return (
    <div className="course-details border rounded-lg p-4 bg-[var(--card)]">
      {/* Course header */}
      <h3 className="text-xl font-semibold mb-4">{course.title}</h3>
      <p className="text-[var(--text)]/80 mb-4">Instructor: {course.instructor}</p>

      {/* Module list */}
      <div className="grid grid-cols-2 gap-4">
        {modules.map((mod, idx) => (
          <button
            key={idx}
            onClick={() => handleModuleClick(mod)}
            className="px-4 py-2 rounded border border-[var(--border)] bg-[var(--card)] hover:brightness-110 transition"
          >
            {mod}
          </button>
        ))}
      </div>

      {/* Show content only if enrolled */}
      {isEnrolled && selectedModule && (
        <div className="mt-6 p-4 border rounded bg-white">
          <h4 className="font-semibold mb-2">{selectedModule} Content</h4>
          <p className="text-gray-700">
            This is the content for {selectedModule}. You can study here.
          </p>

          {/* Progress bar */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full"
              style={{ width: "40%" }} // Example progress
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">Progress: 40%</p>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;

