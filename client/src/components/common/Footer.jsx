import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
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
    <footer className="relative bg-slate-900 text-slate-300">
      {/* Subtle gradient from slate-800 to slate-900 for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-800/40 via-slate-900 to-slate-900" />

      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/60 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">

          {/* Brand Column */}
          <div className="md:col-span-5">
            <Link to="/" className="inline-block">
              <img
                src="/logo.png"
                alt={websiteName}
                className="h-14 w-auto object-contain"
              />
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-slate-400">
              Discover Goa the way it's meant to be seen — sunset cruises,
              private tours, and unforgettable memories, curated just for you.
            </p>

            {/* Social icons */}
            <div className="mt-7 flex gap-3">
              {settings.facebook && (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-300 ring-1 ring-slate-700/60 transition hover:-translate-y-0.5 hover:bg-teal-600 hover:text-white hover:ring-teal-500"
                >
                  <FaFacebookF className="text-sm" />
                </a>
              )}
              {settings.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-300 ring-1 ring-slate-700/60 transition hover:-translate-y-0.5 hover:bg-teal-600 hover:text-white hover:ring-teal-500"
                >
                  <FaInstagram className="text-sm" />
                </a>
              )}
              {settings.youtube && (
                <a
                  href={settings.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-300 ring-1 ring-slate-700/60 transition hover:-translate-y-0.5 hover:bg-teal-600 hover:text-white hover:ring-teal-500"
                >
                  <FaYoutube className="text-sm" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
              Explore
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="inline-block text-slate-400 transition hover:translate-x-1 hover:text-teal-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
              Get in Touch
            </h3>
            <ul className="mt-5 space-y-3.5 text-sm">
              {settings.phone && (
                <li>
                  <a
                    href={`tel:${settings.phone}`}
                    className="flex items-center gap-3 text-slate-400 transition hover:text-teal-400"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-sm ring-1 ring-slate-700/60">
                      📞
                    </span>
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
                    className="flex items-center gap-3 text-slate-400 transition hover:text-teal-400"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-sm ring-1 ring-slate-700/60">
                      💬
                    </span>
                    <span>WhatsApp</span>
                  </a>
                </li>
              )}
              {settings.email && (
                <li>
                  <a
                    href={`mailto:${settings.email}`}
                    className="flex items-center gap-3 text-slate-400 transition hover:text-teal-400"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-sm ring-1 ring-slate-700/60">
                      ✉️
                    </span>
                    <span className="truncate">{settings.email}</span>
                  </a>
                </li>
              )}
              {settings.address && (
                <li className="flex items-start gap-3 text-slate-400">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-sm ring-1 ring-slate-700/60">
                    📍
                  </span>
                  <span className="pt-1">{settings.address}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative mt-16 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-xs text-slate-500 sm:flex-row sm:pr-40">
          <p>
            © {year} {websiteName}. All rights reserved.
          </p>
          <p className="flex gap-6">
            <Link
              to="/privacy"
              className="transition hover:text-teal-400"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="transition hover:text-teal-400"
            >
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;