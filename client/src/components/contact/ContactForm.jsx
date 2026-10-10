import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaPaperPlane,
  FaSpinner,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../../services/api";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.trim().length < 2)
      newErrors.name = "Name is too short";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Enter a valid email";

    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^[\d\s+()-]{7,15}$/.test(formData.phone))
      newErrors.phone = "Enter a valid phone number";

    if (!formData.subject.trim()) newErrors.subject = "Subject is required";

    if (!formData.message.trim()) newErrors.message = "Message is required";
    else if (formData.message.trim().length < 10)
      newErrors.message = "Message is too short";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);

    if (!validate()) {
      toast.error("Please fix the highlighted fields");
      return;
    }

    try {
      setLoading(true);

      await api.post("/contact", formData);

      setSuccess(true);
      toast.success("Message sent! We'll get back to you soon.");

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setErrors({});

      // Reset success banner after 5s
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message ||
          "Unable to send message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Send Us a Message
        </h2>
        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          We'll get back to you within 24 hours. Fill in the form below.
        </p>
      </div>

      {/* SUCCESS BANNER */}
      {success && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-100 bg-green-50 p-4 text-sm text-green-700">
          <FaCheckCircle className="mt-0.5 shrink-0 text-lg" />
          <div>
            <p className="font-semibold">Message sent successfully!</p>
            <p className="mt-0.5 text-green-600">
              We'll be in touch with you shortly.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* NAME */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div
            className={`relative flex items-center rounded-xl border bg-white transition focus-within:ring-2 ${
              errors.name
                ? "border-red-300 focus-within:border-red-500 focus-within:ring-red-100"
                : "border-gray-200 focus-within:border-teal-500 focus-within:ring-teal-100"
            }`}
          >
            <FaUser className="absolute left-4 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl bg-transparent py-3.5 pl-11 pr-4 text-sm outline-none sm:text-base"
            />
          </div>
          {errors.name && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
              <FaExclamationCircle className="text-[10px]" />
              {errors.name}
            </p>
          )}
        </div>

        {/* EMAIL + PHONE (2-col on larger screens) */}
        <div className="grid gap-5 sm:grid-cols-2">

          {/* EMAIL */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <div
              className={`relative flex items-center rounded-xl border bg-white transition focus-within:ring-2 ${
                errors.email
                  ? "border-red-300 focus-within:border-red-500 focus-within:ring-red-100"
                  : "border-gray-200 focus-within:border-teal-500 focus-within:ring-teal-100"
              }`}
            >
              <FaEnvelope className="absolute left-4 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl bg-transparent py-3.5 pl-11 pr-4 text-sm outline-none sm:text-base"
              />
            </div>
            {errors.email && (
              <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                <FaExclamationCircle className="text-[10px]" />
                {errors.email}
              </p>
            )}
          </div>

          {/* PHONE */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Phone <span className="text-red-500">*</span>
            </label>
            <div
              className={`relative flex items-center rounded-xl border bg-white transition focus-within:ring-2 ${
                errors.phone
                  ? "border-red-300 focus-within:border-red-500 focus-within:ring-red-100"
                  : "border-gray-200 focus-within:border-teal-500 focus-within:ring-teal-100"
              }`}
            >
              <FaPhone className="absolute left-4 text-gray-400" />
              <input
                type="tel"
                name="phone"
                placeholder="+91 91758 84119"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full rounded-xl bg-transparent py-3.5 pl-11 pr-4 text-sm outline-none sm:text-base"
              />
            </div>
            {errors.phone && (
              <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
                <FaExclamationCircle className="text-[10px]" />
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* SUBJECT */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="subject"
            placeholder="How can we help you?"
            value={formData.subject}
            onChange={handleChange}
            required
            className={`w-full rounded-xl border bg-white p-3.5 text-sm transition focus:outline-none focus:ring-2 sm:text-base ${
              errors.subject
                ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                : "border-gray-200 focus:border-teal-500 focus:ring-teal-100"
            }`}
          />
          {errors.subject && (
            <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
              <FaExclamationCircle className="text-[10px]" />
              {errors.subject}
            </p>
          )}
        </div>

        {/* MESSAGE */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={5}
            name="message"
            placeholder="Tell us about your trip plans or questions..."
            value={formData.message}
            onChange={handleChange}
            required
            className={`w-full resize-none rounded-xl border bg-white p-3.5 text-sm transition focus:outline-none focus:ring-2 sm:text-base ${
              errors.message
                ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                : "border-gray-200 focus:border-teal-500 focus:ring-teal-100"
            }`}
          />
          <div className="mt-1 flex items-center justify-between gap-3">
            {errors.message ? (
              <p className="flex items-center gap-1 text-xs text-red-600">
                <FaExclamationCircle className="text-[10px]" />
                {errors.message}
              </p>
            ) : (
              <span className="text-xs text-gray-400">
                Minimum 10 characters
              </span>
            )}
            <span className="text-xs text-gray-400">
              {formData.message.length} / 1000
            </span>
          </div>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:text-base"
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <FaPaperPlane />
              Send Message
            </>
          )}
        </button>

        <p className="text-center text-xs text-gray-400">
          We typically reply within a few hours during business hours.
        </p>
      </form>
    </div>
  );
};

export default ContactForm;