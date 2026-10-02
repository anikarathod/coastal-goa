import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaStar,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

const PackageCard = ({ packageData }) => {
  if (!packageData) return null;

  const {
    title,
    slug,
    coverImage,
    location,
    price,
    originalPrice,
    rating = 5,
    reviews = 0,
    featured,
    duration = "1 Day",
  } = packageData;

  const discount =
    originalPrice && originalPrice > price
      ? Math.round(
          ((originalPrice - price) / originalPrice) * 100
        )
      : 0;

  return (
    <Link
      to={`/packages/${slug}`}
      className="group block overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* Image */}
      <div className="relative h-60 overflow-hidden">

        <img
          src={
            coverImage ||
            "https://placehold.co/600x400?text=Package"
          }
          alt={title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          onError={(e) => {
            e.target.src =
              "https://placehold.co/600x400?text=Package";
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Featured */}
        {featured && (
          <span className="absolute left-3 top-3 rounded-full bg-cyan-600 px-3 py-1 text-xs font-semibold text-white">
            Bestseller
          </span>
        )}

        {/* Discount */}
        {discount > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
            {discount}% OFF
          </span>
        )}

        {/* Price */}
        <div className="absolute bottom-3 right-3 rounded-xl bg-white px-4 py-2 shadow-lg">

          <p className="text-xs text-gray-500">
            Starting From
          </p>

          <p className="text-lg font-bold text-cyan-600">
            ₹{price}
          </p>

        </div>

      </div>

      {/* Content */}
      <div className="p-5">

        <h3 className="line-clamp-2 text-xl font-bold text-gray-900">
          {title}
        </h3>

        {/* Location */}
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
          <FaMapMarkerAlt className="text-cyan-600" />
          <span>{location || "Goa"}</span>
        </div>

        {/* Extra Info */}
        <div className="mt-3 flex flex-wrap gap-2">

          <span className="flex items-center gap-1 rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700">
            <FaClock />
            {duration}
          </span>

          <span className="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
            <FaCheckCircle />
            Pickup Included
          </span>

        </div>

        {/* Rating */}
        <div className="mt-4 flex items-center gap-2">

          <FaStar className="text-yellow-400" />

          <span className="font-semibold">
            {rating}
          </span>

          <span className="text-sm text-gray-500">
            ({reviews} reviews)
          </span>

        </div>

        {/* Price + Button */}
        <div className="mt-5 flex items-center justify-between">

          <div>

            {originalPrice > price && (
              <p className="text-sm text-gray-400 line-through">
                ₹{originalPrice}
              </p>
            )}

            <p className="text-2xl font-bold text-cyan-600">
              ₹{price}
            </p>

          </div>

          <span className="rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700">
            Book Now
          </span>

        </div>

      </div>

    </Link>
  );
};

export default PackageCard;