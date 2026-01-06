
// components/admin/courses/CourseCard.jsx
import React from "react";
import CourseCardMenu from "./CourseCardMenu";

const CourseCard = React.forwardRef(function CourseCard(
  { course, highlight = false, onEdit, onDelete },
  ref
) {
  return (
    <article
      ref={highlight ? ref : null}
      className={[
        "rounded-xl border overflow-hidden group flex flex-col transition-shadow",
        "hover:shadow-lg",
        highlight ? "ring-2 ring-indigo-500" : "",
      ].join(" ")}
      style={{
        borderColor: "var(--border)",
        background: "var(--card)",
      }}
    >
      {/* Thumbnail */}
      <div
        className="h-40 w-full bg-center bg-cover"
        style={{
          backgroundImage: course.thumbnail
            ? `url('${course.thumbnail}')`
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          backgroundColor: course.thumbnail ? "transparent" : "#667eea",
        }}
        aria-label={course.title}
      />

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-base flex-1">{course.title}</h3>
          <CourseCardMenu course={course} onEdit={onEdit} onDelete={onDelete} />
        </div>

        <span
          className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold whitespace-nowrap mb-2 w-fit ${
            course.status === "published"
              ? "bg-green-600/20 text-green-400"
              : course.status === "draft"
              ? "bg-yellow-600/20 text-yellow-400"
              : "bg-gray-600/20 text-gray-400"
          }`}
        >
          {course.status}
        </span>

        <p className="text-sm text-[var(--text)]/80 mb-3 line-clamp-3">
          {course.smallDescription}
        </p>

        <div className="text-xs text-[var(--text)]/70 space-y-1 mb-3 flex-1">
          <p>
            Level: <span className="font-semibold">{course.level}</span>
          </p>
          <p>
            Duration: <span className="font-semibold">{course.duration}</span>
          </p>
          {course.categories?.length > 0 && (
            <p>
              Categories:{" "}
              <span className="font-semibold">
                {course.categories.join(", ")}
              </span>
            </p>
          )}
        </div>
      </div>
    </article>
  );
});

export default CourseCard;
