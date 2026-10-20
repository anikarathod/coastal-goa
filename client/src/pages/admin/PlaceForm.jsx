// client/src/components/admin/PlaceForm.jsx
import { useEffect, useState } from "react";
import { FaTimes, FaSave, FaCloudUploadAlt } from "react-icons/fa";
import api, { resolveImage } from "../../services/api";

const TYPES = [
  { value: "hotel", label: "Hotel" },
  { value: "guesthouse", label: "Guest House" },
  { value: "restaurant", label: "Restaurant" },
  { value: "shop", label: "Shop" },
];

const EMPTY = {
  name: "",
  type: "hotel",
  shortDescription: "",
  description: "",
  location: "",
  address: "",
  phone: "",
  email: "",
  website: "",
  openingHours: "",
  priceRange: "",
  pricePerNight: "",
  discountPrice: "",
  rating: "",
  featured: false,
  isActive: true,
  latitude: "",
  longitude: "",
  mapLink: "",
  // arrays stored as comma-separated strings in the form
  cuisine: "",
  amenities: "",
  specialities: "",
  highlights: "",
};

export default function PlaceForm({ initial, onClose, onSaved }) {
  const isEdit = Boolean(initial?._id);

  const [form, setForm] = useState(EMPTY);
  const [coverFile, setCoverFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [coverPreview, setCoverPreview] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Load initial values (edit mode)
  useEffect(() => {
    if (!initial) {
      setForm(EMPTY);
      setCoverPreview(null);
      setGalleryPreviews([]);
      return;
    }

    setForm({
      name: initial.name ?? "",
      type: initial.type ?? "hotel",
      shortDescription: initial.shortDescription ?? "",
      description: initial.description ?? "",
      location: initial.location ?? "",
      address: initial.address ?? "",
      phone: initial.phone ?? "",
      email: initial.email ?? "",
      website: initial.website ?? "",
      openingHours: initial.openingHours ?? "",
      priceRange: initial.priceRange ?? "",
      pricePerNight: initial.pricePerNight ?? "",
      discountPrice: initial.discountPrice ?? "",
      rating: initial.rating ?? "",
      featured: Boolean(initial.featured),
      isActive: initial.isActive !== false,
      latitude: initial.latitude ?? "",
      longitude: initial.longitude ?? "",
      mapLink: initial.mapLink ?? "",
      cuisine: (initial.cuisine || []).join(", "),
      amenities: (initial.amenities || []).join(", "),
      specialities: (initial.specialities || []).join(", "),
      highlights: (initial.highlights || []).join(", "),
    });

    setCoverPreview(resolveImage(initial.image || initial.coverImage));
    setGalleryPreviews(
      (initial.images || []).map((img) => resolveImage(img)).filter(Boolean)
    );
  }, [initial]);

  const update = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleCover = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setCoverFile(f);
    setCoverPreview(URL.createObjectURL(f));
  };

  const handleGallery = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setGalleryFiles(files);
    setGalleryPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }

    const fd = new FormData();

    // Simple text fields
    [
      "name",
      "type",
      "shortDescription",
      "description",
      "location",
      "address",
      "phone",
      "email",
      "website",
      "openingHours",
      "priceRange",
      "mapLink",
    ].forEach((k) => fd.append(k, form[k]));

    // Numbers
    if (form.pricePerNight !== "")
      fd.append("pricePerNight", form.pricePerNight);
    if (form.discountPrice !== "")
      fd.append("discountPrice", form.discountPrice);
    if (form.rating !== "") fd.append("rating", form.rating);
    if (form.latitude !== "") fd.append("latitude", form.latitude);
    if (form.longitude !== "") fd.append("longitude", form.longitude);

    // Booleans as strings
    fd.append("featured", String(form.featured));
    fd.append("isActive", String(form.isActive));

    // Comma-separated arrays → JSON arrays
    const toArr = (s) =>
      s
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean);

    if (form.cuisine) fd.append("cuisine", JSON.stringify(toArr(form.cuisine)));
    if (form.amenities)
      fd.append("amenities", JSON.stringify(toArr(form.amenities)));
    if (form.specialities)
      fd.append("specialities", JSON.stringify(toArr(form.specialities)));
    if (form.highlights)
      fd.append("highlights", JSON.stringify(toArr(form.highlights)));

    // Files
    if (coverFile) fd.append("coverImage", coverFile);
    galleryFiles.forEach((f) => fd.append("galleryImages", f));

    try {
      setSaving(true);

      if (isEdit) {
        await api.put(`/places/${initial._id}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/places", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      onSaved?.();
    } catch (err) {
      console.error("Save error:", err);
      setError(
        err.response?.data?.message || "Failed to save. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const showPriceFields = form.type === "hotel" || form.type === "guesthouse";
  const showCuisine = form.type === "restaurant";
  const showSpecialities = form.type === "shop";
  const showAmenities = form.type === "hotel" || form.type === "guesthouse";

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/60 p-4 sm:p-6">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
            {isEdit ? "Edit Place" : "Add New Place"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6">
          {error && (
            <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}

          {/* Type */}
          <div className="mb-5">
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Type *
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {TYPES.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => update("type", t.value)}
                  className={`rounded-lg border-2 px-3 py-2.5 text-sm font-bold transition ${
                    form.type === t.value
                      ? "border-teal-600 bg-teal-50 text-teal-700"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <Field label="Name *">
            <input
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className={inputClass}
              placeholder="e.g. Taj Exotica Resort"
            />
          </Field>

          {/* Short description */}
          <Field label="Short description">
            <input
              type="text"
              value={form.shortDescription}
              onChange={(e) => update("shortDescription", e.target.value)}
              className={inputClass}
              placeholder="One-line summary shown on cards"
            />
          </Field>

          {/* Full description */}
          <Field label="Full description">
            <textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              rows={4}
              className={inputClass}
              placeholder="Longer description for the detail page"
            />
          </Field>

          {/* Location + address */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Location (short)">
              <input
                type="text"
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                className={inputClass}
                placeholder="e.g. Benaulim, South Goa"
              />
            </Field>
            <Field label="Full address">
              <input
                type="text"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                className={inputClass}
                placeholder="Street, area, pincode"
              />
            </Field>
          </div>

          {/* Contact */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Phone">
              <input
                type="text"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className={inputClass}
                placeholder="+91 ..."
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={inputClass}
                placeholder="info@example.com"
              />
            </Field>
            <Field label="Website">
              <input
                type="url"
                value={form.website}
                onChange={(e) => update("website", e.target.value)}
                className={inputClass}
                placeholder="https://..."
              />
            </Field>
          </div>

          {/* Hours + price range */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Opening hours">
              <input
                type="text"
                value={form.openingHours}
                onChange={(e) => update("openingHours", e.target.value)}
                className={inputClass}
                placeholder="e.g. 9:00 AM – 11:00 PM"
              />
            </Field>
            <Field label="Price range (for restaurants / shops)">
              <input
                type="text"
                value={form.priceRange}
                onChange={(e) => update("priceRange", e.target.value)}
                className={inputClass}
                placeholder="e.g. ₹₹ or Budget-friendly"
              />
            </Field>
          </div>

          {/* Hotel/guesthouse only */}
          {showPriceFields && (
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Price per night (₹)">
                <input
                  type="number"
                  value={form.pricePerNight}
                  onChange={(e) => update("pricePerNight", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Discount price (₹)">
                <input
                  type="number"
                  value={form.discountPrice}
                  onChange={(e) => update("discountPrice", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Rating (0–5)">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={form.rating}
                  onChange={(e) => update("rating", e.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>
          )}

          {/* Restaurant only */}
          {showCuisine && (
            <Field label="Cuisine (comma-separated)">
              <input
                type="text"
                value={form.cuisine}
                onChange={(e) => update("cuisine", e.target.value)}
                className={inputClass}
                placeholder="Goan, Seafood, Continental"
              />
            </Field>
          )}

          {/* Shop only */}
          {showSpecialities && (
            <Field label="Specialities (comma-separated)">
              <input
                type="text"
                value={form.specialities}
                onChange={(e) => update("specialities", e.target.value)}
                className={inputClass}
                placeholder="Handicrafts, Spices, Cashews"
              />
            </Field>
          )}

          {/* Hotel/guesthouse */}
          {showAmenities && (
            <Field label="Amenities (comma-separated)">
              <input
                type="text"
                value={form.amenities}
                onChange={(e) => update("amenities", e.target.value)}
                className={inputClass}
                placeholder="Pool, WiFi, Parking, Breakfast"
              />
            </Field>
          )}

          {/* Highlights */}
          <Field label="Highlights (comma-separated)">
            <input
              type="text"
              value={form.highlights}
              onChange={(e) => update("highlights", e.target.value)}
              className={inputClass}
              placeholder="Great for families, Beachfront, Pet friendly"
            />
          </Field>

          {/* Location coords */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Latitude">
              <input
                type="number"
                step="any"
                value={form.latitude}
                onChange={(e) => update("latitude", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Longitude">
              <input
                type="number"
                step="any"
                value={form.longitude}
                onChange={(e) => update("longitude", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Google Maps link">
              <input
                type="url"
                value={form.mapLink}
                onChange={(e) => update("mapLink", e.target.value)}
                className={inputClass}
                placeholder="https://maps.google.com/..."
              />
            </Field>
          </div>

          {/* Cover image */}
          <Field label="Cover image">
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm font-semibold text-slate-600 transition hover:border-teal-400 hover:bg-teal-50">
              <FaCloudUploadAlt className="text-xl text-teal-600" />
              <span>
                {coverFile ? coverFile.name : "Choose a cover image"}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleCover}
                className="hidden"
              />
            </label>
            {coverPreview && (
              <div className="mt-3 h-32 w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100 sm:h-40">
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </Field>

          {/* Gallery */}
          <Field label="Gallery images (multiple)">
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm font-semibold text-slate-600 transition hover:border-teal-400 hover:bg-teal-50">
              <FaCloudUploadAlt className="text-xl text-teal-600" />
              <span>
                {galleryFiles.length
                  ? `${galleryFiles.length} file(s) selected`
                  : "Choose gallery images"}
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGallery}
                className="hidden"
              />
            </label>
            {galleryPreviews.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {galleryPreviews.map((src, i) => (
                  <div
                    key={i}
                    className="aspect-square overflow-hidden rounded-lg border border-slate-200 bg-slate-100"
                  >
                    <img
                      src={src}
                      alt={`Gallery ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </Field>

          {/* Flags */}
          <div className="mt-4 flex flex-wrap gap-6">
            <label className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => update("featured", e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              Featured on homepage
            </label>
            <label className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => update("isActive", e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              Active (visible on site)
            </label>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col-reverse gap-2 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FaSave className="text-xs" />
              {saving ? "Saving..." : isEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* Helper subcomponents */
const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100";

function Field({ label, children }) {
  return (
    <div className="mb-4">
      <label className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      {children}
    </div>
  );
}