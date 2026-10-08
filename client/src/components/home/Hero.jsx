import { Link } from "react-router-dom";
import { FaStar, FaPhoneAlt, FaCheckCircle } from "react-icons/fa";

// ---- Edit these to match your real business details -------------------
const HERO_IMAGE = "/images/hero-goa-beach.webp"; // your own photo, compressed WebP (~200 KB)
const HERO_ALT = "Jet skis and speedboats on a Goa beach";
const PHONE_DISPLAY = "+91 91758 84119";
const PHONE_LINK = "tel:+919175884119";
const TRUST_LINE = "Rated 4.8 by 1,000+ guests"; // only keep if true
const PERKS = [
  "Hotel pickup",
  "Instant confirmation",
  "Free cancellation",
]; // only keep what you really offer
// -----------------------------------------------------------------------

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-slate-900">
      {/* Background image: real <img> so it can be prioritised and has alt text */}
      <img
        src={HERO_IMAGE}
        alt={HERO_ALT}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Overlay: dark behind the text only, lighter elsewhere */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20 lg:bg-gradient-to-r lg:from-black/75 lg:via-black/45 lg:to-black/5" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[70vh] items-center lg:min-h-[640px]">
        {/* Use this SAME container classes in your Navbar so the logo and
            hero text line up on the left edge */}
        <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
          <div className="max-w-2xl text-center lg:text-left">
            {/* Trust badge */}
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/30 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <FaStar className="text-amber-400" aria-hidden="true" />
              {TRUST_LINE}
            </p>

            {/* Headline: says what you sell */}
            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              Goa cruises, water sports and tours
            </h1>

            {/* Subtext: one short line */}
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-100 sm:text-lg lg:mx-0">
              Book online in minutes and get your confirmation on WhatsApp.
            </p>

            {/* Perks */}
            <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-white lg:justify-start">
              {PERKS.map((perk) => (
                <li key={perk} className="inline-flex items-center gap-2">
                  <FaCheckCircle className="text-cyan-300" aria-hidden="true" />
                  {perk}
                </li>
              ))}
            </ul>

            {/* Buttons: one primary action, one secondary */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                to="/packages"
                className="rounded-xl bg-cyan-700 px-8 py-4 text-center font-semibold text-white transition hover:bg-cyan-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-300"
              >
                View packages and prices
              </Link>

              <a
                href={PHONE_LINK}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/60 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/70"
              >
                <FaPhoneAlt aria-hidden="true" />
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;