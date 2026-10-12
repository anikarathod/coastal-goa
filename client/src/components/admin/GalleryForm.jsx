import { useState, useRef, useEffect } from "react";
import { FaCloudUploadAlt, FaImage, FaTimes } from "react-icons/fa";

const GalleryForm = ({ onSubmit, loading = false }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("Goa");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  // Build preview URL for images
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      setPreview(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleFileChange = (e) => {
    const picked = e.target.files?.[0] || null;
    setFile(picked);
    if (errors.file) setErrors((prev) => ({ ...prev, file: undefined }));
  };

  const clearFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validate = () => {
    const next = {};
    if (!title.trim()) next.title = "Title is required";
    if (!category.trim()) next.category = "Category is required";
    if (!location.trim()) next.location = "Location is required";
    if (!file) next.file = "Please choose a file to upload";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("category", category);
    data.append("location", location);
    if (file) data.append("file", file);

    onSubmit(data);
  };

  // Format file size nicely
  const fileSize = file
    ? file.size < 1024 * 1024
      ? `${(file.size / 1024).toFixed(1)} KB`
      : `${(file.size / (1024 * 1024)).toFixed(2)} MB`
    : null;

  return (
    <form
      onSubmit={submit}
      className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div>
        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
          Upload Gallery Item
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Add a photo, video, or PDF to your gallery.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Title */}
        <Field
          label="Title"
          name="title"
          placeholder="e.g. Sunset at Chapora"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errors.title)
              setErrors((p) => ({ ...p, title: undefined }));
          }}
          error={errors.title}
          required
          className="sm:col-span-2"
        />

        {/* Description — full width */}
        <div className="sm:col-span-2">
          <label
            htmlFor="description"
            className="mb-1.5 block text-sm font-semibold text-slate-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="A short description of this gallery item..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
          />
        </div>

        {/* Category */}
        <Field
          label="Category"
          name="category"
          placeholder="e.g. Beaches, Cruises, Sunsets"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            if (errors.category)
              setErrors((p) => ({ ...p, category: undefined }));
          }}
          error={errors.category}
          required
        />

        {/* Location */}
        <Field
          label="Location"
          name="location"
          placeholder="e.g. Goa"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            if (errors.location)
              setErrors((p) => ({ ...p, location: undefined }));
          }}
          error={errors.location}
          required
        />
      </div>

      {/* ---------------- File Upload ---------------- */}
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-slate-700">
          File <span className="text-rose-500">*</span>
        </label>

        {/* Hidden real input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*,.pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        {!file ? (
          /* Drop zone — also opens file picker on tap */
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`
              flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed bg-slate-50 px-6 py-10 text-center transition
              hover:border-teal-500 hover:bg-teal-50/40
              ${errors.file ? "border-rose-400" : "border-slate-300"}
            `}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-2xl text-teal-600">
              <FaCloudUploadAlt />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Tap to upload
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                Image, video, or PDF · Max 25 MB
              </p>
            </div>
          </button>
        ) : (
          /* Preview card */
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:p-4">
            {/* Preview thumbnail / icon */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm sm:h-20 sm:w-20">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <FaImage className="text-2xl text-slate-400" />
              )}
            </div>

            {/* File info */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">
                {file.name}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                {fileSize}
                {file.type && ` · ${file.type}`}
              </p>
            </div>

            {/* Remove button */}
            <button
              type="button"
              onClick={clearFile}
              aria-label="Remove file"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
            >
              <FaTimes />
            </button>
          </div>
        )}

        {errors.file && (
          <p className="mt-1.5 text-xs font-medium text-rose-600">
            {errors.file}
          </p>
        )}
      </div>

      {/* Sticky action bar on mobile */}
      <div className="sticky bottom-0 -mx-5 -mb-5 border-t border-slate-100 bg-white/95 px-5 py-4 backdrop-blur-sm sm:static sm:mx-0 sm:mb-0 sm:border-0 sm:bg-transparent sm:p-0 sm:pt-2">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          <FaCloudUploadAlt />
          {loading ? "Uploading..." : "Upload File"}
        </button>
      </div>
    </form>
  );
};

/* Reusable field */
const Field = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required,
  className = "",
  inputMode,
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-semibold text-slate-700"
      >
        {label}
        {required && <span className="ml-1 text-rose-500">*</span>}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        inputMode={inputMode}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="off"
        className={`
          w-full rounded-xl border bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400
          transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20
          ${error ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/20" : "border-slate-300"}
        `}
      />

      {error && (
        <p className="mt-1.5 text-xs font-medium text-rose-600">{error}</p>
      )}
    </div>
  );
};

export default GalleryForm;