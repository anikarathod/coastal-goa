import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaClock,
  FaStar,
  FaArrowRight,
} from "react-icons/fa";

const ServiceCard = ({ service }) => {
  if (!service) return null;

  const {
    _id,
    title,
    image,
    category,
    location,
    duration,
    price,
    originalPrice,
    rating = 5,
    totalReviews = 0,
    featured = false,
  } = service;

  const discount =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={image || "https://placehold.co/600x400?text=Service"}
          alt={title}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
        />

        {featured && (
          <span className="absolute left-4 top-4 rounded-full bg-cyan-600 px-4 py-1 text-sm font-semibold text-white">
            Featured
          </span>
        )}

        {discount > 0 && (
          <span className="absolute right-4 top-4 rounded-full bg-red-500 px-4 py-1 text-sm font-semibold text-white">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <span className="rounded-full bg-cyan-100 px-3 py-1 text-sm font-medium text-cyan-700">
          {category}
        </span>

        <h3 className="mt-4 text-2xl font-bold text-gray-900">
          {title}
        </h3>

        <div className="mt-4 flex items-center gap-2 text-gray-600">
          <FaMapMarkerAlt className="text-cyan-600" />
          <span>{location}</span>
        </div>

        <div className="mt-2 flex items-center gap-2 text-gray-600">
          <FaClock className="text-cyan-600" />
          <span>{duration}</span>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <FaStar className="text-yellow-400" />

          <span className="font-semibold">
            {rating}
          </span>

          <span className="text-gray-500">
            ({totalReviews} Reviews)
          </span>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div>
            {originalPrice && originalPrice > price && (
              <p className="text-gray-400 line-through">
                ₹{originalPrice}
              </p>
            )}

            <h2 className="text-3xl font-bold text-cyan-700">
              ₹{price}
            </h2>
          </div>

          <Link
            to={`/services/${_id}`}
            className="flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-3 font-semibold text-white transition hover:bg-cyan-700"
          >
            Details
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;