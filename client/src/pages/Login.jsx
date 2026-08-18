import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // Handle Input
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // Login
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.email.trim() || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      console.log("LOGIN RESPONSE:", res.data);

      if (!res.data?.success) {
        throw new Error(
          res.data?.message || "Login failed."
        );
      }

      if (!res.data?.token || !res.data?.admin) {
        throw new Error(
          "Invalid login response from server."
        );
      }

      // ========================================
      // Save Admin Login
      // ========================================

      login(
        res.data.admin,
        res.data.token
      );

      // ========================================
      // Go to Admin Dashboard
      // ========================================

      navigate("/admin", {
        replace: true,
      });

    } catch (err) {
      console.error("LOGIN ERROR:", err);

      setError(
        err.response?.data?.message ||
        err.message ||
        "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

      {/* Header */}

      <div className="mb-8 text-center">

        <h1 className="text-3xl font-bold text-gray-900">
          Welcome Back
        </h1>

        <p className="mt-2 text-gray-500">
          Login to continue your journey.
        </p>

      </div>

      {/* Error */}

      {error && (
        <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Email */}

        <div>

          <label className="mb-2 block font-medium text-gray-900">
            Email
          </label>

          <div className="flex items-center rounded-lg border border-gray-300 px-4 focus-within:border-cyan-600">

            <FaEnvelope className="text-gray-400" />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="w-full p-3 outline-none"
              placeholder="Enter email"
            />

          </div>

        </div>

        {/* Password */}

        <div>

          <label className="mb-2 block font-medium text-gray-900">
            Password
          </label>

          <div className="flex items-center rounded-lg border border-gray-300 px-4 focus-within:border-cyan-600">

            <FaLock className="text-gray-400" />

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              className="w-full p-3 outline-none"
              placeholder="Enter password"
            />

          </div>

        </div>

        {/* Login Button */}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-cyan-600 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Logging In..."
            : "Login"}
        </button>

      </form>

      {/* Register */}

      <div className="mt-6 text-center">

        <p className="text-gray-500">
          Don't have an account?{" "}

          <Link
            to="/register"
            className="font-semibold text-cyan-600 hover:text-cyan-700"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Login;