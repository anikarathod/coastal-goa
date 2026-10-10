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

  // ✅ Handle multiple price field names
  const finalPrice = discountPrice && discountPrice > 0 ? discountPrice : price;
  const basePrice = originalPrice || price;

  // ✅ Fix: discount calc uses basePrice vs finalPrice
  const discount =
    basePrice && finalPrice && basePrice > finalPrice
      ? Math.round(((basePrice - finalPrice) / basePrice) * 100)
      : 0;

  return (
    <Link
      to={`/packages/${slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg"
    >
      {/* IMAGE */}
      <div className="relative h-48 overflow-hidden sm:h-52">
        <img
          src={coverImage || "https://placehold.co/600x400?text=Package"}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "https://placehold.co/600x400?text=Package";
          }}
        />

        {/* Gradient overlay for text readability */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

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

        {/* LOCATION OVERLAY */}
        {location && (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            <FaMapMarkerAlt className="text-[10px]" />
            {location}
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">

        {/* TITLE */}
        <h3 className="line-clamp-2 text-base font-bold text-gray-900 transition group-hover:text-teal-700 sm:text-lg">
          {title}
        </h3>

        {/* META ROW */}
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
              <span className="font-semibold text-gray-900">{rating}</span>
              <span className="text-gray-500">Rating</span>
            </span>
          )}
        </div>

        {/* PICKUP TAG */}
        <div className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
          <FaCheckCircle className="text-[10px]" />
          Pickup Included
        </div>

        {/* PRICE + CTA (pushed to bottom) */}
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
              From
            </p>

            <div className="flex items-baseline gap-2">
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

          {/* CTA */}
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-teal-600 px-3 py-2 text-xs font-bold text-white shadow-sm transition group-hover:bg-teal-700 sm:px-4 sm:text-sm">
            View
            <FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PackageCard;