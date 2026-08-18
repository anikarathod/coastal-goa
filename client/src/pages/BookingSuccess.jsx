import { Link, useLocation, Navigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaWhatsapp,
  FaHome,
  FaClipboardList,
} from "react-icons/fa";

const BookingSuccess = () => {
  const { state } = useLocation();

  if (!state?.booking) {
    return <Navigate to="/" replace />;
  }

  const { booking } = state;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-3xl rounded-3xl bg-white shadow-xl p-10">

        {/* Success Icon */}

        <div className="text-center">

          <FaCheckCircle className="mx-auto text-7xl text-green-500" />

          <h1 className="mt-6 text-4xl font-bold text-gray-800">
            Booking Confirmed!
          </h1>

          <p className="mt-3 text-gray-600">
            Thank you for choosing Coastal Goa.
            Your booking request has been received.
          </p>

        </div>

        {/* Booking Details */}

        <div className="mt-10 rounded-xl border border-gray-200 bg-gray-50 p-6">

          <h2 className="mb-5 text-2xl font-semibold">
            Booking Details
          </h2>

          <div className="grid gap-4 md:grid-cols-2">

            <div>
              <p className="text-sm text-gray-500">Booking ID</p>
              <p className="font-semibold">
                {booking.bookingId}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Customer</p>
              <p className="font-semibold">
                {booking.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Package</p>
              <p className="font-semibold">
                {booking.packageName}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Travel Date</p>
              <p className="font-semibold">
                {new Date(booking.travelDate).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Guests</p>
              <p className="font-semibold">
                {booking.adults} Adults
                {booking.children > 0 &&
                  ` • ${booking.children} Children`}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-xl font-bold text-cyan-600">
                ₹{booking.totalAmount}
              </p>
            </div>

          </div>

        </div>

        {/* Buttons */}

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <a
            href={`https://wa.me/91XXXXXXXXXX?text=Hello, my Booking ID is ${booking.bookingId}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-xl bg-green-500 px-6 py-3 font-semibold text-white transition hover:bg-green-600"
          >
            <FaWhatsapp />
            WhatsApp Support
          </a>

          <Link
            to="/"
            className="flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700"
          >
            <FaHome />
            Back Home
          </Link>

          <Link
            to="/my-bookings"
            className="flex items-center gap-2 rounded-xl border border-cyan-600 px-6 py-3 font-semibold text-cyan-600 transition hover:bg-cyan-50"
          >
            <FaClipboardList />
            My Bookings
          </Link>

        </div>

      </div>
    </div>
  );
};

export default BookingSuccess;