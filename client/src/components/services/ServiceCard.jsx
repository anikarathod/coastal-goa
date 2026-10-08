import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  if (!service) return null;

  const {
    _id,
    title,
    image,
    price,
  } = service;

  return (
    <Link
      to={`/services/${_id}`}
      className="group overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <div className="h-44 overflow-hidden">
        <img
          src={
            image ||
            "https://placehold.co/600x400?text=Service"
          }
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src =
              "https://placehold.co/600x400?text=Service";
          }}
        />
      </div>

      {/* Content */}
      <div className="p-4 text-center">

        <h3 className="mb-3 text-lg font-semibold text-gray-900 line-clamp-2">
          {title}
        </h3>

        <p className="mb-4 text-2xl font-bold text-cyan-600">
          ₹{price}
        </p>

        <span className="inline-block w-full rounded-xl bg-cyan-600 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700">
          Book Now
        </span>

      </div>
    </Link>
  );
};

export default ServiceCard;