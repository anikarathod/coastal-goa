import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCloudUploadAlt,
  FaImage,
  FaTimes,
  FaPlus,
  FaTrash,
  FaCheckCircle,
  FaSpinner,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaStar,
  FaEye,
} from "react-icons/fa";

import api from "../../services/api";

const ADMIN_PACKAGES_URL = "/pearlrathod/packages";
const MAX_FILE_SIZE_MB = 5;

const AddPackage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    title: "",
    slug: "",
    shortDescription: "",
    description: "",
    category: "Tour",
    location: "",
    duration: "",
    price: "",
    discountPrice: "",
    latitude: "",
    longitude: "",
    featured: false,
    isActive: true,
  });

  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [coverDragActive, setCoverDragActive] = useState(false);

  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  const [highlights, setHighlights] = useState([""]);
  const [inclusions, setInclusions] = useState([""]);
  const [exclusions, setExclusions] = useState([""]);
  const [sections, setSections] = useState([{ title: "", content: "" }]);
  const [itinerary, setItinerary] = useState([
    { day: "Day 1", title: "", description: "" },
  ]);
  const [extraDetails, setExtraDetails] = useState([
    { title: "", description: "" },
  ]);

  // Clean up cover preview URL
  useEffect(() => {
    if (!coverImage) {
      setCoverPreview(null);
      return;
    }
    const url = URL.createObjectURL(coverImage);
    setCoverPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [coverImage]);

  // Clean up gallery preview URLs
  useEffect(() => {
    const urls = galleryImages.map((f) => URL.createObjectURL(f));
    setGalleryPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [galleryImages]);

  // ---------- FORM HANDLERS ----------
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    if (name === "title") {
      setForm((prev) => ({
        ...prev,
        title: value,
        slug: value
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, ""),
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const updateArrayItem = (setter, array, index, value) => {
    setter(array.map((item, i) => (i === index ? value : item)));
  };

  const addArrayItem = (setter, array) => setter([...array, ""]);
  const removeArrayItem = (setter, array, index) =>
    setter(array.filter((_, i) => i !== index));

  const updateItinerary = (index, field, value) =>
    setItinerary((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );

  const addItinerary = () =>
    setItinerary((prev) => [
      ...prev,
      { day: `Day ${prev.length + 1}`, title: "", description: "" },
    ]);

  const removeItinerary = (index) =>
    setItinerary((prev) => prev.filter((_, i) => i !== index));

  const addSection = () =>
    setSections((prev) => [...prev, { title: "", content: "" }]);

  const removeSection = (index) =>
    setSections((prev) => prev.filter((_, i) => i !== index));

  const updateSection = (index, field, value) =>
    setSections((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );

  const updateExtraDetail = (index, field, value) =>
    setExtraDetails((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );

  const addExtraDetail = () =>
    setExtraDetails((prev) => [...prev, { title: "", description: "" }]);

  const removeExtraDetail = (index) =>
    setExtraDetails((prev) => prev.filter((_, i) => i !== index));

  // ---------- FILE HANDLERS ----------
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

  // ---------- SUBMIT ----------
  const validateForm = () => {
    const newErrors = {};

    if (!form.title.trim()) newErrors.title = "Title is required.";
    if (!form.location.trim()) newErrors.location = "Location is required.";
    if (!form.description.trim())
      newErrors.description = "Description is required.";
    if (!form.price) newErrors.price = "Price is required.";
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

      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      );

      formData.append(
        "highlights",
        JSON.stringify(highlights.filter((item) => item.trim()))
      );
      formData.append(
        "inclusions",
        JSON.stringify(inclusions.filter((item) => item.trim()))
      );
      formData.append(
        "exclusions",
        JSON.stringify(exclusions.filter((item) => item.trim()))
      );
      formData.append(
        "itinerary",
        JSON.stringify(
          itinerary.filter(
            (item) => item.title.trim() || item.description.trim()
          )
        )
      );
      formData.append(
        "sections",
        JSON.stringify(
          sections.filter((item) => item.title.trim() || item.content.trim())
        )
      );
      formData.append(
        "extraDetails",
        JSON.stringify(
          extraDetails.filter(
            (item) => item.title.trim() || item.description.trim()
          )
        )
      );

      formData.append("coverImage", coverImage);

      galleryImages.forEach((image) => formData.append("images", image));

      await api.post("/packages", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Package added successfully!");
      navigate(ADMIN_PACKAGES_URL);
    } catch (error) {
      console.error("Add Package Error:", error);
      alert(error.response?.data?.message || "Failed to add package.");
    } finally {
      setLoading(false);
    }
  };

  // ---------- SHARED STYLES ----------
  const inputClass =
    "w-full min-w-0 rounded-lg border border-gray-200 bg-white p-3 text-sm shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 sm:text-base";

  const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";

  const sectionClass =
    "rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7";

  const smallButtonClass =
    "inline-flex items-center gap-1.5 rounded-lg bg-teal-50 px-3 py-2 text-xs font-semibold text-teal-700 transition hover:bg-teal-100 sm:text-sm";

  const dangerButtonClass =
    "inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100 sm:text-sm";

  return (
    <div className="mx-auto max-w-6xl pb-16">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Add Tour Package
        </h1>
        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          Fill in the details below to create a new package.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* BASIC INFORMATION */}
        <section className={sectionClass}>
          <h2 className="mb-5 text-lg font-bold text-gray-900 sm:text-xl">
            📋 Basic Information
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>
                Package Title <span className="text-red-500">*</span>
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="North Goa Sightseeing"
                className={`${inputClass} ${
                  errors.title ? "border-red-300 focus:ring-red-100" : ""
                }`}
              />
              {errors.title && (
                <p className="mt-1 text-xs text-red-600">{errors.title}</p>
              )}
            </div>

            <div>
              <label className={labelClass}>Category</label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Sightseeing"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Location <span className="text-red-500">*</span>
              </label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="North Goa"
                className={`${inputClass} ${
                  errors.location ? "border-red-300 focus:ring-red-100" : ""
                }`}
              />
              {errors.location && (
                <p className="mt-1 text-xs text-red-600">{errors.location}</p>
              )}
            </div>

            <div>
              <label className={labelClass}>Duration</label>
              <input
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="1 Day"
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-5">
            <label className={labelClass}>Short Description</label>
            <input
              name="shortDescription"
              value={form.shortDescription}
              onChange={handleChange}
              placeholder="Explore the best places in North Goa."
              className={inputClass}
            />
          </div>

          <div className="mt-5">
            <label className={labelClass}>
              Full Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              placeholder="Write the complete package description..."
              className={`${inputClass} ${
                errors.description ? "border-red-300 focus:ring-red-100" : ""
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-600">{errors.description}</p>
            )}
          </div>
        </section>

        {/* PRICING */}
        <section className={sectionClass}>
          <h2 className="mb-5 text-lg font-bold text-gray-900 sm:text-xl">
            💰 Pricing
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>
                Original Price (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                min="0"
                placeholder="1500"
                className={`${inputClass} ${
                  errors.price ? "border-red-300 focus:ring-red-100" : ""
                }`}
              />
              {errors.price && (
                <p className="mt-1 text-xs text-red-600">{errors.price}</p>
              )}
            </div>

            <div>
              <label className={labelClass}>Discount Price (₹)</label>
              <input
                type="number"
                name="discountPrice"
                value={form.discountPrice}
                onChange={handleChange}
                min="0"
                placeholder="1299"
                className={inputClass}
              />
            </div>
          </div>

          <p className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
            <FaInfoCircle className="shrink-0" />
            Leave Discount Price empty if no discount applies.
          </p>
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
              onClick={() => fileInputRef.current?.click()}
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
                  : "Click or drag your cover image here"}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                JPG, PNG, WEBP up to {MAX_FILE_SIZE_MB}MB
              </p>
              <input
                ref={fileInputRef}
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
                    if (fileInputRef.current) fileInputRef.current.value = "";
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
              className={smallButtonClass}
            >
              <FaPlus /> Add Images
            </button>
          </div>

          {galleryImages.length === 0 ? (
            <div
              onClick={() => galleryInputRef.current?.click()}
              className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center transition hover:border-teal-400 hover:bg-teal-50/30"
            >
              <FaImage className="text-3xl text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Add multiple images to showcase your package
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

        {/* HIGHLIGHTS */}
        <section className={sectionClass}>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
              ⭐ Highlights
            </h2>
            <button
              type="button"
              onClick={() => addArrayItem(setHighlights, highlights)}
              className={smallButtonClass}
            >
              <FaPlus /> Add Highlight
            </button>
          </div>

          <div className="space-y-2">
            {highlights.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  value={item}
                  onChange={(e) =>
                    updateArrayItem(
                      setHighlights,
                      highlights,
                      index,
                      e.target.value
                    )
                  }
                  placeholder="Fort Aguada"
                  className={inputClass}
                />
                {highlights.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      removeArrayItem(setHighlights, highlights, index)
                    }
                    className={dangerButtonClass}
                    aria-label="Remove"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ITINERARY */}
        <section className={sectionClass}>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
              🗓️ Itinerary
            </h2>
            <button
              type="button"
              onClick={addItinerary}
              className={smallButtonClass}
            >
              <FaPlus /> Add Day
            </button>
          </div>

          <div className="space-y-4">
            {itinerary.map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-100 bg-gray-50/50 p-4"
              >
                <div className="grid gap-3 md:grid-cols-3">
                  <input
                    value={item.day}
                    onChange={(e) =>
                      updateItinerary(index, "day", e.target.value)
                    }
                    placeholder="Day 1"
                    className={inputClass}
                  />
                  <input
                    value={item.title}
                    onChange={(e) =>
                      updateItinerary(index, "title", e.target.value)
                    }
                    placeholder="North Goa Sightseeing"
                    className={`${inputClass} md:col-span-2`}
                  />
                </div>

                <textarea
                  value={item.description}
                  onChange={(e) =>
                    updateItinerary(index, "description", e.target.value)
                  }
                  rows={3}
                  placeholder="Hotel pickup → Fort Aguada → Candolim Beach..."
                  className={`${inputClass} mt-3`}
                />

                {itinerary.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItinerary(index)}
                    className={`${dangerButtonClass} mt-3`}
                  >
                    <FaTrash /> Remove Day
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* INCLUSIONS / EXCLUSIONS */}
        <section className="grid gap-6 md:grid-cols-2">
          {[
            {
              title: "✅ What's Included",
              items: inclusions,
              setter: setInclusions,
              placeholder: "Hotel pickup",
              color: "green",
            },
            {
              title: "❌ What's Not Included",
              items: exclusions,
              setter: setExclusions,
              placeholder: "Personal expenses",
              color: "red",
            },
          ].map(({ title, items, setter, placeholder }) => (
            <div key={title} className={sectionClass}>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                  {title}
                </h2>
                <button
                  type="button"
                  onClick={() => addArrayItem(setter, items)}
                  className={smallButtonClass}
                >
                  <FaPlus />
                </button>
              </div>

              <div className="space-y-2">
                {items.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      value={item}
                      onChange={(e) =>
                        updateArrayItem(setter, items, index, e.target.value)
                      }
                      placeholder={placeholder}
                      className={inputClass}
                    />
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem(setter, items, index)}
                        className={dangerButtonClass}
                        aria-label={`Remove item ${index + 1}`}
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* CUSTOM SECTIONS */}
        <section className={sectionClass}>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
              📝 Custom Sections
            </h2>
            <button
              type="button"
              onClick={addSection}
              className={smallButtonClass}
            >
              <FaPlus /> Add Section
            </button>
          </div>

          <div className="space-y-4">
            {sections.map((section, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-100 bg-gray-50/50 p-4"
              >
                <div className="mb-3 flex gap-2">
                  <input
                    value={section.title}
                    onChange={(e) =>
                      updateSection(index, "title", e.target.value)
                    }
                    placeholder="Section Title (e.g., Cancellation Policy)"
                    className={inputClass}
                  />
                  {sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSection(index)}
                      className={dangerButtonClass}
                      aria-label="Remove section"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>

                <textarea
                  rows={4}
                  value={section.content}
                  onChange={(e) =>
                    updateSection(index, "content", e.target.value)
                  }
                  placeholder="Section content..."
                  className={inputClass}
                />
              </div>
            ))}
          </div>
        </section>

        {/* EXTRA DETAILS */}
        <section className={sectionClass}>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
              ℹ️ Extra Details
            </h2>
            <button
              type="button"
              onClick={addExtraDetail}
              className={smallButtonClass}
            >
              <FaPlus /> Add Detail
            </button>
          </div>

          <div className="space-y-4">
            {extraDetails.map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-100 bg-gray-50/50 p-4"
              >
                <div className="mb-3 flex gap-2">
                  <input
                    value={item.title}
                    onChange={(e) =>
                      updateExtraDetail(index, "title", e.target.value)
                    }
                    placeholder="Detail title (e.g., Things to Bring)"
                    className={inputClass}
                  />
                  {extraDetails.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExtraDetail(index)}
                      className={dangerButtonClass}
                      aria-label="Remove detail"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
                <textarea
                  value={item.description}
                  onChange={(e) =>
                    updateExtraDetail(index, "description", e.target.value)
                  }
                  rows={3}
                  placeholder="Write additional information..."
                  className={inputClass}
                />
              </div>
            ))}
          </div>
        </section>

        {/* MAP LOCATION */}
        <section className={sectionClass}>
          <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-gray-900 sm:text-xl">
            <FaMapMarkerAlt className="text-teal-600" /> Map Location
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>Latitude</label>
              <input
                type="number"
                step="any"
                name="latitude"
                value={form.latitude}
                onChange={handleChange}
                placeholder="15.4909"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Longitude</label>
              <input
                type="number"
                step="any"
                name="longitude"
                value={form.longitude}
                onChange={handleChange}
                placeholder="73.8278"
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* SETTINGS */}
        <section className={sectionClass}>
          <h2 className="mb-4 text-lg font-bold text-gray-900 sm:text-xl">
            ⚙️ Package Settings
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
            onClick={() => navigate(ADMIN_PACKAGES_URL)}
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
              "Save Package"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPackage;