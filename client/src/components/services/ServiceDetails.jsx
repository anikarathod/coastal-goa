import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaWhatsapp,
  FaPhone,
  FaCheck,
  FaStar,
  FaClock,
  FaUsers,
  FaArrowLeft,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const ServiceDetails = ({ service }) => {
  const [activeImage, setActiveImage] = useState(null);

  if (!service) return null;

  const images = [
    service.coverImage || service.image,
    ...(service.images || []),
  ].filter(Boolean);

  const coverImage = images[0] || "https://placehold.co/1200x600/e2e8f0/475569?text=Service";

  const basePrice = service.startingPrice || service.price || 0;
  const discountPrice =
    service.discountPrice && service.discountPrice > 0
      ? service.discountPrice
      : null;
  const finalPrice = discountPrice || basePrice;
  const discount =
    basePrice && discountPrice && basePrice > discountPrice
      ? Math.round(((basePrice - discountPrice) / basePrice) * 100)
      : 0;

  // Combine highlights / features / amenities into one clean block
  const includedItems = [
    ...(service.highlights || []),
    ...(service.features || []),
    ...(service.amenities || []),
  ];

  return (
    <div className="mx-auto max-w-6xl">
      {/* Back link */}
      <Link
        to="/services"
        className="mb-4 inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-teal-600"
      >
        <FaArrowLeft className="text-xs" />
        Back to Services
      </Link>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* COVER IMAGE */}
        <div className="relative h-64 w-full overflow-hidden bg-slate-100 sm:h-80 md:h-[420px]">
          <img
            src={coverImage}
            alt={service.title}
            loading="eager"
            className="absolute inset-0 h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/1200x600/e2e8f0/475569?text=Service";
            }}
          />

          {/* Gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Discount badge */}
          {discount > 0 && (
            <span className="absolute right-3 top-3 rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white shadow-lg sm:right-4 sm:top-4 sm:text-sm">
              {discount}% OFF
            </span>
          )}

          {/* Title overlay on image (mobile-friendly) */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-8">
            {service.category && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md sm:text-xs">
                {service.category}
              </span>
            )}

            <h1 className="mt-2 text-xl font-extrabold leading-tight text-white drop-shadow-lg sm:mt-3 sm:text-3xl md:text-4xl">
              {service.title}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/90 sm:mt-3 sm:text-sm">
              <span className="inline-flex items-center gap-1.5">
                <FaMapMarkerAlt className="text-[10px] sm:text-xs" />
                {service.location || "Goa"}
              </span>

              {service.rating > 0 && (
                <span className="inline-flex items-center gap-1.5">
                  <FaStar className="text-[10px] text-amber-300 sm:text-xs" />
                  <span className="font-semibold">{service.rating}</span>
                </span>
              )}

              {service.duration && (
                <span className="inline-flex items-center gap-1.5">
                  <FaClock className="text-[10px] sm:text-xs" />
                  {service.duration}
                </span>
              )}

              {service.maxGroupSize && (
                <span className="inline-flex items-center gap-1.5">
                  <FaUsers className="text-[10px] sm:text-xs" />
                  Up to {service.maxGroupSize}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* THUMBNAIL GALLERY */}
        {images.length > 1 && (
          <div className="border-b border-slate-100 bg-slate-50 px-4 py-3 sm:px-6 sm:py-4">
            <div className="flex gap-2 overflow-x-auto pb-1 sm:gap-3">
              {images.slice(0, 6).map((img, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 border-transparent transition hover:border-teal-500 sm:h-20 sm:w-20"
                >
                  <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="p-4 sm:p-6 md:p-8">

          {/* SHORT DESCRIPTION */}
          {service.shortDescription && (
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg">
              {service.shortDescription}
            </p>
          )}

          {/* PRICE + QUICK INFO BAR */}
          <div className="mt-5 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4">
            {/* Price */}
            <div className="rounded-xl border border-teal-100 bg-teal-50 p-4 sm:p-5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-teal-700 sm:text-xs">
                Starting from
              </p>

              <div className="mt-1 flex flex-wrap items-baseline gap-2">
                <span className="text-2xl font-extrabold text-teal-700 sm:text-3xl">
                  {finalPrice > 0
                    ? `₹${finalPrice.toLocaleString("en-IN")}`
                    : "Contact Us"}
                </span>

                {discountPrice && basePrice > discountPrice && (
                  <span className="text-sm text-slate-400 line-through sm:text-base">
                    ₹{basePrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              <p className="mt-1 text-[11px] text-teal-600/80 sm:text-xs">
                Best rates guaranteed · No hidden charges
              </p>
            </div>

            {/* Location */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:text-xs">
                Location
              </p>

              <div className="mt-1 flex items-center gap-2">
                <FaMapMarkerAlt className="text-teal-600" />
                <span className="text-base font-bold text-slate-900 sm:text-lg">
                  {service.location || "Goa"}
                </span>
              </div>

              <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                Pickup available across Goa
              </p>
            </div>
          </div>

          {/* DESCRIPTION */}
          {service.description && (
            <div className="mt-8">
              <h2 className="mb-3 text-lg font-bold text-slate-900 sm:text-xl md:text-2xl">
                About this service
              </h2>
              <div className="whitespace-pre-line rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-700 sm:p-5 sm:text-base">
                {service.description}
              </div>
            </div>
          )}

          {/* INCLUDED ITEMS (highlights + features + amenities combined) */}
          {includedItems.length > 0 && (
            <div className="mt-8">
              <h2 className="mb-3 text-lg font-bold text-slate-900 sm:text-xl md:text-2xl">
                What's included
              </h2>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
                {includedItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 transition hover:border-teal-200 hover:bg-teal-50/40 sm:p-4"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-[10px] text-teal-700 sm:h-6 sm:w-6 sm:text-xs">
                      <FaCheck />
                    </span>
                    <span className="text-sm text-slate-700 sm:text-base">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA SECTION */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 sm:mt-10 sm:p-6">
            <h3 className="text-base font-bold text-slate-900 sm:text-lg">
              Ready to book this service?
            </h3>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">
              Contact us on WhatsApp or call us directly — we'll reply within 15 minutes.
            </p>

            <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
              {service.whatsappNumber && (
                <a
                  href={`https://wa.me/${service.whatsappNumber.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 text-sm font-bold !text-white shadow-md shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-600 hover:shadow-emerald-500/40 sm:flex-initial sm:px-8"
                >
                  <FaWhatsapp className="text-base" />
                  WhatsApp Booking
                </a>
              )}

              {service.contactNumber && (
                <a
                  href={`tel:${service.contactNumber}`}
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 text-sm font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-teal-500 hover:text-teal-600 sm:flex-initial sm:px-8"
                >
                  <FaPhone className="text-sm" />
                  Call Now
                </a>
              )}
            </div>

            <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-slate-500 sm:text-xs">
              <span className="flex h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              Usually replies within 15 minutes
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox for thumbnail clicks */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
        >
          <button
            onClick={() => setActiveImage(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20"
            aria-label="Close"
          >
            ×
          </button>
          <img
            src={activeImage}
            alt="Preview"
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;