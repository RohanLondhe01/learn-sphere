
// pages/admin/CoursesAdmin.jsx
import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../../components/admin/CourseApi";

import CourseForm from "../../components/admin/courses/CourseForm";
import CourseList from "../../components/admin/courses/CourseList";
import { normalizeSlug } from "../../components/admin/courses/slug";
import { validateCourse } from "../../components/admin/courses/validators";

const CATEGORY_OPTIONS = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Machine Learning",
  "UI/UX Design",
  "DevOps",
  "Cloud Computing",
  "Cybersecurity",
  "Database Design",
  "AI & Chatbots",
  "Blockchain",
  "Game Development",
  "Business",
  "Marketing",
  "Languages",
];

export default function CoursesAdmin() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    smallDescription: "",
    description: "",
    thumbnail: "",
    categories: [],
    duration: "",
    level: "beginner",
    price: 0,
    students: 0,
    status: "published",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [justCreatedId, setJustCreatedId] = useState(null);
  const newCardRef = React.useRef(null);
  const titleRef = React.useRef(null);

  useEffect(() => {
    const init = async () => {
      const data = await getAllCourses();
      setCourses(data);
      setLoading(false);
    };
    init();
  }, []);

  // Focus title when creating a new course
  useEffect(() => {
    if (editing === "new" && titleRef.current) {
      titleRef.current.focus();
    }
  }, [editing]);

  // Scroll to newly created card and highlight, then clear highlight
  useEffect(() => {
    if (justCreatedId && newCardRef.current) {
      newCardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      const t = setTimeout(() => setJustCreatedId(null), 1500);
      return () => clearTimeout(t);
    }
  }, [justCreatedId]);

  const onEdit = (course) => {
    setEditing(course.id);
    setErrors({});
    setMessage("");
    setForm({
      title: course.title || "",
      slug: course.slug || "",
      smallDescription: course.smallDescription || "",
      description: course.description || "",
      thumbnail: course.thumbnail || "",
      categories: Array.isArray(course.categories) ? course.categories : [],
      duration: course.duration || "",
      level: course.level || "beginner",
      price: Number(course.price) || 0,
      students: Number(course.students) || 0,
      status: course.status || "published",
    });
  };

  const onCancel = () => {
    setEditing(null);
    setErrors({});
    setMessage("");
    setForm({
      title: "",
      slug: "",
      smallDescription: "",
      description: "",
      thumbnail: "",
      categories: [],
      duration: "",
      level: "beginner",
      price: 0,
      students: 0,
      status: "published",
    });
  };

  const onSave = async () => {
    setMessage("");
    const errs = validateCourse(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setMessage("Please fix the highlighted errors.");
      return;
    }

    try {
      if (editing && editing !== "new") {
        await updateCourse(editing, form);
        const data = await getAllCourses();
        setCourses(data);
        setMessage("Course updated.");
        onCancel();
      } else {
        // Create: optimistic append and highlight
        const created = await createCourse({
          ...form,
          slug: normalizeSlug(form.slug || form.title),
        });
        setCourses((prev) => [created, ...prev]);
        setMessage("Course created.");
        setJustCreatedId(created.id);
        onCancel(); // exit editor and show grid
      }
    } catch (e) {
      setMessage(e?.message || "Something went wrong. Please try again.");
    }
  };

  const onDelete = async (id) => {
    if (window.confirm("Delete this course?")) {
      await deleteCourse(id);
      const data = await getAllCourses();
      setCourses(data);
      setMessage("Course deleted.");
    }
  };

  const canSave =
    form.title.trim() && form.slug.trim() && form.smallDescription.trim();

  if (loading) return <div className="p-6">Loading courses...</div>;

  return (
    <div className="flex">
      <AdminSidebar />

      <main className="flex-1 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Course Management</h1>
          {!editing && (
            <button
              onClick={() => {
                setEditing("new");
                setErrors({});
                setMessage("");
              }}
              className="px-3 py-2 rounded-md bg-indigo-600 text-white"
            >
              Create Course
            </button>
          )}
        </div>

        {message && (
          <div className="mb-4 text-sm text-green-400">{message}</div>
        )}

        {editing ? (
          <CourseForm
            form={form}
            setForm={setForm}
            errors={errors}
            editing={editing}
            onSave={onSave}
            onCancel={onCancel}
            categoryOptions={CATEGORY_OPTIONS}
            canSave={canSave}
            titleRef={titleRef}
          />
        ) : (
          <CourseList
            courses={courses}
            justCreatedId={justCreatedId}
            newCardRef={newCardRef}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
      </main>
    </div>
  );
}
