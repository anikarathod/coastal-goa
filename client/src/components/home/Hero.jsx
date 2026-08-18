import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative h-screen overflow-hidden">

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
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">

          <div className="max-w-4xl text-white">

            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2 backdrop-blur-md">
              <FaMapMarkerAlt className="text-cyan-400" />
              <span className="text-sm md:text-base">
                Explore the Beauty of Goa
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-extrabold leading-tight md:text-7xl lg:text-8xl">
              Experience
              <br />
              <span className="text-cyan-400">
                Coastal Goa
              </span>
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-200 md:text-xl">
              Book unforgettable Goa experiences including sightseeing,
              water sports, dinner cruises, airport transfers,
              hotels and luxury yacht rentals—all in one place.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-5">

              <Link
                to="/packages"
                className="rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-white shadow-lg transition duration-300 hover:scale-105 hover:bg-cyan-600"
              >
                Explore Packages
              </Link>

              <Link
                to="/contact"
                className="rounded-xl border-2 border-white px-8 py-4 font-semibold text-white transition duration-300 hover:bg-white hover:text-black"
              >
                Contact Us
              </Link>

              <a
                href="https://wa.me/919175884119"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-green-500 px-8 py-4 font-semibold text-white shadow-lg transition duration-300 hover:scale-105 hover:bg-green-600"
              >
                <FaWhatsapp />
                WhatsApp
              </a>

            </div>

          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex h-12 w-7 justify-center rounded-full border-2 border-white">
          <div className="mt-2 h-3 w-1 rounded-full bg-white"></div>
        </div>
      </div>

    </section>
  );
};

export default Hero;