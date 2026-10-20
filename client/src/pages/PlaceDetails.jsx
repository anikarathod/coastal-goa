// client/src/pages/PlaceDetails.jsx
import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import {
  FaArrowLeft,
  FaStar,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaClock,
  FaImage,
  FaHotel,
  FaHome,
  FaUtensils,
  FaStore,
  FaCheckCircle,
  FaRedo,
} from "react-icons/fa";
import api, { resolveImage } from "../services/api";

// Type config — mirrors PlaceCard
const TYPE_CONFIG = {
  hotel: { label: "Hotel", Icon: FaHotel, badgeClass: "bg-teal-600" },
  guesthouse: { label: "Guest House", Icon: FaHome, badgeClass: "bg-amber-600" },
  restaurant: { label: "Restaurant", Icon: FaUtensils, badgeClass: "bg-rose-600" },
  shop: { label: "Shop", Icon: FaStore, badgeClass: "bg-indigo-600" },
};

// Derive type from URL path — /hotels/xyz → "hotel"
const typeFromPath = (pathname = "") => {
  if (pathname.startsWith("/hotels")) return "hotel";
  if (pathname.startsWith("/guesthouses")) return "guesthouse";
  if (pathname.startsWith("/restaurants")) return "restaurant";
  if (pathname.startsWith("/shops")) return "shop";
  return "hotel";
};

const formatPrice = (price) =>
  `₹${Number(price).toLocaleString("en-IN")}`;

export default function PlaceDetails() {
  const { slug } = useParams();
  const location = useLocation();
  const type = typeFromPath(location.pathname);
  const config = TYPE_CONFIG[type] ?? TYPE_CONFIG.hotel;
  const { label, Icon, badgeClass } = config;

  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  const fetchPlace = async () => {
    try {
      setLoading(true);
      setError(false);

      const res = await api.get(`/places/${slug}`);
      const data = res.data;
      const found = data?.place ?? data?.data?.place ?? data?.data ?? null;

      if (!found) {
        setError(true);
        return;
      }

      setPlace(found);

      // Set initial main image
      const cover =
        resolveImage(found.image) ??
        resolveImage(found.coverImage) ??
        resolveImage(
          Array.isArray(found.images) && found.images[0] ? found.images[0] : null
        );
      setActiveImage(cover);
    } catch (err) {
      console.error("Failed to load place:", err.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) fetchPlace();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  /* ── LOADING ────────────────────────────── */
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-6xl animate-pulse space-y-6">
          <div className="h-6 w-32 rounded bg-slate-200" />
          <div className="h-72 rounded-2xl bg-slate-200 sm:h-96" />
          <div className="h-8 w-2/3 rounded bg-slate-200" />
          <div className="h-4 w-1/2 rounded bg-slate-200" />
          <div className="h-32 rounded-2xl bg-slate-200" />
        </div>
      </div>
    );
  }

  /* ── ERROR ─────────────────────────────── */
  if (error || !place) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-100">
          <FaImage className="text-2xl text-rose-500" />
        </div>
        <h1 className="mt-4 text-xl font-bold text-slate-900 sm:text-2xl">
          {label} not found
        </h1>
        <p className="mt-2 max-w-md text-sm text-slate-600">
          This {label.toLowerCase()} may have been removed or the link is
          incorrect.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={fetchPlace}
            className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            <FaRedo className="text-xs" />
            Retry
          </button>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <FaArrowLeft className="text-xs" />
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  /* ── DATA ──────────────────────────────── */
  const name = place.name ?? place.title ?? "Untitled";
  const images = Array.isArray(place.images)
    ? place.images.map(resolveImage).filter(Boolean)
    : [];

  // Combine cover + gallery for the thumb strip
  const allImages = [
    activeImage,
    ...images.filter((img) => img !== activeImage),
  ].filter(Boolean);

  const basePrice = place.pricePerNight ?? place.price ?? null;
  const discountPrice =
    place.discountPrice && place.discountPrice > 0
      ? place.discountPrice
      : null;
  const finalPrice = discountPrice || basePrice;
  const isPriced = type === "hotel" || type === "guesthouse";

  const tags =
    type === "restaurant"
      ? place.cuisine
      : type === "shop"
      ? place.specialities
      : place.amenities;

  // Address line
  const addressLine =
    place.address || place.location
      ? [place.address, place.location].filter(Boolean).join(", ")
      : null;

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* ── BREADCRUMB ────────────────────── */}
      <div className="border-b border-slate-200 bg-white px-4 py-3 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl items-center gap-2 text-xs text-slate-500 sm:text-sm">
          <Link to="/" className="hover:text-teal-700">
            Home
          </Link>
          <span>/</span>
          <Link to="/services" className="hover:text-teal-700">
            Services
          </Link>
          <span>/</span>
          <span className="truncate font-semibold text-slate-700">{name}</span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 sm:pt-10 lg:px-8">
        {/* ── BACK BUTTON ───────────────────── */}
        <Link
          to="/services"
          className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800"
        >
          <FaArrowLeft className="text-xs" />
          Back to Services
        </Link>

        {/* ── IMAGE GALLERY ─────────────────── */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="relative aspect-[16/9] w-full bg-slate-100 sm:aspect-[21/9]">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-teal-100 to-teal-200 text-teal-600">
              <FaImage className="text-5xl opacity-40" />
            </div>
            {activeImage && (
              <img
                src={activeImage}
                alt={name}
                className="absolute inset-0 h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}
            <span
              className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full ${badgeClass} px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-md sm:text-sm`}
            >
              <Icon />
              {label}
            </span>
          </div>

          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto p-3 sm:p-4">
              {allImages.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(src)}
                  className={`relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition sm:h-20 sm:w-28 ${
                    src === activeImage
                      ? "border-teal-600 ring-2 ring-teal-200"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={src}
                    alt={`${name} ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── MAIN CONTENT ──────────────────── */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {/* LEFT: Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title + meta */}
            <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                {name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
                {place.rating > 0 && (
                  <span className="inline-flex items-center gap-1.5 font-semibold text-slate-900">
                    <FaStar className="text-amber-400" />
                    {place.rating}
                  </span>
                )}

                {addressLine && (
                  <span className="inline-flex items-center gap-1.5">
                    <FaMapMarkerAlt className="text-teal-600" />
                    {addressLine}
                  </span>
                )}

                {place.openingHours && (
                  <span className="inline-flex items-center gap-1.5">
                    <FaClock className="text-teal-600" />
                    {place.openingHours}
                  </span>
                )}
              </div>

              {tags && Array.isArray(tags) && tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {tags.map((t, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            {(place.description || place.shortDescription) && (
              <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
                <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                  About {label}
                </h2>
                <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                  {place.description || place.shortDescription}
                </p>
              </div>
            )}

            {/* Highlights */}
            {Array.isArray(place.highlights) && place.highlights.length > 0 && (
              <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
                <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                  Highlights
                </h2>
                <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {place.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-slate-700"
                    >
                      <FaCheckCircle className="mt-0.5 flex-shrink-0 text-teal-600" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* RIGHT: Sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-4 lg:self-start">
            {/* Price / Enquiry card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              {isPriced && finalPrice ? (
                <>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-teal-700 sm:text-4xl">
                      {formatPrice(finalPrice)}
                    </span>
                    <span className="text-sm text-slate-500">/ night</span>
                  </div>
                  {discountPrice && basePrice > discountPrice && (
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm text-slate-400 line-through">
                        {formatPrice(basePrice)}
                      </span>
                      <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-700">
                        {Math.round(
                          ((basePrice - discountPrice) / basePrice) * 100
                        )}
                        % OFF
                      </span>
                    </div>
                  )}
                </>
              ) : place.priceRange ? (
                <div className="text-2xl font-bold text-teal-700">
                  {place.priceRange}
                </div>
              ) : (
                <div className="text-lg font-bold text-slate-900">
                  Contact for pricing
                </div>
              )}

              <div className="mt-5 space-y-2">
                <Link
                  to="/contact"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-700"
                >
                  Enquire Now
                </Link>

                {place.phone && (
                  <a
                    href={`tel:${place.phone}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    <FaPhone className="text-xs" />
                    Call Now
                  </a>
                )}
              </div>
            </div>

            {/* Contact details */}
            {(place.phone || place.email || place.website) && (
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">
                  Contact
                </h3>
                <ul className="mt-3 space-y-3 text-sm">
                  {place.phone && (
                    <li className="flex items-start gap-3">
                      <FaPhone className="mt-0.5 text-teal-600" />
                      <a
                        href={`tel:${place.phone}`}
                        className="text-slate-700 hover:text-teal-700"
                      >
                        {place.phone}
                      </a>
                    </li>
                  )}
                  {place.email && (
                    <li className="flex items-start gap-3">
                      <FaEnvelope className="mt-0.5 text-teal-600" />
                      <a
                        href={`mailto:${place.email}`}
                        className="break-all text-slate-700 hover:text-teal-700"
                      >
                        {place.email}
                      </a>
                    </li>
                  )}
                  {place.website && (
                    <li className="flex items-start gap-3">
                      <FaGlobe className="mt-0.5 text-teal-600" />
                      <a
                        href={place.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-all text-slate-700 hover:text-teal-700"
                      >
                        {place.website.replace(/^https?:\/\//, "")}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}

            {/* Map link */}
            {(place.mapLink || (place.latitude && place.longitude)) && (
              <a
                href={
                  place.mapLink ||
                  `https://www.google.com/maps?q=${place.latitude},${place.longitude}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-700 shadow-sm transition hover:border-teal-300 hover:text-teal-700"
              >
                <FaMapMarkerAlt />
                Open in Maps
              </a>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}