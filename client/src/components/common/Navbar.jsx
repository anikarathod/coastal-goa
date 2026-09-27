import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Packages", path: "/packages" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">

      <div className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="Coastal Goa"
            className="h-10 sm:h-12 md:h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">

          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative text-sm lg:text-base font-medium transition ${
                  isActive
                    ? "text-cyan-600"
                    : "text-gray-700 hover:text-cyan-600"
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
            className="rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-3xl text-cyan-600 md:hidden"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>

      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen
            ? "max-h-[500px] border-t"
            : "max-h-0"
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
                      ? "bg-cyan-50 text-cyan-600 font-semibold"
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
              className="mt-2 rounded-xl bg-cyan-600 py-3 text-center font-semibold text-white"
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