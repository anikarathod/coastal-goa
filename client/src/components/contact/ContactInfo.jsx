import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const ContactInfo = () => {
  const contact = {
    company: "Coastal Goa Tours",
    address:
      "Near candolim Beach, Bardez, Goa - 403516",
    phone: "+91 91758 84119",
    whatsapp: "+91 91758 84119",
    email: "info.coastalgoa@gmail.com",
    hours: "Mon - Sun : 8:00 AM - 9:00 PM",
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-700 p-8 text-white shadow-xl">

      <h2 className="mb-2 text-3xl font-bold">
        Get In Touch
      </h2>

      <p className="mb-8 text-cyan-100">
        Have questions about our Goa tour packages?
        We're here to help you plan your perfect trip.
      </p>

      <div className="space-y-6">

        {/* Address */}

        <div className="flex items-start gap-4">
          <div className="rounded-full bg-white/20 p-3">
            <FaMapMarkerAlt className="text-xl" />
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              Address
            </h3>

            <p className="text-cyan-100">
              {contact.address}
            </p>
          </div>
        </div>

        {/* Phone */}

        <div className="flex items-start gap-4">
          <div className="rounded-full bg-white/20 p-3">
            <FaPhoneAlt className="text-xl" />
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              Phone
            </h3>

            <a
              href={`tel:${contact.phone}`}
              className="text-cyan-100 hover:text-white"
            >
              {contact.phone}
            </a>
          </div>
        </div>

        {/* Email */}

        <div className="flex items-start gap-4">
          <div className="rounded-full bg-white/20 p-3">
            <FaEnvelope className="text-xl" />
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              Email
            </h3>

            <a
              href={`mailto:${contact.email}`}
              className="text-cyan-100 hover:text-white"
            >
              {contact.email}
            </a>
          </div>
        </div>

        {/* Business Hours */}

        <div className="flex items-start gap-4">
          <div className="rounded-full bg-white/20 p-3">
            <FaClock className="text-xl" />
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              Working Hours
            </h3>

            <p className="text-cyan-100">
              {contact.hours}
            </p>
          </div>
        </div>

      </div>

      {/* WhatsApp Button */}

      <a
        href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-green-500 px-6 py-4 font-semibold text-white transition hover:bg-green-600"
      >
        <FaWhatsapp className="text-2xl" />
        Chat on WhatsApp
      </a>

      {/* Social Media */}

      <div className="mt-8">

        <h3 className="mb-4 text-lg font-semibold">
          Follow Us
        </h3>

        <div className="flex gap-4">

          <a
            href="#"
            className="rounded-full bg-white/20 p-3 transition hover:bg-white hover:text-cyan-700"
          >
            <FaFacebookF />
          </a>

          <a
            href="#"
            className="rounded-full bg-white/20 p-3 transition hover:bg-white hover:text-cyan-700"
          >
            <FaInstagram />
          </a>

          <a
            href="#"
            className="rounded-full bg-white/20 p-3 transition hover:bg-white hover:text-cyan-700"
          >
            <FaYoutube />
          </a>

        </div>

      </div>

    </div>
  );
};

export default ContactInfo;