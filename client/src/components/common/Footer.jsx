import { Link } from "react-router-dom";
import { useSettings } from "../../context/SettingsContext";

const Footer = () => {
  const { settings } = useSettings();
  const websiteName = settings.websiteName || "Alpha Waves Goa";
  const year = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Packages", path: "/packages" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="relative bg-gray-950 text-gray-400">
      {/* Top accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-500" />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">

          {/* Brand Column */}
          <div className="md:col-span-5">
            <Link to="/" className="inline-block">
              <img
                src="/logo.png"
                alt={websiteName}
                className="h-12 w-auto object-contain"
              />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              Discover Goa the way it's meant to be seen — sunset cruises,
              private tours, and unforgettable memories, curated just for you.
            </p>

            {/* Social pill buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              {settings.facebook && (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-gray-800 px-4 py-2 text-xs font-medium text-gray-300 transition hover:border-teal-500 hover:text-teal-400"
                >
                  Facebook
                </a>
              )}
              {settings.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-gray-800 px-4 py-2 text-xs font-medium text-gray-300 transition hover:border-teal-500 hover:text-teal-400"
                >
                  Instagram
                </a>
              )}
              {settings.youtube && (
                <a
                  href={settings.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-gray-800 px-4 py-2 text-xs font-medium text-gray-300 transition hover:border-teal-500 hover:text-teal-400"
                >
                  YouTube
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white">
              Explore
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="inline-block transition hover:translate-x-1 hover:text-teal-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white">
              Get in Touch
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {settings.phone && (
                <li>
                  <a
                    href={`tel:${settings.phone}`}
                    className="flex items-center gap-3 transition hover:text-teal-400"
                  >
                    <span className="text-teal-500">📞</span>
                    <span>{settings.phone}</span>
                  </a>
                </li>
              )}
              {settings.whatsapp && (
                <li>
                  <a
                    href={`https://wa.me/${settings.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 transition hover:text-teal-400"
                  >
                    <span className="text-teal-500">💬</span>
                    <span>WhatsApp</span>
                  </a>
                </li>
              )}
              {settings.email && (
                <li>
                  <a
                    href={`mailto:${settings.email}`}
                    className="flex items-center gap-3 transition hover:text-teal-400"
                  >
                    <span className="text-teal-500">✉️</span>
                    <span>{settings.email}</span>
                  </a>
                </li>
              )}
              {settings.address && (
                <li className="flex items-start gap-3">
                  <span className="text-teal-500">📍</span>
                  <span>{settings.address}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-6 text-xs sm:flex-row">
          <p>
            © {year} {websiteName}. All rights reserved.
          </p>
          <p className="flex gap-6">
            <Link to="/privacy" className="transition hover:text-teal-400">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition hover:text-teal-400">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;