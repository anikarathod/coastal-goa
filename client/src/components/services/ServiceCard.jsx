import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";

const ServiceCard = ({ service }) => {
  if (!service) return null;

  const {
    _id,
    title,
    description,
    image,
    category,
    location,
    price,
    originalPrice,
    rating = 5,
    totalReviews = 0,
    featured = false,
  } = service;

  const discount =
    originalPrice && originalPrice > price
      ? Math.round(
          ((originalPrice - price) / originalPrice) * 100
        )
      : 0;

  return (
    <Link
      to={`/services/${_id}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">

        <img
          src={
            image ||
            "https://placehold.co/600x400?text=Service"
          }
          alt={title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          onError={(e) => {
            e.target.src =
              "https://placehold.co/600x400?text=Service";
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {featured && (
          <span className="absolute left-3 top-3 rounded-full bg-cyan-600 px-3 py-1 text-xs font-semibold text-white">
            Popular
          </span>
        )}

        {discount > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">

        {category && (
          <span className="inline-block rounded-full bg-cyan-100 px-3 py-1 text-xs font-medium text-cyan-700">
            {category}
          </span>
        )}

        <h3 className="mt-3 line-clamp-2 text-base font-bold text-gray-900">
          {title}
        </h3>

        {description && (
          <p className="mt-2 line-clamp-2 text-xs text-gray-600">
            {description}
          </p>
        )}

        {location && (
          <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
            <FaMapMarkerAlt className="text-cyan-600" />
            <span>{location}</span>
          </div>
        )}

        {/* Rating */}
        <div className="mt-3 flex items-center gap-2">

          <FaStar className="text-yellow-400" />

          <span className="font-semibold text-sm">
            {rating}
          </span>

          <span className="text-xs text-gray-400">
            ({totalReviews} reviews)
          </span>

        </div>

        {/* Bottom */}
        <div className="mt-4 flex items-center justify-between border-t pt-4">

          <div>

            {originalPrice > price && (
              <p className="text-xs text-gray-400 line-through">
                ₹{originalPrice}
              </p>
            )}

            <p className="text-xl font-bold text-cyan-700">
              ₹{price}
            </p>

          </div>

          <span className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-700">
            View
          </span>

        </div>

      </div>
    </Link>
  );
};

export default ServiceCard;