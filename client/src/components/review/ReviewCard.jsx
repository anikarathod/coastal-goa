import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaQuoteLeft,
} from "react-icons/fa";
import Rating from "./Rating";

const ReviewCard = ({ review }) => {
  if (!review) return null;

  const {
    name,
    image,
    rating,
    review: reviewText,
    location,
    date,
    packageName,
  } = review;

  return (
    <div className="group rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* Quote */}

      <div className="mb-6 flex justify-between">

        <FaQuoteLeft className="text-4xl text-cyan-600 opacity-30" />

        <Rating value={rating} />

      </div>

      {/* Review */}

      <p className="mb-8 leading-7 text-gray-600">
        "{reviewText}"
      </p>

      {/* Package */}

      {packageName && (
        <div className="mb-6">

          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            {packageName}
          </span>

        </div>
      )}

      {/* User */}

      <div className="flex items-center gap-4">

        <img
          src={
            image ||
            "https://ui-avatars.com/api/?name=" +
              encodeURIComponent(name)
          }
          alt={name}
          className="h-16 w-16 rounded-full object-cover border-2 border-cyan-600"
        />

        <div className="flex-1">

          <h3 className="text-lg font-bold">
            {name}
          </h3>

          <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">

            <div className="flex items-center gap-2">

              <FaMapMarkerAlt />

              {location}

            </div>

            <div className="flex items-center gap-2">

              <FaCalendarAlt />

              {date}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ReviewCard;