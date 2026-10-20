// client/src/pages/admin/PlacesAdmin.jsx
import { useEffect, useMemo, useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaRedo,
  FaHotel,
  FaHome,
  FaUtensils,
  FaStore,
  FaMapMarkerAlt,
  FaStar,
  FaTimes,
  FaSave,
  FaCloudUploadAlt,
} from "react-icons/fa";
import api, { resolveImage } from "../../services/api";
import { compressImage } from "../../utils/imageCompressor";

const TABS = [
  { key: "all", label: "All", Icon: null },
  { key: "hotel", label: "Hotels", Icon: FaHotel },
  { key: "guesthouse", label: "Guest Houses", Icon: FaHome },
  { key: "restaurant", label: "Restaurants", Icon: FaUtensils },
  { key: "shop", label: "Shops", Icon: FaStore },
];

const TYPE_LABEL = {
  hotel: "Hotel",
  guesthouse: "Guest House",
  restaurant: "Restaurant",
  shop: "Shop",
};

const TYPE_BADGE = {
  hotel: "bg-brand-teal/10 text-brand-teal",
  guesthouse: "bg-brand-gold/15 text-brand-gold",
  restaurant: "bg-brand-coral/10 text-brand-coral",
  shop: "bg-indigo-100 text-indigo-700",
};

const EMPTY_FORM = {
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
  cuisine: "",
  amenities: "",
  specialities: "",
  highlights: "",
};

export default function PlacesAdmin() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [coverFile, setCoverFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [coverPreview, setCoverPreview] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  /* ── Fetch list ─────────────────── */
  const fetchPlaces = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await api.get("/places");
      const data = res.data;
      const list = data?.places ?? data?.data?.places ?? data?.data ?? [];
      setPlaces(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Failed to load places:", err.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  /* ── Filter + counts ────────────── */
  const filtered = useMemo(() => {
    let list = places;
    if (tab !== "all") list = list.filter((p) => p.type === tab);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.location?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [places, tab, query]);

  const counts = useMemo(
    () => ({
      all: places.length,
      hotel: places.filter((p) => p.type === "hotel").length,
      guesthouse: places.filter((p) => p.type === "guesthouse").length,
      restaurant: places.filter((p) => p.type === "restaurant").length,
      shop: places.filter((p) => p.type === "shop").length,
    }),
    [places]
  );

  /* ── Open create / edit ─────────── */
  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setCoverFile(null);
    setGalleryFiles([]);
    setCoverPreview(null);
    setGalleryPreviews([]);
    setFormError("");
    setShowForm(true);
  };

  const openEdit = (place) => {
    setEditing(place);
    setForm({
      name: place.name ?? "",
      type: place.type ?? "hotel",
      shortDescription: place.shortDescription ?? "",
      description: place.description ?? "",
      location: place.location ?? "",
      address: place.address ?? "",
      phone: place.phone ?? "",
      email: place.email ?? "",
      website: place.website ?? "",
      openingHours: place.openingHours ?? "",
      priceRange: place.priceRange ?? "",
      pricePerNight: place.pricePerNight ?? "",
      discountPrice: place.discountPrice ?? "",
      rating: place.rating ?? "",
      featured: Boolean(place.featured),
      isActive: place.isActive !== false,
      latitude: place.latitude ?? "",
      longitude: place.longitude ?? "",
      mapLink: place.mapLink ?? "",
      cuisine: (place.cuisine || []).join(", "),
      amenities: (place.amenities || []).join(", "),
      specialities: (place.specialities || []).join(", "),
      highlights: (place.highlights || []).join(", "),
    });
    setCoverFile(null);
    setGalleryFiles([]);
    setCoverPreview(resolveImage(place.image || place.coverImage));
    setGalleryPreviews(
      (place.images || []).map((img) => resolveImage(img)).filter(Boolean)
    );
    setFormError("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
  };

  /* ── Delete ─────────────────────── */
  const handleDelete = async (place) => {
    if (!window.confirm(`Delete "${place.name}"? This cannot be undone.`)) return;
    try {
      await api.delete(`/places/${place._id}`);
      setPlaces((prev) => prev.filter((p) => p._id !== place._id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete.");
    }
  };

  /* ── Save (create or update) ────── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving) return;
    setFormError("");

    if (!form.name.trim()) {
      setFormError("Name is required.");
      return;
    }

    try {
      setSaving(true);

      const fd = new FormData();

      // Text fields
      ["name", "type", "shortDescription", "description", "location",
       "address", "phone", "email", "website", "openingHours",
       "priceRange", "mapLink"].forEach((k) => fd.append(k, form[k] || ""));

      // Numbers
      if (form.pricePerNight !== "") fd.append("pricePerNight", form.pricePerNight);
      if (form.discountPrice !== "") fd.append("discountPrice", form.discountPrice);
      if (form.rating !== "") fd.append("rating", form.rating);
      if (form.latitude !== "") fd.append("latitude", form.latitude);
      if (form.longitude !== "") fd.append("longitude", form.longitude);

      // Booleans
      fd.append("featured", String(form.featured));
      fd.append("isActive", String(form.isActive));

      // Arrays
      const toArr = (s) =>
        s.split(",").map((x) => x.trim()).filter(Boolean);
      if (form.cuisine) fd.append("cuisine", JSON.stringify(toArr(form.cuisine)));
      if (form.amenities) fd.append("amenities", JSON.stringify(toArr(form.amenities)));
      if (form.specialities) fd.append("specialities", JSON.stringify(toArr(form.specialities)));
      if (form.highlights) fd.append("highlights", JSON.stringify(toArr(form.highlights)));

      // Files (compressed)
      if (coverFile) {
        const compressed = await compressImage(coverFile);
        fd.append("coverImage", compressed);
      }
      for (const f of galleryFiles) {
        const compressed = await compressImage(f);
        fd.append("galleryImages", compressed);
      }

      if (editing) {
        await api.put(`/places/${editing._id}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/places", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      closeForm();
      fetchPlaces();
    } catch (err) {
      console.error(err);
      setFormError(err.response?.data?.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  /* ── Render ─────────────────────── */
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 sm:mb-8">
          <div>
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl">
              Places
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Manage hotels, guest houses, restaurants & shops.
            </p>
          </div>
          <button onClick={openCreate} className="btn-primary">
            <FaPlus className="text-xs" /> Add Place
          </button>
        </div>

        {/* Tabs + search */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {TABS.map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition sm:text-sm ${
                  tab === key
                    ? "bg-brand-teal text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                {Icon && <Icon className="text-[10px] sm:text-xs" />}
                {label}
                <span
                  className={`ml-1 rounded-full px-1.5 py-0.5 text-[10px] ${
                    tab === key
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {counts[key]}
                </span>
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or location..."
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm placeholder-slate-400 outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
            />
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="h-48 bg-slate-200" />
                <div className="space-y-2 p-4">
                  <div className="h-4 w-3/4 rounded bg-slate-200" />
                  <div className="h-3 w-1/2 rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6 text-center">
            <p className="text-sm text-slate-600">Couldn't load places.</p>
            <button onClick={fetchPlaces} className="btn-primary mt-3">
              <FaRedo className="text-xs" /> Retry
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="text-sm text-slate-500">
              {query || tab !== "all"
                ? "No places match your filter."
                : "No places yet — add your first one!"}
            </p>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((place) => {
              const img = resolveImage(
                place.image ??
                  place.coverImage ??
                  place.imageUrl ??
                  (Array.isArray(place.images) ? place.images[0] : null)
              );
              return (
                <div key={place._id} className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  
                  {/* 👇 FIXED IMAGE CONTAINER */}
                  <div className="relative h-48 w-full shrink-0 overflow-hidden bg-slate-100">
                    {img ? (
                      <img
                        src={img}
                        alt={place.name}
                        className="absolute inset-0 h-full w-full object-cover"
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-slate-400">
                        No image
                      </div>
                    )}
                    <span
                      className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                        TYPE_BADGE[place.type] || "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {TYPE_LABEL[place.type] || place.type}
                    </span>
                    {!place.isActive && (
                      <span className="absolute right-2 top-2 rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-white">
                        Inactive
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="line-clamp-1 text-base font-bold text-brand-navy">
                      {place.name}
                    </h3>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                      {place.location && (
                        <span className="inline-flex items-center gap-1">
                          <FaMapMarkerAlt className="text-brand-teal" />
                          {place.location}
                        </span>
                      )}
                      {place.rating > 0 && (
                        <span className="inline-flex items-center gap-1">
                          <FaStar className="text-amber-400" />
                          {place.rating}
                        </span>
                      )}
                    </div>

                    <div className="mt-auto flex gap-2 pt-4">
                      <button
                        onClick={() => openEdit(place)}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                      >
                        <FaEdit className="text-[10px]" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(place)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-rose-200 bg-white px-3 py-2 text-xs font-bold text-rose-600 transition hover:bg-rose-50"
                      >
                        <FaTrash className="text-[10px]" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/60 p-4 sm:p-6">
          <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
              <h2 className="font-display text-lg font-bold text-brand-navy sm:text-xl">
                {editing ? "Edit Place" : "Add New Place"}
              </h2>
              <button
                type="button"
                onClick={closeForm}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 sm:p-6">
              {formError && (
                <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {formError}
                </div>
              )}

              {/* Type */}
              <div className="mb-5">
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">Type *</label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {["hotel", "guesthouse", "restaurant", "shop"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, type: t }))}
                      className={`rounded-lg border-2 px-3 py-2.5 text-sm font-bold transition ${
                        form.type === t
                          ? "border-brand-teal bg-brand-teal/5 text-brand-teal"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {TYPE_LABEL[t]}
                    </button>
                  ))}
                </div>
              </div>

              <Field label="Name *">
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className={inputClass}
                  placeholder="e.g. Taj Exotica Resort"
                />
              </Field>

              <Field label="Short description">
                <input
                  type="text"
                  value={form.shortDescription}
                  onChange={(e) => setForm((p) => ({ ...p, shortDescription: e.target.value }))}
                  className={inputClass}
                  placeholder="One-line summary shown on cards"
                />
              </Field>

              <Field label="Full description">
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  className={inputClass}
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Location (short)">
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                    className={inputClass}
                    placeholder="e.g. Benaulim, South Goa"
                  />
                </Field>
                <Field label="Full address">
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Phone">
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                    className={inputClass}
                  />
                </Field>
                <Field label="Email">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    className={inputClass}
                  />
                </Field>
                <Field label="Website">
                  <input
                    type="url"
                    value={form.website}
                    onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))}
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Opening hours">
                  <input
                    type="text"
                    value={form.openingHours}
                    onChange={(e) => setForm((p) => ({ ...p, openingHours: e.target.value }))}
                    className={inputClass}
                    placeholder="e.g. 9:00 AM – 11:00 PM"
                  />
                </Field>
                <Field label="Price range">
                  <input
                    type="text"
                    value={form.priceRange}
                    onChange={(e) => setForm((p) => ({ ...p, priceRange: e.target.value }))}
                    className={inputClass}
                    placeholder="e.g. ₹₹ or Budget-friendly"
                  />
                </Field>
              </div>

              {(form.type === "hotel" || form.type === "guesthouse") && (
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field label="Price per night (₹)">
                    <input
                      type="number"
                      value={form.pricePerNight}
                      onChange={(e) => setForm((p) => ({ ...p, pricePerNight: e.target.value }))}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Discount price (₹)">
                    <input
                      type="number"
                      value={form.discountPrice}
                      onChange={(e) => setForm((p) => ({ ...p, discountPrice: e.target.value }))}
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
                      onChange={(e) => setForm((p) => ({ ...p, rating: e.target.value }))}
                      className={inputClass}
                    />
                  </Field>
                </div>
              )}

              {form.type === "restaurant" && (
                <Field label="Cuisine (comma-separated)">
                  <input
                    type="text"
                    value={form.cuisine}
                    onChange={(e) => setForm((p) => ({ ...p, cuisine: e.target.value }))}
                    className={inputClass}
                    placeholder="Goan, Seafood, Continental"
                  />
                </Field>
              )}

              {form.type === "shop" && (
                <Field label="Specialities (comma-separated)">
                  <input
                    type="text"
                    value={form.specialities}
                    onChange={(e) => setForm((p) => ({ ...p, specialities: e.target.value }))}
                    className={inputClass}
                    placeholder="Handicrafts, Spices, Cashews"
                  />
                </Field>
              )}

              {(form.type === "hotel" || form.type === "guesthouse") && (
                <Field label="Amenities (comma-separated)">
                  <input
                    type="text"
                    value={form.amenities}
                    onChange={(e) => setForm((p) => ({ ...p, amenities: e.target.value }))}
                    className={inputClass}
                    placeholder="Pool, WiFi, Parking, Breakfast"
                  />
                </Field>
              )}

              <Field label="Highlights (comma-separated)">
                <input
                  type="text"
                  value={form.highlights}
                  onChange={(e) => setForm((p) => ({ ...p, highlights: e.target.value }))}
                  className={inputClass}
                  placeholder="Great for families, Beachfront, Pet friendly"
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Latitude">
                  <input
                    type="number"
                    step="any"
                    value={form.latitude}
                    onChange={(e) => setForm((p) => ({ ...p, latitude: e.target.value }))}
                    className={inputClass}
                  />
                </Field>
                <Field label="Longitude">
                  <input
                    type="number"
                    step="any"
                    value={form.longitude}
                    onChange={(e) => setForm((p) => ({ ...p, longitude: e.target.value }))}
                    className={inputClass}
                  />
                </Field>
                <Field label="Google Maps link">
                  <input
                    type="url"
                    value={form.mapLink}
                    onChange={(e) => setForm((p) => ({ ...p, mapLink: e.target.value }))}
                    className={inputClass}
                  />
                </Field>
              </div>

              {/* Cover image */}
              <Field label="Cover image">
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm font-semibold text-slate-600 transition hover:border-brand-teal hover:bg-brand-teal/5">
                  <FaCloudUploadAlt className="text-xl text-brand-teal" />
                  <span>{coverFile ? coverFile.name : "Choose a cover image"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) {
                        setCoverFile(f);
                        setCoverPreview(URL.createObjectURL(f));
                      }
                    }}
                    className="hidden"
                  />
                </label>
                {coverPreview && (
                  <div className="mt-3 h-32 w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                    <img src={coverPreview} alt="Cover" className="h-full w-full object-cover" />
                  </div>
                )}
              </Field>

              {/* Gallery */}
              <Field label="Gallery images">
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm font-semibold text-slate-600 transition hover:border-brand-teal hover:bg-brand-teal/5">
                  <FaCloudUploadAlt className="text-xl text-brand-teal" />
                  <span>
                    {galleryFiles.length
                      ? `${galleryFiles.length} file(s) selected`
                      : "Choose gallery images"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      setGalleryFiles(files);
                      setGalleryPreviews(files.map((f) => URL.createObjectURL(f)));
                    }}
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
                        <img src={src} alt={`g-${i}`} className="h-full w-full object-cover" />
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
                    onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))}
                    className="h-4 w-4 rounded border-slate-300 text-brand-teal focus:ring-brand-teal"
                  />
                  Featured
                </label>
                <label className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) => setForm((p) => ({ ...p, isActive: e.target.checked }))}
                    className="h-4 w-4 rounded border-slate-300 text-brand-teal focus:ring-brand-teal"
                  />
                  Active (visible on site)
                </label>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-col-reverse gap-2 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeForm}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FaSave className="text-xs" />
                  {saving ? "Saving..." : editing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* Helpers */
const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20";

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