import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative min-h-[75vh] md:min-h-[85vh] lg:min-h-screen overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1800&q=80')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[75vh] md:min-h-[85vh] lg:min-h-screen items-center">

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12">

          <div className="max-w-xl lg:max-w-4xl text-white">

            {/* Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-md">

              <FaMapMarkerAlt className="text-cyan-400" />

              <span className="text-xs sm:text-sm">
                Explore the Beauty of Goa
              </span>

            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold leading-tight">

              Experience

              <br />

              <span className="text-cyan-400">
                Coastal Goa
              </span>

            </h1>

            {/* Description */}
            <p className="mt-4 max-w-lg text-sm sm:text-lg md:text-xl leading-6 md:leading-8 text-gray-200">

              Discover Goa with sightseeing tours,
              water sports, cruises, hotels and
              airport transfers.

            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">

              <Link
                to="/packages"
                className="w-full sm:w-auto text-center rounded-xl bg-cyan-500 px-5 py-3 md:px-8 md:py-4 font-semibold text-white shadow-lg transition hover:bg-cyan-600"
              >
                Explore Packages
              </Link>

              <Link
                to="/contact"
                className="w-full sm:w-auto text-center rounded-xl border-2 border-white px-5 py-3 md:px-8 md:py-4 font-semibold text-white transition hover:bg-white hover:text-black"
              >
                Contact Us
              </Link>

              <a
                href="https://wa.me/919175884119"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-green-500 px-5 py-3 md:px-8 md:py-4 font-semibold text-white shadow-lg transition hover:bg-green-600"
              >
                <FaWhatsapp />
                WhatsApp
              </a>

            </div>

          </div>

        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">

        <div className="flex h-12 w-7 justify-center rounded-full border-2 border-white">

          <div className="mt-2 h-3 w-1 rounded-full bg-white" />

        </div>

      </div>

    </section>
  );
};

export default Hero;