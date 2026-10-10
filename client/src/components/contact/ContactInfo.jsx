import { useEffect, useState } from "react";
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
import api from "../../services/api";

const ContactInfo = () => {
  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState({
    address: "Near Candolim Beach, Bardez, Goa - 403516",
    phone: "+91 91758 84119",
    whatsapp: "+91 91758 84119",
    email: "info.coastalgoa@gmail.com",
    hours: "Mon - Sun : 8:00 AM - 9:00 PM",
    facebook: "",
    instagram: "",
    youtube: "",
  });

  useEffect(() => {
    let active = true;

    const fetchSettings = async () => {
      try {
        const res = await api.get("/settings");
        if (!active || !res.data?.settings) return;

        const s = res.data.settings;

        setContact((prev) => ({
          address: s.address || prev.address,
          phone: s.phone || prev.phone,
          whatsapp: s.whatsapp || s.phone || prev.whatsapp,
          email: s.email || prev.email,
          hours: s.hours || prev.hours,
          facebook: s.facebook || "",
          instagram: s.instagram || "",
          youtube: s.youtube || "",
        }));
      } catch (err) {
        console.error("Failed to load contact info:", err.message);
        // Keep default fallback values
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchSettings();
    return () => {
      active = false;
    };
  }, []);

  const whatsappNumber = (contact.whatsapp || "").replace(/\D/g, "");

  const socials = [
    { href: contact.facebook, icon: <FaFacebookF />, label: "Facebook" },
    { href: contact.instagram, icon: <FaInstagram />, label: "Instagram" },
    { href: contact.youtube, icon: <FaYoutube />, label: "YouTube" },
  ].filter((s) => s.href);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 p-6 text-white shadow-xl sm:p-8">

      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-white/5" />

      {/* HEADER */}
      <div className="relative">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Get In Touch
        </h2>

        <p className="mt-2 text-sm text-teal-50 sm:text-base">
          Have questions about our Goa tours? We're here to help you plan the
          perfect trip.
        </p>
      </div>

      {/* INFO ITEMS */}
      <div className="relative mt-8 space-y-5">

        {/* ADDRESS */}
        <InfoItem
          icon={<FaMapMarkerAlt />}
          label="Address"
          value={contact.address}
        />

        {/* PHONE */}
        <InfoItem
          icon={<FaPhoneAlt />}
          label="Phone"
          value={contact.phone}
          href={`tel:${contact.phone.replace(/\s/g, "")}`}
        />

        {/* EMAIL */}
        <InfoItem
          icon={<FaEnvelope />}
          label="Email"
          value={contact.email}
          href={`mailto:${contact.email}`}
        />

        {/* HOURS */}
        <InfoItem
          icon={<FaClock />}
          label="Working Hours"
          value={contact.hours}
        />
      </div>

      {/* WHATSAPP CTA */}
      {whatsappNumber && (
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-green-500 px-6 py-4 font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-green-600 hover:shadow-lg"
        >
          <FaWhatsapp className="text-2xl" />
          Chat on WhatsApp
        </a>
      )}

      {/* SOCIAL MEDIA */}
      {socials.length > 0 && (
        <div className="relative mt-8 border-t border-white/15 pt-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-teal-100">
            Follow Us
          </h3>

          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-lg transition hover:bg-white hover:text-teal-700"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ============= INFO ITEM ============= */
const InfoItem = ({ icon, label, value, href }) => (
  <div className="flex items-start gap-4">
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-lg backdrop-blur-sm">
      {icon}
    </div>

    <div className="min-w-0 flex-1">
      <p className="text-xs font-semibold uppercase tracking-wider text-teal-100">
        {label}
      </p>

      {href ? (
        <a
          href={href}
          className="mt-0.5 block break-words text-sm font-medium text-white transition hover:text-teal-100 sm:text-base"
        >
          {value}
        </a>
      ) : (
        <p className="mt-0.5 break-words text-sm font-medium text-white sm:text-base">
          {value}
        </p>
      )}
    </div>
  </div>
);

export default ContactInfo;