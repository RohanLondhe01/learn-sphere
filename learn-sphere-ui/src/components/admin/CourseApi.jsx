// Mock course store
let courses = [
  {
    id: 1,
    title: "React Basics",
    instructor: "Chai Aur Code",
    students: 120,
    status: "published",
  },
  {
    id: 2,
    title: "JavaScript Deep Dive",
    instructor: "Code with Harry",
    students: 85,
    status: "published",
  },
  {
    id: 3,
    title: ".NET Fundamentals",
    instructor: "Babbar",
    students: 45,
    status: "draft",
  },
];

let nextId = 4;
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const getAllCourses = async () => {
  await delay(300);
  return [...courses];
};

export const getCourseById = async (id) => {
  await delay(200);
  return courses.find((c) => c.id === id);
};

export const createCourse = async (course) => {
  await delay(400);
  const newCourse = { ...course, id: nextId++ };
  courses.push(newCourse);
  return newCourse;
};

export const updateCourse = async (id, updates) => {
  await delay(300);
  const idx = courses.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  courses[idx] = { ...courses[idx], ...updates };
  return courses[idx];
};

export const deleteCourse = async (id) => {
  await delay(300);
  courses = courses.filter((c) => c.id !== id);
  return true;
};
