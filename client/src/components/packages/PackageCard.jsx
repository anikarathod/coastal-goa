import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

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
      className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* Image */}
      <div className="relative h-52 sm:h-56 md:h-64 overflow-hidden">

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

        {featured && (
          <span className="absolute left-3 top-3 rounded-full bg-cyan-600 px-3 py-1 text-xs font-semibold text-white">
            Featured
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

        <h3 className="line-clamp-2 min-h-[56px] text-lg font-bold text-gray-900">
          {title}
        </h3>

        {location && (
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
            <FaMapMarkerAlt className="text-cyan-600" />
            <span>{location}</span>
          </div>
        )}

        <div className="mt-2 flex items-center gap-1">
          <FaStar className="text-yellow-400" />
          <span className="text-sm font-medium">
            {rating}
          </span>
          <span className="text-sm text-gray-500">
            ({reviews} reviews)
          </span>
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

          <span className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700">
            View Details
          </span>

        </div>

      </div>
    </Link>
  );
};

export default PackageCard;