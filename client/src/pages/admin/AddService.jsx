import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCloudUploadAlt,
  FaImage,
  FaTimes,
  FaCheckCircle,
  FaSpinner,
  FaInfoCircle,
  FaStar,
  FaEye,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa";

import api from "../../services/api";

const ADMIN_SERVICES_URL = "/pearlrathod/services";
const MAX_FILE_SIZE_MB = 5;

const AddService = () => {
  const navigate = useNavigate();
  const coverInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [coverDragActive, setCoverDragActive] = useState(false);

  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  const [form, setForm] = useState({
    title: "",
    category: "",
    shortDescription: "",
    description: "",
    location: "",
    startingPrice: "",
    rating: "",
    contactNumber: "",
    whatsappNumber: "",
    features: "",
    amenities: "",
    highlights: "",
    featured: false,
    isActive: true,
  });

  // ---- Object URL cleanup: cover ----
  useEffect(() => {
    if (!coverImage) {
      setCoverPreview(null);
      return;
    }
    const url = URL.createObjectURL(coverImage);
    setCoverPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [coverImage]);

  // ---- Object URL cleanup: gallery ----
  useEffect(() => {
    const urls = galleryImages.map((f) => URL.createObjectURL(f));
    setGalleryPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [galleryImages]);

  // ---- Handlers ----
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateImage = (f) => {
    if (!f.type.startsWith("image/")) return "Only image files are allowed.";
    if (f.size / (1024 * 1024) > MAX_FILE_SIZE_MB)
      return `Image is too large (max ${MAX_FILE_SIZE_MB}MB).`;
    return null;
  };

  const handleCoverSelect = (f) => {
    const err = validateImage(f);
    if (err) return alert(err);
    setCoverImage(f);
  };

  const handleCoverDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCoverDragActive(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) handleCoverSelect(dropped);
  };

  const handleGallerySelect = (files) => {
    const valid = [];
    for (const f of files) {
      if (!validateImage(f)) valid.push(f);
    }
    setGalleryImages(valid);
  };

  const removeGalleryImage = (index) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.title.trim()) newErrors.title = "Title is required.";
    if (!form.category) newErrors.category = "Category is required.";
    if (!form.description.trim())
      newErrors.description = "Description is required.";
    if (!form.startingPrice) newErrors.startingPrice = "Price is required.";
    if (!coverImage) newErrors.coverImage = "Cover image is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("shortDescription", form.shortDescription);
      formData.append("description", form.description);
      formData.append("location", form.location);
      formData.append("startingPrice", form.startingPrice);
      formData.append("rating", form.rating);
      formData.append("contactNumber", form.contactNumber);
      formData.append("whatsappNumber", form.whatsappNumber);

      formData.append(
        "features",
        JSON.stringify(form.features.split("\n").filter(Boolean))
      );

      formData.append(
        "amenities",
        JSON.stringify(form.amenities.split("\n").filter(Boolean))
      );

      formData.append(
        "highlights",
        JSON.stringify(form.highlights.split("\n").filter(Boolean))
      );

      formData.append("featured", form.featured);
      formData.append("isActive", form.isActive);

      if (coverImage) {
        formData.append("coverImage", coverImage);
      }

      galleryImages.forEach((file) => {
        formData.append("galleryImages", file);
      });

      await api.post("/services", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Service added successfully!");
      navigate(ADMIN_SERVICES_URL);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add service");
    } finally {
      setLoading(false);
    }
  };

  // ---- Shared styles ----
  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white p-3 text-sm shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 sm:text-base";

  const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";

  const sectionClass =
    "rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7";

  return (
    <div className="mx-auto max-w-6xl pb-16">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Add Service
        </h1>
        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          Fill in the details below to add a new service.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* BASIC INFO */}
        <section className={sectionClass}>
          <h2 className="mb-5 text-lg font-bold text-gray-900 sm:text-xl">
            📋 Basic Information
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>
                Service Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Luxury Villa in Candolim"
                className={`${inputClass} ${
                  errors.title ? "border-red-300 focus:ring-red-100" : ""
                }`}
              />
              {errors.title && (
                <p className="mt-1 text-xs text-red-600">{errors.title}</p>
              )}
            </div>

            <div>
              <label className={labelClass}>
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={`${inputClass} ${
                  errors.category ? "border-red-300 focus:ring-red-100" : ""
                }`}
              >
                <option value="">Select Category</option>
                <option value="Hotel">Hotel</option>
                <option value="Villa">Villa</option>
                <option value="Guest House">Guest House</option>
                <option value="Taxi">Taxi</option>
                <option value="Cruise">Cruise</option>
                <option value="Bike Rental">Bike Rental</option>
                <option value="Car Rental">Car Rental</option>
                <option value="Other">Other</option>
              </select>
              {errors.category && (
                <p className="mt-1 text-xs text-red-600">{errors.category}</p>
              )}
            </div>

            <div>
              <label className={labelClass}>Location</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Candolim, North Goa"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Starting Price (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="startingPrice"
                value={form.startingPrice}
                onChange={handleChange}
                min="0"
                placeholder="2500"
                className={`${inputClass} ${
                  errors.startingPrice
                    ? "border-red-300 focus:ring-red-100"
                    : ""
                }`}
              />
              {errors.startingPrice && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.startingPrice}
                </p>
              )}
            </div>

            <div>
              <label className={labelClass}>Rating</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                name="rating"
                value={form.rating}
                onChange={handleChange}
                placeholder="4.5"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Contact Number</label>
              <input
                type="tel"
                name="contactNumber"
                value={form.contactNumber}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className={inputClass}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>WhatsApp Number</label>
              <input
                type="tel"
                name="whatsappNumber"
                value={form.whatsappNumber}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* DESCRIPTIONS */}
        <section className={sectionClass}>
          <h2 className="mb-5 text-lg font-bold text-gray-900 sm:text-xl">
            📝 Descriptions
          </h2>

          <div className="space-y-5">
            <div>
              <label className={labelClass}>Short Description</label>
              <textarea
                rows={2}
                name="shortDescription"
                value={form.shortDescription}
                onChange={handleChange}
                placeholder="A quick one-liner about the service..."
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Full Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={5}
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the service in detail..."
                className={`${inputClass} ${
                  errors.description ? "border-red-300 focus:ring-red-100" : ""
                }`}
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.description}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* COVER IMAGE */}
        <section className={sectionClass}>
          <h2 className="mb-5 text-lg font-bold text-gray-900 sm:text-xl">
            📸 Cover Image <span className="text-red-500">*</span>
          </h2>

          {!coverImage ? (
            <div
              onDrop={handleCoverDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setCoverDragActive(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setCoverDragActive(false);
              }}
              onClick={() => coverInputRef.current?.click()}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition sm:p-10 ${
                coverDragActive
                  ? "border-teal-500 bg-teal-50"
                  : errors.coverImage
                  ? "border-red-300 bg-red-50/30"
                  : "border-gray-300 bg-gray-50 hover:border-teal-400 hover:bg-teal-50/30"
              }`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                <FaCloudUploadAlt className="text-2xl text-teal-600" />
              </div>
              <p className="mt-3 text-sm font-semibold text-gray-900">
                {coverDragActive
                  ? "Drop image here"
                  : "Click or drag the cover image here"}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                JPG, PNG, WEBP up to {MAX_FILE_SIZE_MB}MB
              </p>
              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                onChange={(e) =>
                  e.target.files?.[0] && handleCoverSelect(e.target.files[0])
                }
                className="hidden"
              />
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
              <div className="relative">
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="max-h-96 w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setCoverImage(null);
                    if (coverInputRef.current) coverInputRef.current.value = "";
                  }}
                  className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-white backdrop-blur-sm transition hover:bg-black/80"
                  aria-label="Remove cover image"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="flex items-center justify-between p-3">
                <p className="truncate text-xs text-gray-600">
                  {coverImage.name}
                </p>
                <p className="flex items-center gap-1 text-xs font-semibold text-green-600">
                  <FaCheckCircle /> Ready
                </p>
              </div>
            </div>
          )}

          {errors.coverImage && (
            <p className="mt-2 text-xs text-red-600">{errors.coverImage}</p>
          )}
        </section>

        {/* GALLERY IMAGES */}
        <section className={sectionClass}>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
              🖼️ Gallery Images
            </h2>
            <button
              type="button"
              onClick={() => galleryInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-teal-50 px-3 py-2 text-xs font-semibold text-teal-700 transition hover:bg-teal-100 sm:text-sm"
            >
              <FaImage /> Add Images
            </button>
          </div>

          {galleryImages.length === 0 ? (
            <div
              onClick={() => galleryInputRef.current?.click()}
              className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center transition hover:border-teal-400 hover:bg-teal-50/30"
            >
              <FaImage className="text-3xl text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Add multiple images to showcase your service
              </p>
              <p className="mt-1 text-xs text-gray-400">
                You can select several files at once
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {galleryImages.map((img, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl border border-gray-100 bg-gray-50"
                >
                  <img
                    src={galleryPreviews[index]}
                    alt={`Gallery ${index + 1}`}
                    className="h-28 w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white opacity-0 transition group-hover:opacity-100"
                    aria-label="Remove image"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) =>
              handleGallerySelect(Array.from(e.target.files || []))
            }
            className="hidden"
          />
        </section>

        {/* FEATURES / AMENITIES / HIGHLIGHTS */}
        <section className={sectionClass}>
          <h2 className="mb-5 text-lg font-bold text-gray-900 sm:text-xl">
            ⚙️ Features & Highlights
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>
                Features{" "}
                <span className="text-xs font-normal text-gray-500">
                  (one per line)
                </span>
              </label>
              <textarea
                rows={6}
                name="features"
                value={form.features}
                onChange={handleChange}
                placeholder={"Wi-Fi\nPool\nFree Parking\n24/7 Support"}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Amenities{" "}
                <span className="text-xs font-normal text-gray-500">
                  (one per line)
                </span>
              </label>
              <textarea
                rows={6}
                name="amenities"
                value={form.amenities}
                onChange={handleChange}
                placeholder={"Air Conditioning\nKitchen\nSea View"}
                className={inputClass}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>
                Highlights{" "}
                <span className="text-xs font-normal text-gray-500">
                  (one per line)
                </span>
              </label>
              <textarea
                rows={5}
                name="highlights"
                value={form.highlights}
                onChange={handleChange}
                placeholder={"5 min walk to beach\nSunset view from terrace"}
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* SETTINGS */}
        <section className={sectionClass}>
          <h2 className="mb-4 text-lg font-bold text-gray-900 sm:text-xl">
            ⚙️ Service Settings
          </h2>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/60 p-3 transition hover:bg-gray-50">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="mt-0.5 h-4 w-4 cursor-pointer rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              <span className="text-sm">
                <span className="flex items-center gap-1.5 font-semibold text-gray-900">
                  <FaStar className="text-yellow-500" /> Featured
                </span>
                <span className="text-xs text-gray-500">
                  Shows in the homepage spotlight
                </span>
              </span>
            </label>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/60 p-3 transition hover:bg-gray-50">
              <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
                className="mt-0.5 h-4 w-4 cursor-pointer rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              <span className="text-sm">
                <span className="flex items-center gap-1.5 font-semibold text-gray-900">
                  <FaEye className="text-green-600" /> Active
                </span>
                <span className="text-xs text-gray-500">
                  Visible on the public site
                </span>
              </span>
            </label>
          </div>
        </section>

        {/* ACTIONS */}
        <div className="sticky bottom-0 -mx-4 flex flex-col-reverse gap-3 border-t border-gray-100 bg-white/95 px-4 py-4 backdrop-blur-sm sm:-mx-6 sm:flex-row sm:justify-end sm:px-6">
          <button
            type="button"
            onClick={() => navigate(ADMIN_SERVICES_URL)}
            disabled={loading}
            className="rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                Saving...
              </>
            ) : (
              "Save Service"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddService;