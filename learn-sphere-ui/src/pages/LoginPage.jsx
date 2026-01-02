import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkDuplicateEmail } from "../components/registration/Api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const exists = await checkDuplicateEmail(email);
    setLoading(false);
    if (!exists) {
      setError("No account found for this email. Please register.");
      return;
    }

    // Minimal login: save user to localStorage
    // Use registered studentName if available, else fallback to 'Student'
    const registeredName = localStorage.getItem("studentName") || "Student";
    const user = { name: registeredName, email };
    localStorage.setItem("learnsphere_user", JSON.stringify(user));
    // notify same-window listeners
    window.dispatchEvent(new Event("userUpdated"));
    navigate("/dashboard");
  };

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h2 className="text-2xl font-bold text-slate-100 mb-6">Login</h2>
      <form onSubmit={onSubmit}>
        <label className="block mb-2 text-sm">Email</label>
        <input
          className="w-full rounded-md px-3 py-2 mb-4 bg-[var(--card)] border border-[var(--border)]"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2 text-sm">Password</label>
        <input
          className="w-full rounded-md px-3 py-2 mb-4 bg-[var(--card)] border border-[var(--border)]"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error ? (
          <div className="text-sm text-red-400 mb-3">{error}</div>
        ) : null}

        <button
          type="submit"
          className="w-full rounded-lg px-4 py-2.5 font-semibold text-white bg-gradient-to-tr from-indigo-600 to-blue-500"
          disabled={loading}
        >
          {loading ? "Checking..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
