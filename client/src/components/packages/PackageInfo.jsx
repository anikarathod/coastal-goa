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
  sections = [],
  featured,
} = packageData;

  const discount =
    discountPrice > 0
      ? Math.round(
          ((price - discountPrice) / price) * 100
        )
      : 0;

  return (
  <section className="grid gap-10 lg:grid-cols-3">

    {/* LEFT CONTENT */}
    <div className="lg:col-span-2 space-y-10">

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

        </div>
      </div>

      {/* Description */}
      {description && (
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold">
            Description
          </h2>

          <p className="leading-8 whitespace-pre-wrap text-gray-600">
            {description}
          </p>
        </div>
      )}

      {/* Highlights */}
      {highlights.length > 0 && (
        <div className="rounded-2xl bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-2xl font-bold">
            Highlights
          </h2>

          <div className="grid gap-4 md:grid-cols-2">

            {highlights.map((item, index) => (
              <div
                key={index}
                className="rounded-xl border p-4"
              >
                ✓ {item}
              </div>
            ))}

          </div>
        </div>
      )}
        {/* Dynamic Sections */}
{sections.length > 0 &&
  sections.map((section, index) => (
    <div
      key={index}
      className="rounded-2xl bg-white p-8 shadow-sm"
    >
      <h2 className="mb-6 text-2xl font-bold">
        {section.title}
      </h2>

      <div className="grid gap-3">
        {section.items?.map((item, itemIndex) => (
          <div
            key={itemIndex}
            className="rounded-xl border border-gray-200 p-4"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  ))}
      {/* Itinerary */}
      {itinerary.length > 0 && (
        <div className="rounded-2xl bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-2xl font-bold">
            Tour Itinerary
          </h2>

          <div className="space-y-4">

            {itinerary.map((item, index) => (
              <div
                key={item._id || index}
                className="rounded-xl border p-4"
              >
                <h4 className="font-semibold text-cyan-700">
                  {item.day}
                </h4>

                <h5 className="mt-2 font-semibold">
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

      {/* Inclusion / Exclusion */}
      <div className="grid gap-6 md:grid-cols-2">

        {inclusions.length > 0 && (
          <div className="rounded-2xl bg-white p-8 shadow-sm">

            <h2 className="mb-4 text-xl font-bold text-green-600">
              Included
            </h2>

            {inclusions.map((item, index) => (
              <div
                key={index}
                className="mb-3 flex items-center gap-3"
              >
                <FaCheckCircle className="text-green-500" />
                {item}
              </div>
            ))}
          </div>
        )}

        {exclusions.length > 0 && (
          <div className="rounded-2xl bg-white p-8 shadow-sm">

            <h2 className="mb-4 text-xl font-bold text-red-600">
              Excluded
            </h2>

            {exclusions.map((item, index) => (
              <div
                key={index}
                className="mb-3 flex items-center gap-3"
              >
                <FaTimesCircle className="text-red-500" />
                {item}
              </div>
            ))}
          </div>
        )}

      </div>

    </div>

    {/* RIGHT SIDEBAR */}
    <div>

      <div className="sticky top-24 rounded-3xl border bg-white p-8 shadow-lg">

        {discountPrice > 0 && (
          <p className="text-xl text-gray-400 line-through">
            ₹{price}
          </p>
        )}

        <h2 className="mt-2 text-5xl font-bold text-cyan-700">
          ₹{discountPrice > 0 ? discountPrice : price}
        </h2>

        <p className="mt-2 text-gray-500">
          Per Person
        </p>

        {discount > 0 && (
          <div className="mt-4 rounded-lg bg-green-100 p-3 text-center font-semibold text-green-700">
            Save {discount}%
          </div>
        )}

        <Link
          to="/booking"
          state={{ packageData }}
          className="mt-6 block rounded-xl bg-cyan-600 py-4 text-center font-semibold text-white hover:bg-cyan-700"
        >
          Book Now
        </Link>

      </div>

    </div>
  </section>
);
};

export default PackageInfo;