import { FaMapMarkedAlt, FaDirections } from "react-icons/fa";

const Map = ({
  title,
  address,
  mapEmbedUrl,
  directionsUrl,
}) => {
  // Hide entire section if map isn't configured
  if (!mapEmbedUrl) return null;

  return (
    <section className="overflow-hidden rounded-2xl bg-white shadow-xl">

      {/* Header */}
      <div className="border-b bg-cyan-600 p-6 text-white">
        <div className="flex items-center gap-3">
          <FaMapMarkedAlt className="text-3xl" />

          <div>
            <h2 className="text-2xl font-bold">
              {title || "Visit Our Office"}
            </h2>

            <p className="text-cyan-100">
              {address}
            </p>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="h-[450px] w-full">
        <iframe
          title="Office Location"
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="border-0"
        />
      </div>

      {/* Footer */}
      {directionsUrl && (
        <div className="flex flex-col items-center justify-between gap-4 bg-gray-50 p-6 md:flex-row">
          <div>
            <h3 className="font-semibold text-gray-800">
              Planning to visit us?
            </h3>

            <p className="text-gray-600">
              Follow the directions to reach our office.
            </p>
          </div>

          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700"
          >
            <FaDirections />
            Get Directions
          </a>
        </div>
      )}
    </section>
  );
};

export default Map;