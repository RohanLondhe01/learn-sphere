import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../../components/admin/CourseApi";

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

const CourseCardMenu = ({ course, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-white/10 rounded-md transition"
        title="More actions"
      >
        <span className="text-lg">⋮</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-black/80 border border-white/15 rounded-md shadow-lg z-50">
          <button
            onClick={() => {
              onEdit(course);
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition first:rounded-t-md"
          >
            Edit
          </button>
          <button
            onClick={() => {
              onDelete(course.id);
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-red-600/20 text-red-400 transition last:rounded-b-md"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

const SearchableSelect = ({ value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = React.useRef(null);

  const filtered = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  const toggleOption = (option) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative z-20" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-md px-3 py-2 bg-black/20 border border-white/15 text-left flex items-center justify-between"
      >
        <span className="text-sm">
          {value.length > 0 ? `${value.length} selected` : placeholder}
        </span>
        <span className="text-xs">▼</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-black/60 border border-white/15 rounded-md shadow-2xl z-50">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 bg-black/20 border-b border-white/15 rounded-t-md text-sm focus:outline-none"
            autoFocus
          />
          <div className="max-h-48 overflow-y-auto">
            {filtered.map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 px-3 py-2 hover:bg-white/5 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={value.includes(option)}
                  onChange={() => toggleOption(option)}
                  className="rounded"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
            {filtered.length === 0 && (
              <div className="px-3 py-2 text-sm text-[var(--text)]/60">
                No results
              </div>
            )}
          </div>
        </div>
      )}

      {value.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {value.map((cat) => (
            <span
              key={cat}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-indigo-600/30 text-xs text-indigo-300"
            >
              {cat}
              <button
                type="button"
                onClick={() => toggleOption(cat)}
                className="hover:text-indigo-200"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

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

  useEffect(() => {
    const init = async () => {
      const data = await getAllCourses();
      setCourses(data);
      setLoading(false);
    };
    init();
  }, []);

  const onEdit = (course) => {
    setEditing(course.id);
    setForm(course);
  };

  const onCancel = () => {
    setEditing(null);
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
    if (
      !form.title.trim() ||
      !form.slug.trim() ||
      !form.smallDescription.trim()
    ) {
      setMessage("Please fill in title, slug, and small description.");
      return;
    }
    if (editing) {
      await updateCourse(editing, form);
      setMessage("Course updated.");
    } else {
      await createCourse(form);
      setMessage("Course created.");
    }
    const data = await getAllCourses();
    setCourses(data);
    onCancel();
  };

  const onDelete = async (id) => {
    if (window.confirm("Delete this course?")) {
      await deleteCourse(id);
      const data = await getAllCourses();
      setCourses(data);
      setMessage("Course deleted.");
    }
  };

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const insertMarkdown = (before, after = "") => {
    const textarea = document.querySelector('textarea[name="description"]');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = form.description.substring(start, end);
    const newText =
      form.description.substring(0, start) +
      before +
      selected +
      after +
      form.description.substring(end);

    setForm((p) => ({ ...p, description: newText }));

    // Reset cursor position after state update
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + before.length;
      textarea.focus();
    }, 0);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "students" || name === "price") {
      setForm((p) => ({ ...p, [name]: Number(value) }));
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }
  };

  if (loading) return <div className="p-6">Loading courses...</div>;

  return (
    <div className="flex">
      <AdminSidebar />

      <main className="flex-1 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Course Management</h1>
          {!editing && (
            <button
              onClick={() => setEditing("new")}
              className="px-3 py-2 rounded-md bg-indigo-600 text-white"
            >
              Create Course
            </button>
          )}
        </div>

        {message && (
          <div className="mb-4 text-sm text-green-400">{message}</div>
        )}

        {editing && (
          <div className="mb-6 rounded-lg border border-[var(--border)] bg-[var(--card)] p-4">
            <h2 className="text-lg font-semibold mb-4">
              {editing === "new" ? "New Course" : "Edit Course"}
            </h2>
            <div className="space-y-3 max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm mb-1">Title</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={onChange}
                  className="w-full rounded-md px-3 py-2 bg-black/20 border border-white/15"
                  placeholder="Course title"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Slug</label>
                <div className="flex gap-2">
                  <input
                    name="slug"
                    value={form.slug}
                    onChange={onChange}
                    className="flex-1 rounded-md px-3 py-2 bg-black/20 border border-white/15"
                    placeholder="course-slug"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (form.title.trim()) {
                        setForm((p) => ({
                          ...p,
                          slug: generateSlug(form.title),
                        }));
                      }
                    }}
                    className="px-3 py-2 rounded-md bg-blue-600/30 border border-blue-500/50 text-sm hover:bg-blue-600/50"
                  >
                    Generate
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Duration (e.g., 4 weeks)
                </label>
                <input
                  name="duration"
                  value={form.duration}
                  onChange={onChange}
                  className="w-full rounded-md px-3 py-2 bg-black/20 border border-white/15"
                  placeholder="4 weeks"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm mb-1">Small Description</label>
                <input
                  name="smallDescription"
                  value={form.smallDescription}
                  onChange={onChange}
                  className="w-full rounded-md px-3 py-2 bg-black/20 border border-white/15"
                  placeholder="Brief one-line description"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm mb-1">
                  Thumbnail Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    name="thumbnail"
                    value={form.thumbnail}
                    onChange={onChange}
                    className="flex-1 rounded-md px-3 py-2 bg-black/20 border border-white/15"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                {form.thumbnail && (
                  <div className="mt-2 w-full max-w-sm rounded-md overflow-hidden border border-white/15">
                    <img
                      src={form.thumbnail}
                      alt="Thumbnail preview"
                      className="w-full h-32 object-cover"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm mb-2">Description</label>
                <div className="flex gap-1 mb-2 p-2 rounded-md bg-black/20 border border-white/15 flex-wrap">
                  <button
                    type="button"
                    onClick={() => insertMarkdown("**", "**")}
                    title="Bold"
                    className="px-2 py-1 rounded text-sm bg-white/10 hover:bg-white/20 font-bold"
                  >
                    B
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown("*", "*")}
                    title="Italic"
                    className="px-2 py-1 rounded text-sm bg-white/10 hover:bg-white/20 italic"
                  >
                    I
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown("~~", "~~")}
                    title="Strikethrough"
                    className="px-2 py-1 rounded text-sm bg-white/10 hover:bg-white/20 line-through"
                  >
                    S
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown("# ")}
                    title="Heading"
                    className="px-2 py-1 rounded text-sm bg-white/10 hover:bg-white/20"
                  >
                    H1
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown("## ")}
                    title="Subheading"
                    className="px-2 py-1 rounded text-sm bg-white/10 hover:bg-white/20"
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown("- ")}
                    title="List"
                    className="px-2 py-1 rounded text-sm bg-white/10 hover:bg-white/20"
                  >
                    • List
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown("`", "`")}
                    title="Code"
                    className="px-2 py-1 rounded text-sm bg-white/10 hover:bg-white/20 font-mono text-xs"
                  >
                    &lt;Code&gt;
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown("[Link](", ")")}
                    title="Link"
                    className="px-2 py-1 rounded text-sm bg-white/10 hover:bg-white/20"
                  >
                    Link
                  </button>
                </div>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={onChange}
                  className="w-full rounded-md px-3 py-2 bg-black/20 border border-white/15 h-32 font-mono text-sm"
                  placeholder="Full course description (supports markdown)"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm mb-1">Categories</label>
                <SearchableSelect
                  value={form.categories}
                  onChange={(cats) =>
                    setForm((p) => ({ ...p, categories: cats }))
                  }
                  options={CATEGORY_OPTIONS}
                  placeholder="Select categories..."
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Level</label>
                <select
                  name="level"
                  value={form.level}
                  onChange={onChange}
                  className="w-full rounded-md px-3 py-2 bg-black/20 border border-white/15"
                >
                  <option>beginner</option>
                  <option>intermediate</option>
                  <option>advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-1">Price (0 or Free)</label>
                <div className="flex items-center gap-2">
                  <input
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={onChange}
                    className="flex-1 rounded-md px-3 py-2 bg-black/20 border border-white/15"
                    disabled
                  />
                  <span className="text-sm text-[var(--text)]/70">Free</span>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={onChange}
                  className="w-full rounded-md px-3 py-2 bg-black/20 border border-white/15"
                >
                  <option>published</option>
                  <option>draft</option>
                  <option>archived</option>
                </select>
              </div>

              <div className="md:col-span-2 flex gap-2 pt-2">
                <button
                  onClick={onSave}
                  className="px-3 py-2 rounded-md bg-indigo-600 text-white"
                >
                  Save
                </button>
                <button
                  onClick={onCancel}
                  className="px-3 py-2 rounded-md border border-[var(--border)]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {!editing && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => (
              <article
                key={course.id}
                className="rounded-xl border overflow-hidden group flex flex-col"
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
                    backgroundColor: course.thumbnail
                      ? "transparent"
                      : "#667eea",
                  }}
                  aria-label={course.title}
                />

                {/* Body */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-base flex-1">
                      {course.title}
                    </h3>
                    <CourseCardMenu
                      course={course}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
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
                      Level:{" "}
                      <span className="font-semibold">{course.level}</span>
                    </p>
                    <p>
                      Duration:{" "}
                      <span className="font-semibold">{course.duration}</span>
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
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
