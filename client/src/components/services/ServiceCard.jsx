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
      className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={
            image ||
            "https://placehold.co/400x400?text=Service"
          }
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src =
              "https://placehold.co/400x400?text=Service";
          }}
        />

        {featured && (
          <span className="absolute left-2 top-2 rounded-full bg-cyan-600 px-2 py-1 text-[9px] font-semibold text-white">
            Featured
          </span>
        )}

        {discount > 0 && (
          <span className="absolute right-2 top-2 rounded-full bg-red-500 px-2 py-1 text-[9px] font-semibold text-white">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        {category && (
          <span className="rounded-full bg-cyan-100 px-2 py-1 text-[9px] font-medium text-cyan-700">
            {category}
          </span>
        )}
<h3 className="mt-2 truncate text-sm font-bold text-gray-900">
  {title}
</h3>

{description && (
  <p className="mt-2 whitespace-pre-wrap text-xs text-gray-600 line-clamp-6">
    {description}
  </p>
)}

        {location && (
          <div className="mt-1 flex items-center gap-1 text-[11px] text-gray-500">
            <FaMapMarkerAlt className="text-cyan-600" />
            <span>{location}</span>
          </div>
        )}

        <div className="mt-1 flex items-center gap-1">
          <FaStar className="text-[10px] text-yellow-400" />
          <span className="text-[10px]">
            {rating}
          </span>
          <span className="text-[10px] text-gray-400">
            ({totalReviews})
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div>
            {originalPrice > price && (
              <p className="text-[9px] text-gray-400 line-through">
                ₹{originalPrice}
              </p>
            )}

            <p className="text-lg font-bold text-cyan-700">
              ₹{price}
            </p>
          </div>

          <span className="rounded-lg bg-cyan-600 px-2 py-1 text-[10px] font-semibold text-white">
            View
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;