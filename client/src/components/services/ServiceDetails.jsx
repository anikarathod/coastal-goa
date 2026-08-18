import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaClock,
  FaMoneyBillWave,
} from "react-icons/fa";

const ServiceDetails = ({ service }) => {
  if (!service) return null;

  return (
    <div className="rounded-xl bg-white p-6 shadow-lg">

      <img
        src={service.coverImage || service.image}
        alt={service.title}
        className="mb-6 h-80 w-full rounded-lg object-cover"
      />

      <h1 className="mb-4 text-3xl font-bold">
        {service.title}
      </h1>

      {service.shortDescription && (
        <p className="mb-4 text-lg text-gray-500">
          {service.shortDescription}
        </p>
      )}

      <p className="mb-6 leading-7 text-gray-600">
        {service.description}
      </p>

      <div className="mb-8 grid gap-4 md:grid-cols-3">

        <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3">
          <FaMoneyBillWave className="text-cyan-600" />
          <span>
            ₹{service.price || "N/A"}
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3">
          <FaClock className="text-cyan-600" />
          <span>
            {service.duration || "Duration Not Available"}
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3">
          <FaMapMarkerAlt className="text-cyan-600" />
          <span>
            {service.location || "Location Not Available"}
          </span>
        </div>

      </div>

      <Link
        to="/booking"
        state={{ service }}
        className="inline-block rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700"
      >
        Book Now
      </Link>

    </div>
  );
};

export default ServiceDetails;