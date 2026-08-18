import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
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
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = ({ target }) => {
    setForm((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      setLoading(true);

      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      };

      const res = await api.post("/auth/register", payload);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">

      <div className="mb-8 text-center">

        <h1 className="text-3xl font-bold">
          Create Account
        </h1>

        <p className="mt-2 text-gray-500">
          Join Coastal Goa and start exploring Goa.
        </p>

      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-100 p-3 text-red-600">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <div>

          <label className="mb-2 block font-medium">
            Full Name
          </label>

          <div className="flex items-center rounded-lg border px-4">

            <FaUser className="text-gray-400" />

            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full p-3 outline-none"
            />

          </div>

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Email
          </label>

          <div className="flex items-center rounded-lg border px-4">

            <FaEnvelope className="text-gray-400" />

            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full p-3 outline-none"
            />

          </div>

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Phone
          </label>

          <div className="flex items-center rounded-lg border px-4">

            <FaPhone className="text-gray-400" />

            <input
              type="tel"
              name="phone"
              required
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 91758 84119"
              className="w-full p-3 outline-none"
            />

          </div>

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Password
          </label>

          <div className="flex items-center rounded-lg border px-4">

            <FaLock className="text-gray-400" />

            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 outline-none"
            />

          </div>

        </div>

        <div>

          <label className="mb-2 block font-medium">
            Confirm Password
          </label>

          <div className="flex items-center rounded-lg border px-4">

            <FaLock className="text-gray-400" />

            <input
              type="password"
              name="confirmPassword"
              required
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full p-3 outline-none"
            />

          </div>

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-cyan-600 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:opacity-50"
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </button>

      </form>

      <div className="mt-6 text-center">

        <p className="text-gray-500">

          Already have an account?{" "}

          <Link
            to="/login"
            className="font-semibold text-cyan-600"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;