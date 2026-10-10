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
    <section className="grid gap-8 lg:grid-cols-3 lg:gap-10">

      {/* LEFT CONTENT */}
      <div className="space-y-6 lg:col-span-2 lg:space-y-8">

        {/* Header */}
        <div>
          {featured && (
            <span className="inline-block rounded-full bg-teal-600 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm sm:text-sm">
              Featured Package
            </span>
          )}

          <h1 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-600 sm:gap-6 sm:text-base">
            {location && (
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-teal-600" />
                {location}
              </div>
            )}

            {duration && (
              <div className="flex items-center gap-2">
                <FaClock className="text-teal-600" />
                {duration}
              </div>
            )}

            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-400" />
              <span className="font-medium text-gray-900">{rating} Rating</span>
            </div>
          </div>
        </div>

        {/* Description */}
        {description && (
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7 lg:p-8">
            <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
              Description
            </h2>

            <p className="whitespace-pre-wrap text-base leading-relaxed text-gray-600 sm:leading-loose">
              {description}
            </p>
          </div>
        )}

        {/* Highlights */}
        {highlights.length > 0 && (
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7 lg:p-8">
            <h2 className="mb-5 text-xl font-bold text-gray-900 sm:text-2xl">
              Highlights
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-xl border border-gray-50 bg-gray-50/50 p-4 transition-colors hover:border-teal-100 hover:bg-teal-50/30"
                >
                  <span className="text-teal-600">✓</span>
                  <span className="text-sm font-medium text-gray-700 sm:text-base">{item}</span>
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
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7 lg:p-8"
            >
              <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
                {section.title}
              </h2>

              <div className="whitespace-pre-wrap text-base leading-relaxed text-gray-600 sm:leading-loose">
                {section.content ||
                  section.description ||
                  section.text ||
                  ""}
              </div>
            </div>
          ))}

        {/* Itinerary */}
        {itinerary.length > 0 && (
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7 lg:p-8">
            <h2 className="mb-5 text-xl font-bold text-gray-900 sm:text-2xl">
              Tour Itinerary
            </h2>

            <div className="space-y-4">
              {itinerary.map((item, index) => (
                <div
                  key={item._id || index}
                  className="rounded-xl border border-gray-100 p-4 transition-shadow hover:shadow-md"
                >
                  <h4 className="inline-block rounded-md bg-teal-50 px-2 py-1 text-sm font-bold text-teal-700">
                    {item.day}
                  </h4>

                  <h5 className="mt-3 font-semibold text-gray-900">
                    {item.title}
                  </h5>

                  <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">
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
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
              <h2 className="mb-5 text-lg font-bold text-green-700 sm:text-xl">
                What's Included
              </h2>

              <div className="space-y-3">
                {inclusions.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <FaCheckCircle className="mt-1 shrink-0 text-green-500" />
                    <span className="text-sm text-gray-700 sm:text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {exclusions.length > 0 && (
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
              <h2 className="mb-5 text-lg font-bold text-red-700 sm:text-xl">
                What's Excluded
              </h2>

              <div className="space-y-3">
                {exclusions.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <FaTimesCircle className="mt-1 shrink-0 text-red-500" />
                    <span className="text-sm text-gray-700 sm:text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* RIGHT SIDEBAR (PRICE & BOOKING) */}
      <div className="relative">
        <div className="sticky top-24 rounded-3xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8">
          
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Starting from</p>
            {discount > 0 && (
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                Save {discount}%
              </span>
            )}
          </div>

          <div className="mt-2 flex items-baseline gap-2">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              ₹{discountPrice > 0 ? discountPrice : price}
            </h2>
            <span className="text-gray-500">/ person</span>
          </div>

          {discountPrice > 0 && (
            <p className="mt-2 text-lg text-gray-400 line-through">
              ₹{price}
            </p>
          )}

          <Link
            to="/booking"
            state={{ packageData }}
            className="mt-8 block w-full rounded-xl bg-teal-600 py-4 text-center text-lg font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-lg"
          >
            Book Now
          </Link>

          <p className="mt-4 text-center text-xs text-gray-500">
            Free cancellation up to 24 hours
          </p>
        </div>
      </div>

    </section>
  );
};

export default PackageInfo;