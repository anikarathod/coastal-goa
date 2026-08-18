import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaPaperPlane,
} from "react-icons/fa";
import api from "../../services/api";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/contact", formData);

      alert(
        "Your message has been sent successfully!"
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      alert("Unable to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-8 shadow-xl">

      <h2 className="mb-2 text-3xl font-bold text-gray-800">
        Contact Us
      </h2>

      <p className="mb-8 text-gray-500">
        We'd love to hear from you. Fill out the form below.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Name */}

        <div className="relative">
          <FaUser className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-xl border py-3 pl-12 pr-4 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Email */}

        <div className="relative">
          <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-xl border py-3 pl-12 pr-4 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Phone */}

        <div className="relative">
          <FaPhone className="absolute left-4 top-4 text-gray-400" />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full rounded-xl border py-3 pl-12 pr-4 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Subject */}

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full rounded-xl border p-3 focus:border-cyan-500 focus:outline-none"
        />

        {/* Message */}

        <textarea
          rows={6}
          name="message"
          placeholder="Write your message..."
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full rounded-xl border p-4 focus:border-cyan-500 focus:outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-cyan-600 px-6 py-4 font-semibold text-white transition hover:bg-cyan-700 disabled:opacity-60"
        >
          <FaPaperPlane />

          {loading
            ? "Sending..."
            : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;