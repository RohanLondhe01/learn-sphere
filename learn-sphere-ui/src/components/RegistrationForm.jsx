import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isEmail, passwordIssues } from "./Validation";
import { checkDuplicateEmail, registerUser } from "./Api";
import { InputField } from "./InputField";

export const RegistrationForm = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateAll = async () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!isEmail(form.email)) newErrors.email = "Invalid email";

    const pwdIssues = passwordIssues(form.password);
    if (!form.password) newErrors.password = "Password is required";
    else if (pwdIssues.length)
      newErrors.password = `Password must include: ${pwdIssues.join(", ")}`;

    if (!newErrors.email) {
      const isDup = await checkDuplicateEmail(form.email);
      if (isDup) newErrors.email = "Email already exists";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const isValid = await validateAll();
    if (!isValid) {
      setSubmitting(false);
      return;
    }

    await registerUser({ name: form.name, email: form.email });
    const user = { name: form.name, email: form.email };
    localStorage.setItem("learnsphere_user", JSON.stringify(user));
    localStorage.setItem("studentName", form.name);
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
