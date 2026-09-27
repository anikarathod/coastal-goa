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

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[70vh] sm:min-h-[80vh] lg:min-h-screen items-center">

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12">

          <div className="max-w-4xl text-center lg:text-left">

            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">

              <FaMapMarkerAlt className="text-cyan-400" />

              <span className="text-xs font-medium text-white sm:text-sm">
                Explore the Beauty of Goa
              </span>

            </div>

            {/* Heading */}
            <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">

              Experience

              <span className="block text-cyan-400">
                Coastal Goa
              </span>

            </h1>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-gray-200 sm:text-lg md:text-xl md:leading-8 lg:mx-0">

              Discover Goa with sightseeing tours,
              water sports, cruises, hotels,
              airport transfers, yacht rentals,
              and unforgettable holiday experiences.

            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-nowrap">

              <Link
                to="/packages"
                className="w-full rounded-xl bg-cyan-500 px-6 py-3 text-center font-semibold text-white transition hover:bg-cyan-600 sm:w-auto"
              >
                Explore Packages
              </Link>

              <Link
                to="/contact"
                className="w-full rounded-xl border-2 border-white px-6 py-3 text-center font-semibold text-white transition hover:bg-white hover:text-black sm:w-auto"
              >
                Contact Us
              </Link>

              <a
                href="https://wa.me/919175884119"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3 font-semibold text-white transition hover:bg-green-600 sm:w-auto"
              >
                <FaWhatsapp />
                WhatsApp
              </a>

            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-2 border-t border-white/20 pt-6 text-center lg:text-left">

              <div>
                <h3 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
                  500+
                </h3>

                <p className="text-xs text-gray-300 sm:text-sm">
                  Happy Travelers
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
                  50+
                </h3>

                <p className="text-xs text-gray-300 sm:text-sm">
                  Tour Packages
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
                  24/7
                </h3>

                <p className="text-xs text-gray-300 sm:text-sm">
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