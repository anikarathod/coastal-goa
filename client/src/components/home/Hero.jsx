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
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[60vh] sm:min-h-[75vh] lg:min-h-screen items-center">

        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">

          <div className="max-w-4xl text-center lg:text-left">

            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-md">

              <FaMapMarkerAlt className="text-cyan-400" />

              <span className="text-sm font-medium text-white">
                Explore the Beauty of Goa
              </span>

            </div>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl md:text-6xl lg:text-7xl">

              Your Perfect

              <span className="block text-cyan-400">
                Goa Getaway
              </span>

            </h1>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-md text-base leading-7 text-gray-200 sm:max-w-2xl sm:text-lg md:text-xl lg:mx-0">

              Sightseeing tours, water sports,
              cruises, hotels, airport transfers,
              yacht rentals and unforgettable
              holiday experiences.

            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <Link
                to="/packages"
                className="w-full rounded-xl bg-cyan-500 px-6 py-4 text-center text-base font-semibold text-white transition hover:bg-cyan-600 sm:w-auto"
              >
                Explore Packages →
              </Link>

              <Link
                to="/contact"
                className="w-full rounded-xl border-2 border-white px-6 py-4 text-center text-base font-semibold text-white transition hover:bg-white hover:text-black sm:w-auto"
              >
                Contact Us
              </Link>

              <a
                href="https://wa.me/919175884119"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-4 text-base font-semibold text-white transition hover:bg-green-600 sm:w-auto"
              >
                <FaWhatsapp />
                WhatsApp
              </a>

            </div>

            {/* Happy Travelers */}
            <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">

              <div className="flex -space-x-3">

                <img
                  src="https://i.pravatar.cc/50?img=1"
                  alt=""
                  className="h-10 w-10 rounded-full border-2 border-white"
                />

                <img
                  src="https://i.pravatar.cc/50?img=2"
                  alt=""
                  className="h-10 w-10 rounded-full border-2 border-white"
                />

                <img
                  src="https://i.pravatar.cc/50?img=3"
                  alt=""
                  className="h-10 w-10 rounded-full border-2 border-white"
                />

              </div>

              <div>
                <h4 className="font-bold text-white">
                  500+
                </h4>

                <p className="text-sm text-gray-300">
                  Happy Travelers
                </p>
              </div>

            </div>

            {/* Stats - Desktop Only */}
            <div className="hidden md:grid mt-10 grid-cols-3 gap-6 border-t border-white/20 pt-8">

              <div>
                <h3 className="text-3xl font-bold text-white">
                  500+
                </h3>

                <p className="text-gray-300">
                  Happy Travelers
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white">
                  50+
                </h3>

                <p className="text-gray-300">
                  Tour Packages
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white">
                  24/7
                </h3>

                <p className="text-gray-300">
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