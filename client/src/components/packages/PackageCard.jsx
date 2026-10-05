import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
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
    featured,
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
      className="group block overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">

        <img
          src={
            coverImage ||
            "https://placehold.co/600x400?text=Package"
          }
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src =
              "https://placehold.co/600x400?text=Package";
          }}
        />

        {featured && (
          <span className="absolute left-3 top-3 rounded-full bg-cyan-600 px-3 py-1 text-xs font-semibold text-white">
            Bestseller
          </span>
        )}

        {discount > 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
            {discount}% OFF
          </span>
        )}

        <div className="absolute bottom-3 right-3 rounded-lg bg-white px-3 py-1 shadow">
          <p className="text-xs text-gray-500">
            From
          </p>

          <p className="text-lg font-bold text-cyan-600">
            ₹{price}
          </p>
        </div>

      </div>

      {/* Content */}
      <div className="p-4">

        <h3 className="line-clamp-2 text-lg font-bold text-gray-900">
          {title}
        </h3>

        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <FaMapMarkerAlt className="text-cyan-600" />
          {location || "Goa"}
        </div>

        <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
          <FaCheckCircle />
          Pickup Included
        </div>

        <div className="mt-4 flex items-center justify-between">

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

          <span className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white">
            Book Now
          </span>

        </div>

      </div>
    </Link>
  );
};

export default PackageCard;