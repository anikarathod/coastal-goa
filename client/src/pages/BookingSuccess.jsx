import { useEffect, useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaWhatsapp,
  FaHome,
  FaClipboardList,
  FaPhone,
  FaCalendarAlt,
  FaUsers,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaDownload,
  FaShareAlt,
  FaClock,
  FaEnvelope,
} from "react-icons/fa";

const BookingSuccess = () => {
  const { state } = useLocation();
  const [showCheck, setShowCheck] = useState(false);

  // Trigger animation after mount
  useEffect(() => {
    const t = setTimeout(() => setShowCheck(true), 100);
    return () => clearTimeout(t);
  }, []);

  if (!state?.booking) {
    return <Navigate to="/" replace />;
  }

  const { booking } = state;

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-IN", {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : "To be confirmed";

  const formatAmount = (amount) =>
    amount ? `₹${Number(amount).toLocaleString("en-IN")}` : "₹0";

  // Build WhatsApp message
  const whatsappMessage = encodeURIComponent(
    `Hi Coastal Goa! 👋\n\nI just booked a package and wanted to confirm.\n\n` +
      `📋 Booking ID: ${booking.bookingId}\n` +
      `📦 Package: ${booking.packageName}\n` +
      `📅 Travel Date: ${formatDate(booking.travelDate)}\n` +
      `👥 Guests: ${booking.adults || 1} Adult${booking.adults > 1 ? "s" : ""}${
        booking.children ? `, ${booking.children} Child${booking.children > 1 ? "ren" : ""}` : ""
      }\n` +
      `💰 Amount: ${formatAmount(booking.totalAmount)}\n\n` +
      `Could you please confirm my booking? 🙏`
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-gray-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-3xl">

        {/* ============ MAIN CARD ============ */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

          {/* TOP GREEN BANNER */}
          <div className="relative bg-gradient-to-br from-teal-500 to-teal-700 px-6 pb-16 pt-10 text-center text-white sm:pb-20 sm:pt-14">
            <div
              className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-700 ${
                showCheck ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
                <FaCheckCircle
                  className={`text-3xl text-teal-600 transition-all duration-700 ${
                    showCheck ? "scale-100" : "scale-0"
                  }`}
                  style={{ transitionDelay: "200ms" }}
                />
              </div>
            </div>

            <h1 className="mt-6 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Booking Confirmed!
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm text-teal-50 sm:text-base">
              Thank you, {booking.name?.split(" ")[0] || "Guest"}! Your Goa
              adventure is booked. 🎉
            </p>
          </div>

          {/* BOOKING ID BADGE (overlapping banner) */}
          <div className="relative -mt-8 flex justify-center px-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white px-5 py-2.5 shadow-md">
              <FaClipboardList className="text-teal-600" />
              <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
                Booking ID
              </span>
              <span className="font-mono text-sm font-bold text-gray-900 sm:text-base">
                {booking.bookingId}
              </span>
            </div>
          </div>

          {/* ============ BODY ============ */}
          <div className="px-6 pb-8 pt-8 sm:px-10 sm:pb-10">

            {/* WHAT'S NEXT */}
            <div className="mb-8 rounded-2xl border border-blue-100 bg-blue-50/60 p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <FaClock />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    What happens next?
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    Our team will contact you within{" "}
                    <strong className="text-gray-900">24 hours</strong> to
                    confirm your booking and share payment details.
                  </p>
                </div>
              </div>
            </div>

            {/* TRIP DETAILS */}
            <div>
              <h2 className="mb-4 text-lg font-bold text-gray-900">
                Trip Details
              </h2>

              <div className="space-y-3 rounded-2xl border border-gray-100 bg-gray-50/60 p-4 sm:p-5">
                <InfoRow
                  icon={<FaClipboardList />}
                  label="Package"
                  value={booking.packageName || "—"}
                />
                <InfoRow
                  icon={<FaCalendarAlt />}
                  label="Travel Date"
                  value={formatDate(booking.travelDate)}
                />
                {booking.location && (
                  <InfoRow
                    icon={<FaMapMarkerAlt />}
                    label="Location"
                    value={booking.location}
                  />
                )}
                <InfoRow
                  icon={<FaUsers />}
                  label="Guests"
                  value={`${booking.adults || 1} Adult${
                    booking.adults > 1 ? "s" : ""
                  }${
                    booking.children
                      ? `, ${booking.children} Child${
                          booking.children > 1 ? "ren" : ""
                        }`
                      : ""
                  }`}
                />
              </div>
            </div>

            {/* TOTAL AMOUNT */}
            <div className="mt-6 rounded-2xl border-2 border-dashed border-teal-200 bg-teal-50/50 p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-teal-700">
                    Total Amount
                  </p>
                  <p className="mt-1 text-3xl font-extrabold text-teal-800 sm:text-4xl">
                    {formatAmount(booking.totalAmount)}
                  </p>
                </div>
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal-600 text-2xl text-white shadow-md">
                  <FaRupeeSign />
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">

              {/* WHATSAPP PRIMARY */}
              <a
                href={`https://wa.me/919175884119?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-green-600 hover:shadow-md sm:col-span-2 sm:text-base"
              >
                <FaWhatsapp className="text-lg" />
                Send Details on WhatsApp
              </a>

              {/* MY BOOKINGS */}
              <Link
                to="/my-bookings"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"
              >
                <FaClipboardList />
                My Bookings
              </Link>

              {/* BACK HOME */}
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-teal-300 hover:text-teal-600"
              >
                <FaHome />
                Back to Home
              </Link>
            </div>

            {/* PRINT / SAVE */}
            <button
              type="button"
              onClick={() => window.print()}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              <FaDownload />
              Save Receipt (PDF)
            </button>
          </div>
        </div>

        {/* ============ HELP FOOTER ============ */}
        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm sm:p-6">
          <p className="text-sm font-semibold text-gray-900">
            Need help right away?
          </p>
          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            Our team is available 9 AM – 9 PM daily
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <a
              href="tel:+919175884119"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
            >
              <FaPhone className="text-teal-600" />
              Call Us
            </a>
            <a
              href="https://wa.me/919175884119"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-100"
            >
              <FaWhatsapp />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Small print */}
        <p className="mt-4 text-center text-xs text-gray-400">
          A copy of this booking is saved to your account.
        </p>
      </div>
    </div>
  );
};

/* ============= INFO ROW ============= */
const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-sm text-teal-600 shadow-sm">
        {icon}
      </div>
      <span className="text-sm text-gray-500">{label}</span>
    </div>
    <span className="text-right text-sm font-semibold text-gray-900">
      {value}
    </span>
  </div>
);

export default BookingSuccess;