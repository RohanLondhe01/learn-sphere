import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isEmail, passwordIssues } from "./Validation";
import { checkDuplicateEmail, registerUser } from "./Api";
import { InputField } from "./InputField";

export const RegistrationForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateField = async (name, value) => {
    let error = "";

    if (name === "name" && !value.trim()) {
      error = "Name is required";
    }

    if (name === "email") {
      if (!value.trim()) error = "Email is required";
      else if (!isEmail(value)) error = "Invalid email";
      else {
        const isDup = await checkDuplicateEmail(value);
        if (isDup) error = "Email already exists";
      }
    }

    if (name === "password") {
      if (!value) error = "Password is required";
      else {
        const pwdIssues = passwordIssues(value);
        if (pwdIssues.length) error = pwdIssues;
      }
    }

    if (name === "confirmPassword") {
      if (!value) error = "Confirm Password is required";
      else if (value !== form.password) error = "Passwords do not match";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const onChange = async (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    await validateField(name, value);
  };

  const validateAll = async () => {
    const fields = Object.keys(form);
    for (const field of fields) {
      await validateField(field, form[field]);
    }
    return Object.keys(errors).every((key) => !errors[key]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const isValid = await validateAll();
    if (!isValid) {
      setSubmitting(false);
      return;
    }

    await registerUser({
      name: form.name,
      email: form.email,
      password: form.password
    });

    const user = { name: form.name, email: form.email };
    localStorage.setItem("learnsphere_user", JSON.stringify(user));
    localStorage.setItem("studentName", form.name);

    window.dispatchEvent(new Event("userUpdated"));
    navigate("/dashboard");
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-md px-4 py-10">
      <h2 className="text-2xl font-bold text-slate-100 mb-6">
        Create your account
      </h2>

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
