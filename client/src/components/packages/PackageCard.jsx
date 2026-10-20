import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaCheckCircle,
  FaClock,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";

const PackageCard = ({ packageData }) => {
  if (!packageData) return null;

  const {
    title,
    slug,
    coverImage,
    location,
    duration,
    price,
    discountPrice,
    originalPrice,
    rating,
    featured,
  } = packageData;

  const finalPrice =
    discountPrice > 0 ? discountPrice : price;

  const basePrice = originalPrice || price;

  const discount =
    basePrice > finalPrice && finalPrice > 0
      ? Math.round(
          ((basePrice - finalPrice) / basePrice) * 100
        )
      : 0;

  return (
    <Link
      to={`/packages/${slug}`}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg"
    >
      {/* IMAGE CONTAINER */}
      <div className="relative isolate h-48 w-full shrink-0 overflow-hidden bg-gray-100 sm:h-52">
        <img
          src={
            coverImage ||
            "https://placehold.co/600x400?text=Package"
          }
          alt={title || "Tour package"}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 block h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            if (!e.currentTarget.dataset.fallback) {
              e.currentTarget.dataset.fallback = "true";
              e.currentTarget.src =
                "https://placehold.co/600x400?text=Package";
            }
          }}
        />

        {/* SUBTLE GRADIENT */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

        {/* FEATURED BADGE */}
        {featured && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-teal-600 px-3 py-1 text-xs font-bold text-white shadow-md">
            ⭐ Bestseller
          </span>
        )}

        {/* DISCOUNT BADGE */}
        {discount > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-md">
            {discount}% OFF
          </span>
        )}

        {/* LOCATION */}
        {location && (
          <span className="absolute bottom-3 left-3 inline-flex max-w-[90%] items-center gap-1.5 truncate rounded-full bg-black/65 px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
            <FaMapMarkerAlt className="shrink-0 text-[10px]" />
            <span className="truncate">{location}</span>
          </span>
        )}
      </div>

      {/* PACKAGE DETAILS */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="line-clamp-2 text-base font-bold text-gray-900 transition-colors group-hover:text-teal-700 sm:text-lg">
          {title}
        </h3>

        {/* DURATION AND RATING */}
        <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-gray-600 sm:text-sm">
          {duration && (
            <span className="inline-flex items-center gap-1.5">
              <FaClock className="text-xs text-teal-600" />
              {duration}
            </span>
          )}

          {rating > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <FaStar className="text-xs text-yellow-500" />
              <span className="font-semibold text-gray-900">
                {rating}
              </span>
              <span className="text-gray-500">Rating</span>
            </span>
          )}
        </div>

        {/* PICKUP */}
        <div className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
          <FaCheckCircle className="text-[10px]" />
          Pickup Included
        </div>

        {/* PRICE AND BUTTON */}
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
              From
            </p>

            <div className="flex flex-wrap items-baseline gap-2">
              <p className="text-xl font-extrabold text-teal-700 sm:text-2xl">
                ₹{finalPrice?.toLocaleString("en-IN")}
              </p>

              {discount > 0 && (
                <p className="text-xs text-gray-400 line-through sm:text-sm">
                  ₹{basePrice?.toLocaleString("en-IN")}
                </p>
              )}
            </div>
          </div>

          {/* VIEW BUTTON */}
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-teal-600 px-3 py-2 text-xs font-bold text-white shadow-sm transition-colors group-hover:bg-teal-700 sm:px-4 sm:text-sm">
            View
            <FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;