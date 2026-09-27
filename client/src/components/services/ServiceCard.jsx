import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

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
      className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={
            image ||
            "https://placehold.co/600x400?text=Service"
          }
          alt={title}
          className="h-48 w-full object-cover transition duration-500 group-hover:scale-110 sm:h-56 lg:h-64"
          onError={(e) => {
            e.target.src =
              "https://placehold.co/600x400?text=Service";
          }}
        />

        {featured && (
          <span className="absolute left-3 top-3 rounded-full bg-cyan-600 px-3 py-1 text-xs font-semibold text-white shadow">
            Featured
          </span>
        )}

        {discount > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white shadow">
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

        <h3 className="mt-3 line-clamp-2 text-lg font-bold text-gray-900">
          {title}
        </h3>

        {description && (
          <p className="mt-2 line-clamp-3 text-sm text-gray-600">
            {description}
          </p>
        )}

        {location && (
          <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
            <FaMapMarkerAlt className="text-cyan-600" />
            <span>{location}</span>
          </div>
        )}

        <div className="mt-2 flex items-center gap-1">
          <FaStar className="text-yellow-400" />
          <span className="text-sm font-medium">
            {rating}
          </span>
          <span className="text-sm text-gray-400">
            ({totalReviews})
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            {originalPrice > price && (
              <p className="text-sm text-gray-400 line-through">
                ₹{originalPrice}
              </p>
            )}

            <p className="text-2xl font-bold text-cyan-700">
              ₹{price}
            </p>
          </div>

          <span className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;