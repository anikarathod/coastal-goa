import {
  FaMapMarkerAlt,
  FaDirections,
} from "react-icons/fa";

const PackageMap = ({
  location,
  latitude,
  longitude,
}) => {
  if (!latitude || !longitude) {
    return (
      <section className="mt-12">
        <div className="rounded-2xl bg-gray-100 p-10 text-center">
          <h2 className="text-3xl font-bold">
            Location
          </h2>

          <p className="mt-4 text-gray-600">
            {location || "Location not available"}
          </p>
        </div>
      </section>
    );
  }

  const googleMapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

  const directionUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  return (
    <section className="mt-12">

      <div className="mb-8">
        <h2 className="text-3xl font-bold">
          Tour Location
        </h2>

        <p className="mt-2 text-gray-600">
          Find the pickup point or destination before your trip.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">

        {/* MAP */}
        <div className="overflow-hidden rounded-2xl shadow-lg lg:col-span-2">

          <iframe
            title="Package Map"
            src={googleMapUrl}
            width="100%"
            height="450"
            loading="lazy"
            allowFullScreen
            className="border-0"
          />

        </div>

        {/* INFO */}
        <div className="rounded-2xl border bg-white p-6 shadow-lg">

          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-2xl text-cyan-600" />

            <h3 className="text-2xl font-bold">
              Meeting Point
            </h3>
          </div>

          <div className="mt-6 space-y-5">

            <div>
              <h4 className="font-semibold">
                Location
              </h4>

              <p className="mt-2 text-gray-600">
                {location}
              </p>
            </div>

            <a
              href={directionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-6 py-4 font-semibold text-white hover:bg-cyan-700"
            >
              <FaDirections />
              Get Directions
            </a>

          </div>

        </div>

      </div>

    </section>
  );
};

export default PackageMap;