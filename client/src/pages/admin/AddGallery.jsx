import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCloudUploadAlt,
  FaImage,
  FaVideo,
  FaTimes,
  FaSpinner,
  FaCheckCircle,
  FaInfoCircle,
} from "react-icons/fa";

import api from "../../services/api";

const MAX_FILE_SIZE_MB = 50;

const AddGallery = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "",
    location: "Goa",
    featured: false,
  });

  // Generate preview URL when file changes
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);

    // Cleanup
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateFile = (f) => {
    if (!f) return "No file selected.";

    const isImage = f.type.startsWith("image/");
    const isVideo = f.type.startsWith("video/");

    if (!isImage && !isVideo) {
      return "Only image or video files are allowed.";
    }

    const sizeMB = f.size / (1024 * 1024);
    if (sizeMB > MAX_FILE_SIZE_MB) {
      return `File is too large (${sizeMB.toFixed(1)}MB). Max ${MAX_FILE_SIZE_MB}MB.`;
    }

    return null;
  };

  const handleFileSelect = (selectedFile) => {
    const error = validateFile(selectedFile);
    if (error) {
      alert(error);
      return;
    }
    setFile(selectedFile);
  };

  const handleFileInput = (e) => {
    const selected = e.target.files?.[0];
    if (selected) handleFileSelect(selected);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const dropped = e.dataTransfer.files?.[0];
    if (dropped) handleFileSelect(dropped);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("location", form.location);
      formData.append("featured", form.featured);
      formData.append("file", file);

      await api.post("/gallery", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Media uploaded successfully!");
      navigate("/pearlrathod/gallery");
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message || "Failed to upload media."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white p-3 text-sm shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 sm:text-base";

  const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";

  return (
    <div className="mx-auto max-w-4xl">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Upload Gallery Media
        </h1>
        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          Add images or videos to your site's gallery
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
      >

        {/* BASIC INFO */}
        <div>
          <h2 className="mb-4 text-lg font-bold text-gray-900">
            Media Details
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="Sunset at Baga Beach"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Category</label>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Beach, Cruise, Adventure..."
                className={inputClass}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Location</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* FILE UPLOAD */}
        <div>
          <h2 className="mb-4 text-lg font-bold text-gray-900">
            Media File <span className="text-red-500">*</span>
          </h2>

          {!file ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition sm:p-12 ${
                dragActive
                  ? "border-teal-500 bg-teal-50"
                  : "border-gray-300 bg-gray-50 hover:border-teal-400 hover:bg-teal-50/30"
              }`}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
                <FaCloudUploadAlt className="text-3xl text-teal-600" />
              </div>

              <p className="mt-4 text-base font-semibold text-gray-900">
                {dragActive
                  ? "Drop your file here"
                  : "Click to upload or drag & drop"}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Images or videos up to {MAX_FILE_SIZE_MB}MB
              </p>

              <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1.5">
                  <FaImage /> JPG, PNG, WEBP
                </span>
                <span className="flex items-center gap-1.5">
                  <FaVideo /> MP4, MOV
                </span>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>
          ) : (
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">

              {/* FILE INFO */}
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                    {file.type.startsWith("video/") ? (
                      <FaVideo />
                    ) : (
                      <FaImage />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB •{" "}
                      {file.type}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={removeFile}
                  className="shrink-0 rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                  aria-label="Remove file"
                >
                  <FaTimes />
                </button>
              </div>

              {/* PREVIEW */}
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                {file.type.startsWith("image/") && preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-80 w-full object-contain"
                  />
                )}

                {file.type.startsWith("video/") && preview && (
                  <video controls className="max-h-80 w-full">
                    <source src={preview} type={file.type} />
                    Your browser does not support video playback.
                  </video>
                )}
              </div>

              <p className="mt-3 flex items-center gap-1.5 text-xs text-green-600">
                <FaCheckCircle /> File ready to upload
              </p>
            </div>
          )}
        </div>

        {/* FEATURED */}
        <label className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/60 p-4">
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
            className="mt-0.5 h-4 w-4 cursor-pointer rounded border-gray-300 text-teal-600 focus:ring-teal-500"
          />
          <span className="text-sm">
            <span className="font-semibold text-gray-900">
              Mark as Featured
            </span>
            <span className="ml-1 text-gray-500">
              — Featured media appears first on the public gallery.
            </span>
          </span>
        </label>

        {/* TIP */}
        <div className="flex items-start gap-2 rounded-xl border border-blue-100 bg-blue-50/60 p-3 text-xs text-blue-700">
          <FaInfoCircle className="mt-0.5 shrink-0" />
          <span>
            Tip: For best results, use high-quality images (1920×1080) and
            short videos under 30 seconds.
          </span>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate("/pearlrathod/gallery")}
            disabled={loading}
            className="rounded-lg border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading || !file}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <FaCloudUploadAlt />
                Upload Media
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGallery;