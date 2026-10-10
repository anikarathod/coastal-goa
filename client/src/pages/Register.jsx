import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheck,
  FaTimes,
  FaSpinner,
  FaShieldAlt,
  FaPalmtree,
} from "react-icons/fa";

import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = ({ target }) => {
    const { name, value, type, checked } = target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ---- PASSWORD STRENGTH ----
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, label: "", color: "" };

    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 10) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    const levels = [
      { score: 0, label: "", color: "" },
      { score: 1, label: "Very Weak", color: "bg-red-500" },
      { score: 2, label: "Weak", color: "bg-orange-500" },
      { score: 3, label: "Fair", color: "bg-yellow-500" },
      { score: 4, label: "Good", color: "bg-blue-500" },
      { score: 5, label: "Strong", color: "bg-green-500" },
    ];

    return levels[Math.min(score, 5)];
  };

  const passwordStrength = getPasswordStrength(form.password);
  const passwordsMatch =
    form.password && form.confirmPassword
      ? form.password === form.confirmPassword
      : null;

  // ---- SUBMIT ----
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!form.agreeToTerms) {
      setError("You must agree to the Terms & Conditions to continue.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        password: form.password,
      };

      const res = await api.post("/auth/register", payload);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">

        {/* LEFT: BRANDING PANEL (hidden on mobile) */}
        <div className="relative hidden flex-col justify-between bg-gradient-to-br from-teal-600 to-teal-800 p-10 text-white lg:flex">
          <div>
            <div className="flex items-center gap-2 text-2xl font-bold">
              <FaPalmtree />
              Coastal Goa
            </div>
            <h2 className="mt-12 text-3xl font-extrabold leading-tight">
              Start Your Goa Adventure
            </h2>
            <p className="mt-4 text-teal-100">
              Create an account to book unforgettable experiences,
              manage your trips, and get exclusive deals.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                <FaCheck className="text-teal-200" />
              </div>
              <div>
                <p className="font-semibold">Instant Booking</p>
                <p className="text-sm text-teal-100">
                  Book any tour in seconds
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                <FaShieldAlt className="text-teal-200" />
              </div>
              <div>
                <p className="font-semibold">Secure Payments</p>
                <p className="text-sm text-teal-100">
                  Your data is always safe
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: FORM PANEL */}
        <div className="p-6 sm:p-10">

          {/* Mobile logo */}
          <div className="mb-6 flex items-center justify-center gap-2 text-xl font-bold text-teal-700 lg:hidden">
            <FaPalmtree />
            Coastal Goa
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Create Account
            </h1>
            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Join Coastal Goa and start exploring.
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-5 flex items-start gap-3 rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-700">
              <FaTimes className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* NAME */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="flex items-center rounded-lg border border-gray-200 bg-white px-4 transition focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-100">
                <FaUser className="text-gray-400" />
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-transparent p-3 text-sm outline-none sm:text-base"
                />
              </div>
            </div>

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
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full bg-transparent p-3 text-sm outline-none sm:text-base"
                />
              </div>
            </div>

            {/* PHONE */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Phone
              </label>
              <div className="flex items-center rounded-lg border border-gray-200 bg-white px-4 transition focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-100">
                <FaPhone className="text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 91758 84119"
                  className="w-full bg-transparent p-3 text-sm outline-none sm:text-base"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="flex items-center rounded-lg border border-gray-200 bg-white px-4 transition focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-100">
                <FaLock className="text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password"
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

              {/* Password strength bar */}
              {form.password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-600">
                    {passwordStrength.label}
                  </span>
                </div>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div
                className={`flex items-center rounded-lg border bg-white px-4 transition focus-within:ring-2 ${
                  passwordsMatch === false
                    ? "border-red-300 focus-within:border-red-500 focus-within:ring-red-100"
                    : passwordsMatch === true
                    ? "border-green-300 focus-within:border-green-500 focus-within:ring-green-100"
                    : "border-gray-200 focus-within:border-teal-500 focus-within:ring-teal-100"
                }`}
              >
                <FaLock className="text-gray-400" />
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  required
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full bg-transparent p-3 text-sm outline-none sm:text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((prev) => !prev)}
                  className="ml-2 text-gray-400 transition hover:text-gray-600"
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {passwordsMatch === true && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-green-600">
                  <FaCheck className="text-[10px]" /> Passwords match
                </p>
              )}
              {passwordsMatch === false && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600">
                  <FaTimes className="text-[10px]" /> Passwords don't match
                </p>
              )}
            </div>

            {/* TERMS CHECKBOX */}
            <label className="flex items-start gap-3 text-sm text-gray-600">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={form.agreeToTerms}
                onChange={handleChange}
                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              <span>
                I agree to the{" "}
                <Link to="/terms" className="font-semibold text-teal-600 hover:underline">
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="font-semibold text-teal-600 hover:underline">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 py-3.5 font-semibold text-white shadow-sm transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* LOGIN LINK */}
          <div className="mt-6 text-center text-sm text-gray-500 sm:text-base">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-teal-600 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;