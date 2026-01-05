// Mocked user store with roles. One instructor is seeded as the admin.
const seededUsers = new Map();

// Seed users (email normalized to lowercase)
seededUsers.set("student@example.com", {
  name: "Student",
  email: "student@example.com",
  role: "student",
});
seededUsers.set("test@school.edu", {
  name: "Test User",
  email: "test@school.edu",
  role: "student",
});
seededUsers.set("rohit@gmail.com", {
  name: "Rohit",
  email: "rohit@gmail.com",
  role: "student",
});

seededUsers.set("instructor@example.com", {
  name: "Instructor",
  email: "instructor@example.com",
  role: "admin",
  password: "Instructor@123",
});

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const checkDuplicateEmail = async (email) => {
  const normalized = (email || "").toLowerCase();
  await delay(300);
  return seededUsers.has(normalized);
};

export const getUserByEmail = async (email) => {
  const normalized = (email || "").toLowerCase();
  await delay(200);
  return seededUsers.get(normalized) || null;
};

export const registerUser = async ({
  name,
  email,
  password,
  role = "student",
}) => {
  const normalized = (email || "").toLowerCase();
  await delay(400);
  seededUsers.set(normalized, { name, email: normalized, role, password });
  return { ok: true, name, email: normalized, role };
};

export const updateUser = async (email, updates = {}) => {
  const normalized = (email || "").toLowerCase();
  await delay(300);
  const existing = seededUsers.get(normalized);
  if (!existing) return null;
  const merged = { ...existing, ...updates, email: normalized };
  seededUsers.set(normalized, merged);
  return merged;
};
