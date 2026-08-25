import {
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
  FaStar,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const PackageInfo = ({ packageData }) => {
  if (!packageData) return null;

  const {
    title,
    description,
    location,
    duration,
    price,
    discountPrice,
    rating = 5,
    reviews = 0,
    highlights = [],
    itinerary = [],
    inclusions = [],
    exclusions = [],
    featured,
  } = packageData;

  const discount =
    discountPrice > 0
      ? Math.round(
          ((price - discountPrice) / price) * 100
        )
      : 0;

  return (
    <section className="space-y-8">

      {/* Header */}
      <div>
        {featured && (
          <span className="inline-block rounded-full bg-cyan-600 px-4 py-1 text-sm font-semibold text-white">
            Featured Package
          </span>
        )}

        <h1 className="mt-4 text-4xl font-bold">
          {title}
        </h1>

        <div className="mt-5 flex flex-wrap gap-6 text-gray-600">
          {location && (
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-cyan-600" />
              {location}
            </div>
          )}

          {duration && (
            <div className="flex items-center gap-2">
              <FaClock className="text-cyan-600" />
              {duration}
            </div>
          )}

          <div className="flex items-center gap-2">
            <FaStar className="text-yellow-400" />
            {rating} Rating
          </div>

          <div className="flex items-center gap-2">
            <FaUsers className="text-cyan-600" />
            {reviews} Reviews
          </div>
        </div>
      </div>

      {/* Description */}
      {description && (
        <div>
          <h2 className="mb-3 text-2xl font-bold">
            Description
          </h2>

          <p className="leading-8 text-gray-600 whitespace-pre-wrap">
            {description}
          </p>
        </div>
      )}

      {/* Price Card */}
      <div className="rounded-2xl border bg-cyan-50 p-6">
        <div className="flex flex-wrap items-center justify-between">
          <div>
            {discountPrice > 0 && (
              <p className="text-lg text-gray-400 line-through">
                ₹{price}
              </p>
            )}

            <h2 className="text-5xl font-bold text-cyan-700">
              ₹{discountPrice > 0 ? discountPrice : price}
            </h2>

            <p className="mt-2 text-gray-600">
              Per Person
            </p>
          </div>

          <div className="text-right">
            {discount > 0 && (
              <p className="text-lg font-semibold text-green-600">
                Save {discount}%
              </p>
            )}

            <Link
              to="/booking"
              state={{ packageData }}
              className="mt-4 inline-block rounded-xl bg-cyan-600 px-8 py-4 font-semibold text-white transition hover:bg-cyan-700"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>

      {/* Tour Itinerary */}
      {itinerary.length > 0 && (
        <div>
          <h2 className="mb-5 text-2xl font-bold">
            Tour Itinerary
          </h2>

          <div className="space-y-4">
            {itinerary.map((item, index) => (
              <div
                key={item._id || index}
                className="rounded-xl bg-gray-50 p-4"
              >
                <h4 className="font-semibold text-cyan-700">
                  {item.day}
                </h4>

                <h5 className="mt-1 font-medium">
                  {item.title}
                </h5>

                <p className="mt-2 text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inclusions & Exclusions */}
      {(inclusions.length > 0 || exclusions.length > 0) && (
        <div className="grid gap-8 lg:grid-cols-2">

          {inclusions.length > 0 && (
            <div>
              <h2 className="mb-4 text-2xl font-bold">
                What's Included
              </h2>

              <div className="space-y-3">
                {inclusions.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3"
                  >
                    <FaCheckCircle className="text-green-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {exclusions.length > 0 && (
            <div>
              <h2 className="mb-4 text-2xl font-bold">
                Not Included
              </h2>

              <div className="space-y-3">
                {exclusions.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3"
                  >
                    <FaTimesCircle className="text-red-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* Highlights */}
      {highlights.length > 0 && (
        <div>
          <h2 className="mb-4 text-2xl font-bold">
            Highlights
          </h2>

          <div className="grid gap-3 md:grid-cols-2">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="rounded-lg bg-cyan-50 p-3"
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </div>
      )}

    </section>
  );
};

export default PackageInfo;