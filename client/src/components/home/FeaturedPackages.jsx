import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaWhatsapp,
  FaCheckCircle,
} from "react-icons/fa";

const HERO_IMAGE = "/images/goa-hero.jpg";
const HERO_ALT = "Beautiful Goa coastline with palm trees and sea";

const WHATSAPP_LINK = "https://wa.me/919175884119";

const PERKS = [
  "Affordable Prices",
  "Instant Booking",
  "24/7 Support",
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-slate-900">

      {/* Background Image */}
      <img
        src={HERO_IMAGE}
        alt={HERO_ALT}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20 lg:bg-gradient-to-r lg:from-black/75 lg:via-black/40 lg:to-black/10" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[50vh] items-center sm:min-h-[65vh] lg:min-h-[640px]">

        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8 sm:py-16 lg:px-12">

          <div className="max-w-2xl text-center lg:text-left">

            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/25 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">

              <FaMapMarkerAlt className="text-cyan-300" />

              <span>Explore Goa With Coastal Goa</span>

            </div>

            {/* Heading */}
            <h1 className="text-3xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">

              Goa Tours,

              <span className="block text-cyan-400">
                Cruises & Water Sports
              </span>

            </h1>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-100 sm:text-lg lg:mx-0">

              Sightseeing tours, water sports, cruises, airport transfers,
              hotels and unforgettable Goa experiences at affordable prices.

            </p>

            {/* Perks */}
            <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm font-medium text-white lg:justify-start">

              {PERKS.map((perk) => (
                <li
                  key={perk}
                  className="inline-flex items-center gap-2"
                >
                  <FaCheckCircle className="text-cyan-300" />
                  {perk}
                </li>
              ))}

            </ul>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">

              <Link
                to="/packages"
                className="w-full sm:w-auto rounded-xl bg-cyan-600 px-8 py-3.5 text-center font-semibold text-white shadow-lg transition hover:bg-cyan-700"
              >
                View Packages
              </Link>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-green-500 px-8 py-3.5 font-semibold text-white shadow-lg transition hover:bg-green-600"
              >
                <FaWhatsapp className="text-xl" />
                WhatsApp Us
              </a>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;