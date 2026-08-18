import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative min-h-[60vh] md:min-h-[80vh] lg:min-h-screen overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1800&q=80')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-[60vh] md:min-h-[80vh] lg:min-h-screen items-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12">

          <div className="max-w-4xl text-white">

            {/* Badge */}
            <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-md">
              <FaMapMarkerAlt className="text-cyan-400" />
              <span className="text-xs sm:text-sm md:text-base">
                Explore the Beauty of Goa
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold leading-tight">
              Experience
              <br />
              <span className="text-cyan-400">
                Coastal Goa
              </span>
            </h1>

            {/* Description */}
            <p className="mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg md:text-xl leading-7 md:leading-8 text-gray-200">
              Book unforgettable Goa experiences including sightseeing,
              water sports, dinner cruises, airport transfers,
              hotels and luxury yacht rentals—all in one place.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">

              <Link
                to="/packages"
                className="w-full sm:w-auto text-center rounded-xl bg-cyan-500 px-6 py-3 md:px-8 md:py-4 font-semibold text-white shadow-lg transition duration-300 hover:bg-cyan-600"
              >
                Explore Packages
              </Link>

              <Link
                to="/contact"
                className="w-full sm:w-auto text-center rounded-xl border-2 border-white px-6 py-3 md:px-8 md:py-4 font-semibold text-white transition duration-300 hover:bg-white hover:text-black"
              >
                Contact Us
              </Link>

              <a
                href="https://wa.me/919175884119"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3 md:px-8 md:py-4 font-semibold text-white shadow-lg transition duration-300 hover:bg-green-600"
              >
                <FaWhatsapp />
                WhatsApp
              </a>

            </div>

          </div>

        </div>
      </div>

      {/* Scroll Indicator - Hidden on Mobile */}
      <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex h-12 w-7 justify-center rounded-full border-2 border-white">
          <div className="mt-2 h-3 w-1 rounded-full bg-white"></div>
        </div>
      </div>

    </section>
  );
};

export default Hero;