import React from "react";
import { Link } from "react-router-dom";

const CourseDetails = ({ course, isEnrolled }) => {
  const modules = ["Module 1", "Module 2", "Module 3", "Module 4"];

  const handleLockedClick =(e) => {alert(`Please enroll "${course.title}" modules`);

  };
  return (
    <div className="course-details border rounded-lg p-4 bg-[var(--card)]">
      <h3 className="text-xl font-semibold mb-4">{course.title}</h3>
      <p className="text-[var(--text)]/80 mb-4">Instructor: {course.instructor}</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {modules.map((mod, idx) => (
          isEnrolled ? (
            <Link
              key={idx}
              to={`/course/${course.id}/module/${idx + 1}`}
              state={{ courseData: course }} 
              style={{ 
                padding: '10px', 
                border: '1px solid #3b82f6', 
                display: 'block', 
                textAlign: 'center',
                textDecoration: 'none',
                color: '#3b82f6',
                borderRadius: '4px'
              }}
            >
              {mod}
            </Link>
          ) : (
            <button
              key={idx}
              onClick={handleLockedClick}
              style={{ 
                padding: '10px', 
                border: '1px solid #ccc', 
                backgroundColor: '#f5f5f5',
                color: '#888',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {mod} 
            </button>
          )
        ))}
      </div>
    </div>
  );
};

export default CourseDetails;