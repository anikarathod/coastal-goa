import { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import Rating from "./Rating";
import api from "../../services/api";

const ReviewForm = ({
  packageId = "",
  serviceId = "",
  onSuccess,
}) => {
  const [packages, setPackages] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    review: "",
    package: packageId,
    service: serviceId,
  });

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const [packageRes, serviceRes] = await Promise.all([
        api.get("/packages"),
        api.get("/services"),
      ]);

      setPackages(
        Array.isArray(packageRes?.data?.packages)
          ? packageRes.data.packages
          : []
      );

      setServices(
        Array.isArray(serviceRes?.data?.services)
          ? serviceRes.data.services
          : []
      );
    } catch (error) {
      console.error("Error fetching options:", error);
      setPackages([]);
      setServices([]);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitReview = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.review
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post(
        "/reviews",
        formData
      );

      alert("Review submitted successfully!");

      setFormData({
        name: "",
        email: "",
        rating: 5,
        review: "",
        package: packageId,
        service: serviceId,
      });

      if (onSuccess) {
        onSuccess(res.data);
      }
    } catch (err) {
      console.error(err);
      alert("Unable to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submitReview}
      className="rounded-2xl bg-white p-8 shadow-lg"
    >
      <h2 className="mb-8 text-3xl font-bold">
        Share Your Experience
      </h2>

      {/* Name */}
      <div className="mb-5">
        <label className="mb-2 block font-medium">
          Full Name
        </label>

        <div className="relative">
          <FaUser className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full rounded-xl border py-3 pl-12 pr-4 focus:border-cyan-500 focus:outline-none"
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className="mb-5">
        <label className="mb-2 block font-medium">
          Email
        </label>

        <div className="relative">
          <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full rounded-xl border py-3 pl-12 pr-4 focus:border-cyan-500 focus:outline-none"
            required
          />
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <label className="mb-3 block font-medium">
          Rating
        </label>

        <Rating
          value={formData.rating}
          interactive
          size="text-3xl"
          onChange={(rating) =>
            setFormData((prev) => ({
              ...prev,
              rating,
            }))
          }
        />
      </div>

      {/* Package */}
      {!packageId && (
        <div className="mb-5">
          <label className="mb-2 block font-medium">
            Tour Package (Optional)
          </label>

          <select
            name="package"
            value={formData.package}
            onChange={handleChange}
            className="w-full rounded-xl border p-3 focus:border-cyan-500 focus:outline-none"
          >
            <option value="">
              Select Package
            </option>

            {Array.isArray(packages) &&
              packages.map((pkg) => (
                <option
                  key={pkg._id}
                  value={pkg._id}
                >
                  {pkg.title}
                </option>
              ))}
          </select>
        </div>
      )}

      {/* Service */}
      {!serviceId && (
        <div className="mb-5">
          <label className="mb-2 block font-medium">
            Service (Optional)
          </label>

          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full rounded-xl border p-3 focus:border-cyan-500 focus:outline-none"
          >
            <option value="">
              Select Service
            </option>

            {Array.isArray(services) &&
              services.map((service) => (
                <option
                  key={service._id}
                  value={service._id}
                >
                  {service.title}
                </option>
              ))}
          </select>
        </div>
      )}

      {/* Review */}
      <div className="mb-8">
        <label className="mb-2 block font-medium">
          Your Review
        </label>

        <textarea
          rows={5}
          name="review"
          value={formData.review}
          onChange={handleChange}
          placeholder="Tell us about your experience..."
          className="w-full rounded-xl border p-4 focus:border-cyan-500 focus:outline-none"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-3 rounded-xl bg-cyan-600 px-6 py-4 font-semibold text-white transition hover:bg-cyan-700 disabled:opacity-60"
      >
        <FaPaperPlane />

        {loading
          ? "Submitting..."
          : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;