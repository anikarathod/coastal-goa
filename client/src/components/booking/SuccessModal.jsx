import { FaCheckCircle, FaWhatsapp, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const SuccessModal = ({
  open,
  onClose,
  bookingId = "",
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

      <div className="relative w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl animate-[fadeIn_.3s_ease]">

        {/* Success Icon */}

        <div className="flex justify-center">

          <div className="rounded-full bg-green-100 p-5">

            <FaCheckCircle className="text-7xl text-green-600" />

          </div>

        </div>

        {/* Heading */}

        <h2 className="mt-6 text-center text-4xl font-bold text-gray-800">
          Booking Successful!
        </h2>

        <p className="mt-4 text-center leading-7 text-gray-600">
          Thank you for choosing
          <span className="font-semibold text-cyan-600">
            {" "}Coastal Goa{" "}
          </span>

          🎉

          <br />

          Your booking request has been received successfully.

          <br /><br />

          Our travel team will contact you shortly via
          WhatsApp, phone, or email to confirm your booking.
        </p>

        {/* Booking ID */}

        {bookingId && (

          <div className="mt-8 rounded-xl bg-cyan-50 p-5 text-center">

            <p className="text-gray-500">
              Booking Reference
            </p>

            <h3 className="mt-2 text-2xl font-bold text-cyan-700">
              {bookingId}
            </h3>

          </div>

        )}

        {/* Information */}

        <div className="mt-8 rounded-xl bg-gray-100 p-5">

          <h4 className="font-semibold">
            What's Next?
          </h4>

          <ul className="mt-4 space-y-3 text-sm text-gray-600">

            <li>
              ✅ Booking request received.
            </li>

            <li>
              📞 Our executive will call you shortly.
            </li>

            <li>
              💬 Confirmation will also be sent on WhatsApp.
            </li>

            <li>
              📧 A booking confirmation email will be sent.
            </li>

            <li>
              🌴 Get ready for an amazing Goa experience!
            </li>

          </ul>

        </div>

        {/* Buttons */}

        <div className="mt-8 flex flex-col gap-4">

          <a
            href="https://wa.me/919175884119"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-xl bg-green-600 px-6 py-4 font-semibold text-white transition hover:bg-green-700"
          >
            <FaWhatsapp />

            Chat on WhatsApp
          </a>

          <Link
            to="/"
            className="flex items-center justify-center gap-3 rounded-xl bg-cyan-600 px-6 py-4 font-semibold text-white transition hover:bg-cyan-700"
          >
            <FaHome />

            Back to Home
          </Link>

          <button
            onClick={onClose}
            className="rounded-xl border border-gray-300 px-6 py-4 font-semibold transition hover:bg-gray-100"
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
};

export default SuccessModal;