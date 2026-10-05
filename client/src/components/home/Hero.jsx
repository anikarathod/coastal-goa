import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

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
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[60vh] items-center sm:min-h-[75vh] lg:min-h-screen">

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

          <div className="max-w-3xl text-center lg:text-left">

            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-md">

              <FaMapMarkerAlt className="text-cyan-400" />

              <span className="text-sm font-medium text-white">
                Explore the Beauty of Goa
              </span>

            </div>

            {/* Heading */}
            <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">

              Your Perfect

              <span className="block text-cyan-400">
                Goa Getaway
              </span>

            </h1>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-200 sm:text-lg lg:mx-0">

              Discover Goa's best sightseeing tours, water sports,
              cruises, airport transfers, hotels, and unforgettable
              holiday experiences.

            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <Link
                to="/packages"
                className="rounded-xl bg-cyan-500 px-8 py-4 text-center font-semibold text-white transition hover:bg-cyan-600"
              >
                Explore Packages
              </Link>

              <a
                href="https://wa.me/919175884119"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-green-500 px-8 py-4 font-semibold text-white transition hover:bg-green-600"
              >
                <FaWhatsapp />
                WhatsApp
              </a>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;