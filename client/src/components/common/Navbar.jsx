import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { useSettings } from "../../context/SettingsContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings } = useSettings();

  const websiteName = settings.websiteName || "Alpha Waves Goa";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Packages", path: "/packages" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[72px] sm:px-6 md:h-20 lg:px-8">

        {/* Logo — hard-capped height, never overflows */}
        <Link
          to="/"
          className="flex shrink-0 items-center"
          aria-label={websiteName}
        >
          <img
            src="/logo.png"
            alt={websiteName}
            className="block h-10 w-auto max-h-10 object-contain sm:h-12 sm:max-h-12 md:h-14 md:max-h-14"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative whitespace-nowrap text-sm font-medium transition lg:text-base ${
                  isActive
                    ? "text-teal-600"
                    : "text-slate-700 hover:text-teal-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Book Now button — properly shaped */}
        <div className="hidden shrink-0 md:block">
          <Link
            to="/booking"
            className="inline-flex min-h-10 items-center justify-center whitespace-nowrap rounded-xl bg-teal-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="shrink-0 rounded-lg p-2 text-2xl text-teal-600 transition hover:bg-teal-50 md:hidden"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-slate-100 transition-all duration-300 md:hidden ${
          isOpen ? "max-h-[500px]" : "max-h-0 border-t-0"
        }`}
      >
        <div className="bg-white px-4 py-3">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex min-h-11 items-center rounded-lg px-4 text-base font-medium transition ${
                    isActive
                      ? "bg-teal-50 font-semibold text-teal-600"
                      : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <Link
              to="/booking"
              onClick={() => setIsOpen(false)}
              className="mt-2 inline-flex min-h-12 items-center justify-center rounded-xl bg-teal-600 px-4 text-base font-semibold text-white transition hover:bg-teal-700"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;