import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaStar,
  FaArrowRight,
  FaCheckCircle,
  FaTag,
} from "react-icons/fa";

const FALLBACK =
  "https://placehold.co/600x400/e2e8f0/475569?text=Service";

const ServiceCard = ({ service }) => {
  if (!service) return null;

  const {
    _id,
    id,
    title,
    name,
    image,
    imageUrl,
    coverImage,
    thumbnail,
    price,
    startingPrice,
    fromPrice,
    discountPrice,
    category,
    location,
    rating,
    featured,
  } = service;

  // Handle multiple field name variations
  const serviceId = _id || id;
  const displayTitle = title || name || "Goa Travel Service";
  const displayImage =
    image || imageUrl || coverImage || thumbnail || FALLBACK;

  // Handle multiple price field names
  const basePrice = startingPrice || price || fromPrice;
  const finalPrice =
    discountPrice && discountPrice > 0 ? discountPrice : basePrice;

  const discount =
    basePrice && finalPrice && basePrice > finalPrice
      ? Math.round(((basePrice - finalPrice) / basePrice) * 100)
      : 0;

  return (
    <Link
      to={`/services/${serviceId}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg"
    >
      {/* IMAGE */}
      <div className="relative h-40 overflow-hidden bg-slate-100 sm:h-48">
        <img
          src={displayImage}
          alt={displayTitle}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            if (e.currentTarget.src === FALLBACK) return;
            e.currentTarget.src = FALLBACK;
          }}
        />

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* FEATURED BADGE */}
        {featured && (
          <span className="absolute left-1.5 top-1.5 inline-flex items-center gap-1 rounded-full bg-teal-600 px-2 py-0.5 text-[9px] font-bold text-white shadow-md sm:left-3 sm:top-3 sm:px-3 sm:py-1 sm:text-xs">
            ⭐ Featured
          </span>
        )}

        {/* DISCOUNT BADGE */}
        {discount > 0 && (
          <span className="absolute right-1.5 top-1.5 rounded-full bg-rose-500 px-2 py-0.5 text-[9px] font-bold text-white shadow-md sm:right-3 sm:top-3 sm:px-3 sm:py-1 sm:text-xs">
            {discount}% OFF
          </span>
        )}

        {/* CATEGORY OVERLAY */}
        {category && (
          <span className="absolute bottom-1.5 left-1.5 right-1.5 inline-flex items-center gap-1 truncate rounded-full bg-black/60 px-2 py-0.5 text-[9px] font-medium text-white backdrop-blur-sm sm:bottom-3 sm:left-3 sm:right-auto sm:max-w-[calc(100%-24px)] sm:px-3 sm:py-1 sm:text-xs">
            <FaTag className="shrink-0 text-[8px] sm:text-[10px]" />
            <span className="truncate">{category}</span>
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-3 sm:p-4 md:p-5">

        {/* TITLE */}
        <h3 className="line-clamp-2 text-sm font-bold leading-tight text-slate-900 transition group-hover:text-teal-700 sm:text-base md:text-lg">
          {displayTitle}
        </h3>

        {/* META ROW */}
        {(location || rating > 0) && (
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-600 sm:mt-2.5 sm:text-sm">
            {location && (
              <span className="inline-flex items-center gap-1 truncate">
                <FaMapMarkerAlt className="shrink-0 text-[10px] text-teal-600 sm:text-xs" />
                <span className="truncate">{location}</span>
              </span>
            )}

            {rating > 0 && (
              <span className="inline-flex items-center gap-1">
                <FaStar className="text-[10px] text-amber-400 sm:text-xs" />
                <span className="font-semibold text-slate-900">{rating}</span>
              </span>
            )}
          </div>
        )}

        {/* TRUST BADGE */}
        <div className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 sm:mt-3 sm:py-1 sm:text-xs">
          <FaCheckCircle className="text-[9px] sm:text-[10px]" />
          Verified Service
        </div>

        {/* PRICE + CTA */}
        <div className="mt-auto flex items-end justify-between gap-2 pt-3 sm:gap-3 sm:pt-4">
          <div className="min-w-0">
            <p className="text-[9px] font-medium uppercase tracking-wider text-slate-500 sm:text-[10px]">
              Starting from
            </p>

            <div className="flex flex-wrap items-baseline gap-x-1.5">
              <p className="text-base font-extrabold text-teal-700 sm:text-xl md:text-2xl">
                {finalPrice ? `₹${finalPrice.toLocaleString("en-IN")}` : "—"}
              </p>

              {discount > 0 && basePrice && (
                <p className="text-[10px] text-slate-400 line-through sm:text-xs md:text-sm">
                  ₹{basePrice.toLocaleString("en-IN")}
                </p>
              )}
            </div>
          </div>

          {/* CTA */}
          <span className="inline-flex min-h-8 shrink-0 items-center gap-1 rounded-lg bg-teal-600 px-2.5 py-1.5 text-[11px] font-bold !text-white shadow-sm transition group-hover:bg-teal-700 sm:min-h-9 sm:gap-1.5 sm:px-3.5 sm:py-2 sm:text-xs md:text-sm">
            View
            <FaArrowRight className="text-[9px] transition-transform group-hover:translate-x-0.5 sm:text-[10px]" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;