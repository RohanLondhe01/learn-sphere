
// components/admin/courses/CourseList.jsx
import React from "react";
import CourseCard from "./CourseCard";

export default function CourseList({
  courses,
  justCreatedId,
  newCardRef,
  onEdit,
  onDelete,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          highlight={course.id === justCreatedId}
          ref={course.id === justCreatedId ? newCardRef : null}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
