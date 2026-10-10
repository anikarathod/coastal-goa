import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSpinner,
  FaShieldAlt,
  FaPalmtree,
  FaCheck,
  FaTimes,
  FaArrowLeft,
  FaKey,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // If already logged in, redirect to admin
  useEffect(() => {
    if (user) {
      navigate("/pearlrathod", { replace: true });
    }
  }, [user, navigate]);

  const handleChange = ({ target }) => {
    const { name, value, type, checked } = target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (!form.email.trim() || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      if (!res.data?.success) {
        throw new Error(res.data?.message || "Login failed.");
      }

      if (!res.data?.token || !res.data?.admin) {
        throw new Error("Invalid login response from server.");
      }

      // Save login
      login(res.data.admin, res.data.token);

      // Optional: remember email for next time
      if (form.remember) {
        localStorage.setItem("rememberedEmail", form.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      // Redirect to admin dashboard
      navigate("/pearlrathod", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">

        {/* LEFT: BRANDING PANEL */}
        <div className="relative hidden flex-col justify-between bg-gradient-to-br from-teal-700 to-teal-900 p-10 text-white lg:flex">
          <div>
            <div className="flex items-center gap-2 text-2xl font-bold">
              <FaPalmtree />
              Coastal Goa
            </div>

            <h2 className="mt-12 text-3xl font-extrabold leading-tight">
              Admin Control Panel
            </h2>
            <p className="mt-4 text-teal-100">
              Manage packages, services, bookings, and customer
              enquiries from one place.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                <FaShieldAlt className="text-teal-200" />
              </div>
              <div>
                <p className="font-semibold">Secure Access</p>
                <p className="text-sm text-teal-100">
                  Protected admin-only area
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                <FaCheck className="text-teal-200" />
              </div>
              <div>
                <p className="font-semibold">Authorized Personnel Only</p>
                <p className="text-sm text-teal-100">
                  All activity is logged
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: LOGIN FORM */}
        <div className="p-6 sm:p-10">

          {/* Mobile logo */}
          <div className="mb-6 flex items-center justify-center gap-2 text-xl font-bold text-teal-700 lg:hidden">
            <FaPalmtree />
            Coastal Goa
          </div>

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Welcome Back
            </h1>
            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Sign in to access the admin dashboard.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 flex items-start gap-3 rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-700">
              <FaTimes className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* EMAIL */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="flex items-center rounded-lg border border-gray-200 bg-white px-4 transition focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-100">
                <FaEnvelope className="text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  placeholder="admin@coastalgoa.com"
                  className="w-full bg-transparent p-3 text-sm outline-none sm:text-base"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-teal-600 hover:underline sm:text-sm"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="flex items-center rounded-lg border border-gray-200 bg-white px-4 transition focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-100">
                <FaLock className="text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full bg-transparent p-3 text-sm outline-none sm:text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="ml-2 text-gray-400 transition hover:text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* REMEMBER ME */}
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
                className="h-4 w-4 cursor-pointer rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              Remember me on this device
            </label>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 py-3.5 font-semibold text-white shadow-sm transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Logging In...
                </>
              ) : (
                "Login to Dashboard"
              )}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
              or
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* BACK TO SITE */}
          <Link
            to="/"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 transition hover:border-teal-300 hover:text-teal-600"
          >
            <FaArrowLeft className="text-xs" />
            Back to Coastal Goa
          </Link>

          {/* REGISTER LINK (if you want public users to also use this) */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Need admin access?{" "}
            <Link
              to="/register"
              className="font-semibold text-teal-600 hover:underline"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;