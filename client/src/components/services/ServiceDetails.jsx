import {
  FaMapMarkerAlt,
  FaWhatsapp,
  FaPhone,
} from "react-icons/fa";

const ServiceDetails = ({ service }) => {
  if (!service) return null;

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

      {/* Cover Image */}
      <img
        src={
          service.coverImage ||
          service.image ||
          "/placeholder.jpg"
        }
        alt={service.title}
        className="h-[400px] w-full object-cover"
      />

      {/* Gallery Images */}
      {service.images?.length > 0 && (
        <div className="grid grid-cols-2 gap-3 p-4 md:grid-cols-4">
          {service.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Gallery ${index + 1}`}
              className="h-28 w-full rounded-lg object-cover"
            />
          ))}
        </div>
      )}

      <div className="p-6 md:p-8">

        {/* Title */}
        <h1 className="mb-3 text-3xl font-bold">
          {service.title}
        </h1>

        {/* Short Description */}
        {service.shortDescription && (
          <p className="mb-6 text-lg text-gray-600">
            {service.shortDescription}
          </p>
        )}

        {/* Price & Location */}
        <div className="mb-8 grid gap-4 md:grid-cols-2">

          <div className="rounded-xl bg-cyan-50 p-5">
            <p className="text-sm text-gray-500">
              Starting From
            </p>

            <h2 className="mt-1 text-3xl font-bold text-cyan-700">
              {service.startingPrice > 0
                ? `₹${service.startingPrice}`
                : "Contact Us"}
            </h2>
          </div>

          <div className="rounded-xl bg-cyan-50 p-5">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-cyan-600" />

              <span className="font-semibold">
                {service.location || "Goa"}
              </span>
            </div>
          </div>

        </div>

        {/* Description */}
        {service.description && (
          <>
            <h2 className="mb-3 text-2xl font-bold">
              Description
            </h2>

            <div className="mb-8 whitespace-pre-line rounded-xl bg-gray-50 p-6 leading-7 text-gray-700">
              {service.description}
            </div>
          </>
        )}

        {/* Highlights */}
        {service.highlights?.length > 0 && (
          <>
            <h2 className="mb-4 text-2xl font-bold">
              Highlights
            </h2>

            <div className="mb-8 grid gap-3 md:grid-cols-2">
              {service.highlights.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-cyan-100 bg-cyan-50 p-4"
                >
                  ✓ {item}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Features */}
        {service.features?.length > 0 && (
          <>
            <h2 className="mb-4 text-2xl font-bold">
              Features
            </h2>

            <div className="mb-8 grid gap-3 md:grid-cols-2">
              {service.features.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-gray-50 p-4"
                >
                  ✓ {item}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Amenities */}
        {service.amenities?.length > 0 && (
          <>
            <h2 className="mb-4 text-2xl font-bold">
              Amenities
            </h2>

            <div className="mb-8 grid gap-3 md:grid-cols-2">
              {service.amenities.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-gray-50 p-4"
                >
                  ✓ {item}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Contact Buttons */}
        <div className="mt-8 flex flex-col gap-3 md:flex-row">

          {service.whatsappNumber && (
            <a
              href={`https://wa.me/${service.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              <FaWhatsapp />
              WhatsApp Booking
            </a>
          )}

          {service.contactNumber && (
            <a
              href={`tel:${service.contactNumber}`}
              className="flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-700"
            >
              <FaPhone />
              Call Now
            </a>
          )}

        </div>

      </div>
    </div>
  );
};

export default ServiceDetails;