
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isEmail, passwordIssues, normalizeEmail } from "./Validation";
import { checkDuplicateEmail, registerUser } from "./Api";
import { InputField } from "./InputField";

export const RegistrationForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // Pure validation for a single field—no state writes
  const getFieldError = async (name, value, currentForm) => {
    let error = "";

    if (name === "name") {
      if (!value.trim()) error = "Name is required";
    }

    if (name === "email") {
      if (!value.trim()) error = "Email is required";
      else if (!isEmail(value)) error = "Invalid email";
      else {
        const normalized = normalizeEmail(value);
        const isDup = await checkDuplicateEmail(normalized);
        if (isDup) error = "Email already exists";
      }
    }

    if (name === "password") {
      if (!value) error = "Password is required";
      else {
        const pwdIssues = passwordIssues(value);
        if (pwdIssues.length) error = pwdIssues; // array of issue strings
      }
    }

    if (name === "confirmPassword") {
      if (!value) error = "Confirm Password is required";
      else if (value !== currentForm.password) error = "Passwords do not match";
    }

    return error;
  };

  const onChange = async (e) => {
    const { name, value } = e.target;
    const snapshot = { ...form, [name]: value };
    setForm(snapshot);

    // Compute error for the field that changed
    const fieldError = await getFieldError(name, value, snapshot);

    // If password changed, also re-evaluate confirmPassword
    const confirmError =
      name === "password"
        ? await getFieldError("confirmPassword", snapshot.confirmPassword, snapshot)
        : errors.confirmPassword;

    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
      confirmPassword: confirmError,
    }));
  };

  // Validate all fields with a local object; then commit once
  const validateAll = async () => {
    const nextErrors = {};
    for (const field of Object.keys(form)) {
      nextErrors[field] = await getFieldError(field, form[field], form);
    }
    setErrors(nextErrors);

    // Decide validity from local errors (not from state)
    const isValid = Object.values(nextErrors).every(
      (err) => !err || (Array.isArray(err) && err.length === 0)
    );
    return isValid;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const isValid = await validateAll();
    if (!isValid) {
      setSubmitting(false);
      return; // stop here if any error exists
    }

    await registerUser({
      name: form.name,
      email: normalizeEmail(form.email),
      password: form.password,
    });

    const user = { name: form.name, email: normalizeEmail(form.email) };
    localStorage.setItem("learnsphere_user", JSON.stringify(user));
    localStorage.setItem("studentName", form.name);
    window.dispatchEvent(new Event("userUpdated"));
    navigate("/dashboard");
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-md px-4 py-10">
      <h2 className="text-2xl font-bold text-slate-100 mb-6">Create your account</h2>

      <InputField
        label="Name"
        name="name"
        value={form.name}
        onChange={onChange}
        error={errors.name}
        placeholder="Jane Doe"
      />

      <InputField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={onChange}
        error={errors.email}
        placeholder="jane@example.com"
      />

      <InputField
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={onChange}
        error={errors.password}
        placeholder="Minimum 10 characters"
      />

      <InputField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={form.confirmPassword}
        onChange={onChange}
        error={errors.confirmPassword}
        placeholder="Re-enter your password"
      />

      <button
        type="submit"
        disabled={submitting}
        className={[
          "mt-4 w-full rounded-lg px-4 py-2.5 font-semibold",
          "text-white bg-gradient-to-tr from-indigo-600 to-blue-500 shadow-lg hover:shadow-xl transition",
          submitting ? "opacity-60 cursor-not-allowed" : "",
        ].join(" ")}
      >
        {submitting ? "Registering..." : "Register"}
      </button>
    </form>
  );
};
