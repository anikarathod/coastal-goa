import { Link } from "react-router-dom";
import { useSettings } from "../../context/SettingsContext";

const Footer = () => {
  const { settings } = useSettings();
  const websiteName = settings.websiteName || "Alpha Waves Goa";
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center">
              <img
                src="/logo.png"
                alt={websiteName}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Discover the best of {websiteName}. Handpicked packages,
              trusted service, and unforgettable memories.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/" className="hover:text-teal-400">Home</Link></li>
              <li><Link to="/packages" className="hover:text-teal-400">Packages</Link></li>
              <li><Link to="/services" className="hover:text-teal-400">Services</Link></li>
              <li><Link to="/gallery" className="hover:text-teal-400">Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-teal-400">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {settings.phone && (
                <li>
                  <a href={`tel:${settings.phone}`} className="hover:text-teal-400">
                    📞 {settings.phone}
                  </a>
                </li>
              )}
              {settings.email && (
                <li>
                  <a href={`mailto:${settings.email}`} className="hover:text-teal-400">
                    ✉️ {settings.email}
                  </a>
                </li>
              )}
              {settings.whatsapp && (
                <li>
                  <a
                    href={`https://wa.me/${settings.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-teal-400"
                  >
                    💬 WhatsApp
                  </a>
                </li>
              )}
              {settings.address && (
                <li className="text-gray-400">📍 {settings.address}</li>
              )}
            </ul>

            {/* Socials */}
            <div className="mt-4 flex gap-4 text-sm">
              {settings.facebook && (
                <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">
                  Facebook
                </a>
              )}
              {settings.instagram && (
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">
                  Instagram
                </a>
              )}
              {settings.youtube && (
                <a href={settings.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">
                  YouTube
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          © {year} {websiteName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;