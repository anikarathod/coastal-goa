import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaClock,
  FaStar,
  FaUsers,
} from "react-icons/fa";

const PackageCard = ({ packageData }) => {
  if (!packageData) return null;

  const {
    _id,
    title,
    slug,
    coverImage,
    location,
    duration,
    price,
    originalPrice,
    rating = 5,
    reviews = 0,
    maxPeople,
    featured,
  } = packageData;

  const discount =
    originalPrice && originalPrice > price
      ? Math.round(
          ((originalPrice - price) / originalPrice) * 100
        )
      : 0;

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
      
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={
            coverImage ||
            "https://placehold.co/600x400?text=No+Image"
          }
          alt={title}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src =
              "https://placehold.co/600x400?text=No+Image";
          }}
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
        <h3 className="text-2xl font-bold text-gray-900">
          {title}
        </h3>

        {location && (
          <div className="mt-3 flex items-center gap-2 text-gray-600">
            <FaMapMarkerAlt className="text-cyan-600" />
            <span>{location}</span>
          </div>
        )}

        {duration && (
          <div className="mt-2 flex items-center gap-2 text-gray-600">
            <FaClock className="text-cyan-600" />
            <span>{duration}</span>
          </div>
        )}

        {maxPeople && (
          <div className="mt-2 flex items-center gap-2 text-gray-600">
            <FaUsers className="text-cyan-600" />
            <span>Up to {maxPeople} People</span>
          </div>
        )}

        <div className="mt-4 flex items-center gap-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={
                  index < Math.round(rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>

          <span className="text-sm text-gray-600">
            ({reviews} Reviews)
          </span>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div>
            {originalPrice > price && (
              <p className="text-sm text-gray-400 line-through">
                ₹{originalPrice}
              </p>
            )}

            <h4 className="text-3xl font-bold text-cyan-600">
              ₹{price}
            </h4>

            <p className="text-sm text-gray-500">
              Per Person
            </p>
          </div>

          {/* FIXED */}
          <Link
            to={`/packages/${slug}`}
            className="rounded-lg bg-cyan-600 px-5 py-3 font-semibold text-white transition hover:bg-cyan-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;