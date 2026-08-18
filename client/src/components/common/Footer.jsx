import { useEffect, useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../services/api";

const Footer = () => {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get("/settings");
        setSettings(res.data.settings);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSettings();
  }, []);

  const whatsappNumber =
    settings.whatsapp?.replace(/\D/g, "") || "";

  return (
    <footer className="bg-[#14255c] text-white">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

          {/* About */}
          <div>

            <h2 className="mb-4 text-2xl md:text-3xl font-bold">
              Coastal Goa
            </h2>

            <h3 className="mb-3 text-lg font-semibold text-cyan-300">
              Who We Are
            </h3>

            <p className="text-sm md:text-base leading-7 text-gray-300">
              Explore the beauty of Goa with Coastal Goa. From North and
              South Goa sightseeing tours to water sports, cruises,
              taxi services, and customized holiday packages, we provide
              memorable travel experiences at affordable prices.
            </p>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="mb-5 text-lg md:text-xl font-semibold">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  to="/"
                  className="hover:text-cyan-300 transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/packages"
                  className="hover:text-cyan-300 transition"
                >
                  Packages
                </Link>
              </li>

              <li>
                <Link
                  to="/services"
                  className="hover:text-cyan-300 transition"
                >
                  Services
                </Link>
              </li>

              <li>
                <Link
                  to="/gallery"
                  className="hover:text-cyan-300 transition"
                >
                  Gallery
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-cyan-300 transition"
                >
                  Contact
                </Link>
              </li>

            </ul>

          </div>

          {/* Contact */}
          <div>

            <h3 className="mb-5 text-lg md:text-xl font-semibold">
              Contact Us
            </h3>

            <div className="space-y-4">

              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-yellow-400" />
                <span className="text-sm md:text-base">
                  {settings.address || "Goa, India"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <FaPhone className="text-yellow-400" />
                <a
                  href={`tel:${settings.phone}`}
                  className="text-sm md:text-base hover:text-cyan-300"
                >
                  {settings.phone || "+91 9175884119"}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-yellow-400" />
                <a
                  href={`mailto:${settings.email}`}
                  className="text-sm md:text-base hover:text-cyan-300 break-all"
                >
                  {settings.email || "info.coastalgoa@gmail.com"}
                </a>
              </div>

            </div>

            {/* Social Icons */}
            <div className="mt-6 flex gap-4">

              {settings.facebook && (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/facebook.png"
                    alt="Facebook"
                    className="h-10 w-10 md:h-12 md:w-12 transition duration-300 hover:scale-110"
                  />
                </a>
              )}

              {settings.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/instagram.png"
                    alt="Instagram"
                    className="h-10 w-10 md:h-12 md:w-12 transition duration-300 hover:scale-110"
                  />
                </a>
              )}

              {whatsappNumber && (
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/whatsapp.png"
                    alt="WhatsApp"
                    className="h-10 w-10 md:h-12 md:w-12 transition duration-300 hover:scale-110"
                  />
                </a>
              )}

            </div>

          </div>

        </div>

      </div>

      {/* Bottom Footer */}
      <div className="border-t border-blue-400">

        <div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs sm:text-sm text-gray-300">

          © {new Date().getFullYear()} Coastal Goa. All Rights Reserved.

        </div>

      </div>

    </footer>
  );
};

export default Footer;