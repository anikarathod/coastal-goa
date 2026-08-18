const ServiceSelector = ({
  services = [],
  selectedServices = [],
  toggleService,
}) => {
  return (
    <div className="space-y-3">

      {services.map((service) => {

        const selected =
          selectedServices.some(
            (item) => item._id === service._id
          );

        return (
          <div
            key={service._id}
            className={`flex items-center justify-between rounded-xl border p-3 transition

            ${
              selected
                ? "border-green-500 bg-green-50"
                : "border-gray-200 bg-white"
            }`}
          >

            {/* Left Side */}

            <div className="flex items-center gap-4">

              <img
                src={
                  service.coverImage ||
                  service.image ||
                  "https://placehold.co/100x100?text=Service"
                }
                alt={service.title}
                className="h-16 w-16 rounded-lg object-cover"
              />

              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {service.title}
                </h3>
              </div>

            </div>

            {/* Select Button */}

            <button
              type="button"
              onClick={() =>
                toggleService(service)
              }
              className={`rounded-full px-5 py-2 text-sm font-semibold transition

              ${
                selected
                  ? "bg-green-600 text-white"
                  : "border border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white"
              }`}
            >
              {selected
                ? "Selected"
                : "Select"}
            </button>

          </div>
        );
      })}

    </div>
  );
};

export default ServiceSelector;const ServiceSelector = ({
  services = [],
  selectedServices = [],
  toggleService,
}) => {
  return (
    <div className="space-y-4">

      {services.map((service) => {

        const selected =
          selectedServices.some(
            (item) => item._id === service._id
          );

        return (
          <div
            key={service._id}
            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border p-4 transition

            ${
              selected
                ? "border-green-500 bg-green-50"
                : "border-gray-200 bg-white"
            }`}
          >

            {/* Left Side */}

            <div className="flex items-center gap-3 md:gap-4">

              <img
                src={
                  service.coverImage ||
                  service.image ||
                  "https://placehold.co/100x100?text=Service"
                }
                alt={service.title}
                className="h-14 w-14 md:h-16 md:w-16 rounded-lg object-cover flex-shrink-0"
              />

              <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-800">
                  {service.title}
                </h3>

                {service.price && (
                  <p className="text-sm text-cyan-600 font-medium">
                    ₹{service.price}
                  </p>
                )}
              </div>

            </div>

            {/* Select Button */}

            <button
              type="button"
              onClick={() =>
                toggleService(service)
              }
              className={`w-full sm:w-auto rounded-full px-4 md:px-5 py-2 text-sm font-semibold transition

              ${
                selected
                  ? "bg-green-600 text-white"
                  : "border border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white"
              }`}
            >
              {selected
                ? "Selected"
                : "Select"}
            </button>

          </div>
        );
      })}

    </div>
  );
};

export default ServiceSelector;