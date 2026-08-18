import {
  FaUser,
  FaCalendarAlt,
  FaSuitcase,
  FaConciergeBell,
  FaWhatsapp,
} from "react-icons/fa";

const BookingSummary = ({
  bookingData,
  onBook,
  loading,
}) => {
  const {
    customer,
    travel,
    selectedPackages = [],
    selectedServices = [],
  } = bookingData;

  return (
    <div className="rounded-2xl border bg-white p-4 md:p-6 shadow-lg lg:sticky lg:top-24">

      {/* Header */}
      <h2 className="mb-4 md:mb-6 text-xl md:text-2xl font-bold text-gray-800">
        Booking Summary
      </h2>

      {/* Customer Details */}
      <div className="mb-6">
        <div className="mb-3 flex items-center gap-2">
          <FaUser className="text-cyan-600" />
          <h3 className="font-semibold text-gray-800">
            Customer Details
          </h3>
        </div>

        <div className="space-y-2 text-sm text-gray-600 break-words">
          <p><span className="font-medium">Name:</span> {customer.fullName || "-"}</p>
          <p><span className="font-medium">Phone:</span> {customer.phone || "-"}</p>
          <p><span className="font-medium">Email:</span> {customer.email || "-"}</p>
        </div>
      </div>

      <hr />

      {/* Travel Details */}
      <div className="my-6">
        <div className="mb-3 flex items-center gap-2">
          <FaCalendarAlt className="text-cyan-600" />
          <h3 className="font-semibold text-gray-800">
            Travel Details
          </h3>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <p><span className="font-medium">Date:</span> {travel.travelDate || "-"}</p>
          <p><span className="font-medium">Adults:</span> {travel.adults}</p>
          <p><span className="font-medium">Children:</span> {travel.children}</p>
          <p>
            <span className="font-medium">Total Guests:</span>{" "}
            {Number(travel.adults) + Number(travel.children)}
          </p>
        </div>
      </div>

      <hr />

      {/* Packages */}
      <div className="my-6">
        <div className="mb-3 flex items-center gap-2">
          <FaSuitcase className="text-cyan-600" />
          <h3 className="font-semibold text-gray-800">
            Selected Packages
          </h3>
        </div>

        {selectedPackages.length > 0 ? (
          <div className="space-y-2">
            {selectedPackages.map((pkg) => (
              <div
                key={pkg._id}
                className="rounded-lg bg-cyan-50 px-3 py-2 text-sm break-words"
              >
                {pkg.title}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No package selected
          </p>
        )}
      </div>

      <hr />

      {/* Services */}
      <div className="my-6">
        <div className="mb-3 flex items-center gap-2">
          <FaConciergeBell className="text-cyan-600" />
          <h3 className="font-semibold text-gray-800">
            Selected Services
          </h3>
        </div>

        {selectedServices.length > 0 ? (
          <div className="space-y-2">
            {selectedServices.map((service) => (
              <div
                key={service._id}
                className="rounded-lg bg-gray-100 px-3 py-2 text-sm break-words"
              >
                {service.title}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No service selected
          </p>
        )}
      </div>

      <hr />

      {/* Special Requests */}
      <div className="my-6">
        <h3 className="mb-2 font-semibold text-gray-800">
          Special Requests
        </h3>

        <div className="rounded-lg bg-gray-50 p-3 text-sm text-gray-600 break-words">
          {travel.specialRequests || "None"}
        </div>
      </div>

      {/* Book Button */}
      <button
        onClick={onBook}
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3 md:py-4 text-base md:text-lg font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <FaWhatsapp />

        {loading
          ? "Opening WhatsApp..."
          : "Book Now"}
      </button>

    </div>
  );
};

export default BookingSummary;