import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1800&q=80')",
        }}
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/80" />

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-[72vh] items-center sm:min-h-[78vh] lg:min-h-screen">

        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-12">

          <div className="mx-auto max-w-4xl text-center lg:mx-0 lg:text-left">

            {/* Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md sm:mb-5 sm:px-5">

              <FaMapMarkerAlt className="text-cyan-400" />

              <span className="text-xs font-medium text-white sm:text-sm">
                Explore the Beauty of Goa
              </span>

            </div>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">

              Your Perfect

              <span className="block text-cyan-400">
                Goa Getaway
              </span>

            </h1>

            {/* Description */}
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-200 sm:mt-5 sm:text-base sm:leading-7 md:max-w-2xl md:text-lg lg:mx-0 lg:text-xl">

              Sightseeing tours, water sports, cruises, hotels,
              airport transfers, yacht rentals and unforgettable
              holiday experiences.

            </p>

            {/* Buttons */}
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap lg:flex-nowrap">

              <Link
                to="/packages"
                className="w-full rounded-xl bg-cyan-500 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-lg transition duration-300 hover:bg-cyan-600 sm:w-auto sm:text-base"
              >
                Explore Packages →
              </Link>

              <Link
                to="/contact"
                className="w-full rounded-xl border-2 border-white bg-white/10 px-6 py-3.5 text-center text-sm font-semibold text-white backdrop-blur-sm transition duration-300 hover:bg-white hover:text-gray-900 sm:w-auto sm:text-base"
              >
                Contact Us
              </Link>

              <a
                href="https://wa.me/919175884119"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition duration-300 hover:bg-green-600 sm:w-auto sm:text-base"
              >
                <FaWhatsapp className="text-lg" />
                WhatsApp
              </a>

            </div>

            {/* Quick Tags */}
            <div className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">

              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs text-white backdrop-blur-md sm:px-4 sm:text-sm">
                🏖 Goa Tours
              </span>

              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs text-white backdrop-blur-md sm:px-4 sm:text-sm">
                🚤 Water Sports
              </span>

              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs text-white backdrop-blur-md sm:px-4 sm:text-sm">
                🛥 Cruises
              </span>

              <span className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs text-white backdrop-blur-md sm:px-4 sm:text-sm">
                🚕 Transfers
              </span>

            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/20 pt-6 sm:mt-10 sm:gap-6 sm:pt-8">

              <div className="text-center lg:text-left">

                <h3 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
                  500+
                </h3>

                <p className="mt-1 text-[11px] text-gray-300 sm:text-sm">
                  Happy Travelers
                </p>

              </div>

              <div className="text-center lg:text-left">

                <h3 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
                  50+
                </h3>

                <p className="mt-1 text-[11px] text-gray-300 sm:text-sm">
                  Tour Packages
                </p>

              </div>

              <div className="text-center lg:text-left">

                <h3 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
                  24/7
                </h3>

                <p className="mt-1 text-[11px] text-gray-300 sm:text-sm">
                  Support
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 xl:block">

        <div className="animate-bounce">

          <div className="flex h-12 w-7 justify-center rounded-full border-2 border-white">

            <div className="mt-2 h-3 w-1 rounded-full bg-white" />

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;