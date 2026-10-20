import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useSettings } from "../../context/SettingsContext";

const Footer = () => {
  const { settings } = useSettings();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Packages", path: "/packages" },
    { name: "Services", path: "/services" },
    { name: "Places", path: "/places" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const phone = settings.phone || "7507057684";
  const address = "Candolim, Goa";
  const facebook = settings.facebook || "#";
  const instagram = settings.instagram || "#";
  const youtube = settings.youtube || "#";

  return (
    <footer className="relative bg-[#030719] text-[#C3CEDF]">
      {/* Subtle teal accent line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#00A6A6]/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8 lg:gap-12">
          
          {/* Column 1 — Brand */}
          <div className="flex flex-col items-center text-center md:col-span-5 md:items-start md:text-left">
            <Link to="/" aria-label="Alpha Waves Goa Home">
              <img
                src="/logo.png"
                alt="Alpha Waves Goa Tours & Travels"
                className="h-14 w-auto object-contain md:h-20"
              />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#C3CEDF]">
              Discover Goa the way it's meant to be seen — sunset cruises,
              private tours, and unforgettable memories, curated just for you.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex justify-center gap-4 md:justify-start">
              {facebook !== "#" && (
                <a
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent ring-1 ring-white/20 text-white transition-all duration-300 hover:bg-[#00A6A6] hover:ring-[#00A6A6] hover:-translate-y-1"
                >
                  <FaFacebookF className="text-sm" />
                </a>
              )}
              {instagram !== "#" && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent ring-1 ring-white/20 text-white transition-all duration-300 hover:bg-[#00A6A6] hover:ring-[#00A6A6] hover:-translate-y-1"
                >
                  <FaInstagram className="text-sm" />
                </a>
              )}
              {youtube !== "#" && (
                <a
                  href={youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent ring-1 ring-white/20 text-white transition-all duration-300 hover:bg-[#00A6A6] hover:ring-[#00A6A6] hover:-translate-y-1"
                >
                  <FaYoutube className="text-sm" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2 — Explore */}
          <div className="flex flex-col items-center text-center md:col-span-3 md:items-start md:text-left">
            <h3 className="text-sm font-bold uppercase tracking-widest !text-white">
              Explore
            </h3>
            <ul className="mt-4 space-y-3 text-sm font-medium text-[#C3CEDF] md:mt-6">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="inline-block transition-colors duration-200 hover:text-[#00A6A6]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Get in Touch */}
          <div className="flex flex-col items-center text-center md:col-span-4 md:items-start md:text-left">
            <h3 className="text-sm font-bold uppercase tracking-widest !text-white">
              Get in Touch
            </h3>
            <ul className="mt-4 space-y-4 text-sm font-medium text-[#C3CEDF] md:mt-6">
              
              <li>
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="flex items-center justify-center gap-3 transition-colors duration-200 hover:text-[#00A6A6] md:justify-start"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-[#00A6A6]">
                    <FaPhoneAlt className="text-xs" />
                  </span>
                  <span>{phone}</span>
                </a>
              </li>

              <li>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 transition-colors duration-200 hover:text-[#00A6A6] md:justify-start"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-[#00A6A6]">
                    <FaMapMarkerAlt className="text-xs" />
                  </span>
                  <span>{address}</span>
                </a>
              </li>

            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs sm:mt-16 sm:flex-row sm:pt-8 sm:pr-40">
          <p className="text-center text-[#C3CEDF] sm:text-left">
            © {currentYear} {settings.websiteName || "Alpha Waves Goa"}. All rights reserved.
          </p>
          <div className="flex gap-6 text-[#C3CEDF]">
            <Link 
              to="/privacy" 
              className="transition-colors duration-200 hover:text-[#00A6A6]"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="transition-colors duration-200 hover:text-[#00A6A6]"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;