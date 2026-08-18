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
    <header className="sticky top-0 z-50 bg-white shadow-md">

      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <Link to="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="Coastal Goa"
            className="h-20 w-auto object-contain transition duration-300 hover:scale-105"
          />
        </Link>

        {/* Desktop Menu */}

        <nav className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative text-lg transition-all duration-300 ${
                  isActive
                    ? "font-semibold text-cyan-600 after:absolute after:-bottom-2 after:left-0 after:h-[3px] after:w-full after:rounded-full after:bg-cyan-600"
                    : "text-gray-700 hover:text-cyan-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Book Now */}

        <div className="hidden lg:block">
          <Link
            to="/booking"
            className="rounded-xl bg-cyan-600 px-7 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-cyan-700"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-3xl text-cyan-600 lg:hidden"
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>

      </div>

      {/* Mobile Menu */}

      {isOpen && (
        <div className="border-t bg-white shadow-lg lg:hidden">
          <div className="flex flex-col gap-5 px-6 py-6">

            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-cyan-600"
                    : "text-gray-700 hover:text-cyan-600"
                }
              >
                {link.name}
              </NavLink>
            ))}

            <Link
              to="/booking"
              onClick={() => setIsOpen(false)}
              className="rounded-lg bg-cyan-600 py-3 text-center font-semibold text-white transition hover:bg-cyan-700"
            >
              Book Now
            </Link>

          </div>
        </div>
      )}

    </header>
  );
};

export default Navbar;