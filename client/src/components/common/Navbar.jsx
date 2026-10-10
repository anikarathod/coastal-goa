import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { useSettings } from "../../context/SettingsContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings } = useSettings();

  const websiteName = settings.websiteName || "Coastal Goa";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Packages", path: "/packages" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-20 lg:px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/logo.png"
            alt={websiteName}
            className="h-10 w-auto object-contain sm:h-12 md:h-14"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative text-sm font-medium transition lg:text-base ${
                  isActive
                    ? "text-teal-600"
                    : "text-gray-700 hover:text-teal-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Button */}
        <div className="hidden md:block">
          <Link
            to="/booking"
            className="rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="text-3xl text-teal-600 md:hidden"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>

      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          isOpen ? "max-h-[500px] border-t" : "max-h-0"
        }`}
      >
        <div className="bg-white px-5 py-4">
          <div className="flex flex-col gap-4">

            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-base ${
                    isActive
                      ? "bg-teal-50 font-semibold text-teal-600"
                      : "text-gray-700"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <Link
              to="/booking"
              onClick={() => setIsOpen(false)}
              className="mt-2 rounded-xl bg-teal-600 py-3 text-center font-semibold text-white"
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