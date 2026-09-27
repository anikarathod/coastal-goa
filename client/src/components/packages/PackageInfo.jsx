import {
  FaMapMarkerAlt,
  FaClock,
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
    highlights = [],
    itinerary = [],
    inclusions = [],
    exclusions = [],
    sections = [],
    featured,
  } = packageData;

  const discount =
    discountPrice > 0
      ? Math.round(((price - discountPrice) / price) * 100)
      : 0;

  return (
    <section className="grid gap-6 lg:grid-cols-3 lg:gap-10">

      {/* LEFT CONTENT */}
      <div className="space-y-6 lg:col-span-2 lg:space-y-10">

        {/* Header */}
        <div>
          {featured && (
            <span className="inline-block rounded-full bg-cyan-600 px-3 py-1 text-xs font-semibold text-white sm:text-sm">
              Featured Package
            </span>
          )}

          <h1 className="mt-3 text-2xl font-bold sm:text-3xl lg:text-4xl">
            {title}
          </h1>

          <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-600 sm:gap-5 sm:text-base">

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
          <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6 lg:p-8">
            <h2 className="mb-4 text-xl font-bold sm:text-2xl">
              Description
            </h2>

            <p className="whitespace-pre-wrap text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
              {description}
            </p>
          </div>
        )}

        {/* Highlights */}
        {highlights.length > 0 && (
          <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6 lg:p-8">
            <h2 className="mb-4 text-xl font-bold sm:text-2xl">
              Highlights
            </h2>

            <div className="grid gap-3 md:grid-cols-2">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border p-3 sm:p-4"
                >
                  ✓ {item}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Sections */}
        {sections?.length > 0 &&
          sections.map((section, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white p-4 shadow-sm sm:p-6 lg:p-8"
            >
              <h2 className="mb-4 text-xl font-bold sm:text-2xl">
                {section.title}
              </h2>

              <div className="whitespace-pre-wrap text-sm leading-7 text-gray-700 sm:text-base sm:leading-8">
                {section.content ||
                  section.description ||
                  section.text ||
                  ""}
              </div>
            </div>
          ))}

        {/* Itinerary */}
        {itinerary.length > 0 && (
          <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6 lg:p-8">
            <h2 className="mb-4 text-xl font-bold sm:text-2xl">
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

                  <p className="mt-2 text-sm text-gray-600 sm:text-base">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Inclusion / Exclusion */}
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">

          {inclusions.length > 0 && (
            <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
              <h2 className="mb-4 text-lg font-bold text-green-600 sm:text-xl">
                Included
              </h2>

              {inclusions.map((item, index) => (
                <div
                  key={index}
                  className="mb-3 flex items-start gap-3"
                >
                  <FaCheckCircle className="mt-1 text-green-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}

          {exclusions.length > 0 && (
            <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
              <h2 className="mb-4 text-lg font-bold text-red-600 sm:text-xl">
                Excluded
              </h2>

              {exclusions.map((item, index) => (
                <div
                  key={index}
                  className="mb-3 flex items-start gap-3"
                >
                  <FaTimesCircle className="mt-1 text-red-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

      {/* RIGHT SIDEBAR */}
      <div>

        <div className="sticky top-24 rounded-3xl border bg-white p-5 shadow-lg sm:p-6 lg:p-8">

          {discountPrice > 0 && (
            <p className="text-lg text-gray-400 line-through">
              ₹{price}
            </p>
          )}

          <h2 className="mt-2 text-3xl font-bold text-cyan-700 sm:text-4xl lg:text-5xl">
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
            className="mt-6 block rounded-xl bg-cyan-600 py-3 text-center font-semibold text-white transition hover:bg-cyan-700"
          >
            Book Now
          </Link>

        </div>

      </div>

    </section>
  );
};

export default PackageInfo;