// Email validation
export const isEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(value);

// Password validation
export const passwordIssues = (value) => {
  const issues = [];
  if (value.length < 10) issues.push("At least 10 characters");
  if (!/[A-Z]/.test(value)) issues.push("At least one uppercase letter");
  if (!/[a-z]/.test(value)) issues.push("At least one lowercase letter");
  if (!/[0-9]/.test(value)) issues.push("At least one number");
  if (!/[!@#$%^&*]/.test(value)) issues.push("At least one special character (!@#$%^&*)");
  return issues;
};
