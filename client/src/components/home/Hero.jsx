import { Link } from "react-router-dom";
import { FaArrowRight, FaWhatsapp } from "react-icons/fa";
import { useSettings } from "../../context/SettingsContext";

const Hero = () => {
  const { settings } = useSettings();
  const whatsappNumber = settings.whatsapp || "917507057684";
  const whatsappMessage = encodeURIComponent(
    "Hi Alpha Waves Goa! I'd like to know more about your packages."
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <>
      <style>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fade-up 0.7s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-up { animation: none; }
        }
      `}</style>

      <section className="relative flex min-h-[560px] items-center overflow-hidden bg-slate-900 text-white sm:min-h-[620px] lg:min-h-[700px]">
        {/* Background image */}
        <img
          src="/goa-hero.jpg"
          alt="Aerial view of a Goa beach with palm trees and turquoise sea"
          loading="eager"
          decoding="async"
          fetchpriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Directional overlay — dark on left, transparent on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-transparent" />

        {/* Warm tint to make the photo feel sunny, not cold */}
        <div className="absolute inset-0 bg-gradient-to-tr from-teal-900/30 via-transparent to-amber-500/10" />

        {/* Bottom fade into next section */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12">

          {/* Trust badge pill */}
          <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-md sm:text-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span>Trusted by 5,000+ travellers across Goa</span>
          </div>

          {/* Headline — bright white now, not slate */}
          <h1
            className="animate-fade-up max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)] sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.1s" }}
          >
            Discover Goa Beyond
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-teal-200 to-amber-200 bg-clip-text text-transparent">
              the Beaches
            </span>
          </h1>

          {/* Subheadline — brighter too */}
          <p
            className="animate-fade-up mt-6 max-w-xl text-base leading-7 text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)] sm:text-lg sm:leading-8"
            style={{ animationDelay: "0.2s" }}
          >
            Sunset cruises, private tours, water sports and airport
            transfers — handpicked by locals who know every hidden cove.
          </p>

          {/* CTAs */}
          <div
            className="animate-fade-up mt-9 flex flex-wrap gap-3"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              to="/packages"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-7 py-3.5 text-sm font-bold !text-white shadow-lg shadow-cyan-500/40 transition hover:-translate-y-0.5 hover:bg-cyan-400 hover:shadow-cyan-400/60"
            >
              Explore Packages <FaArrowRight />
            </Link>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-7 py-3.5 text-sm font-bold !text-white shadow-lg shadow-emerald-500/40 transition hover:-translate-y-0.5 hover:bg-emerald-400 hover:shadow-emerald-400/60"
            >
              <FaWhatsapp className="text-base" /> Chat on WhatsApp
            </a>
          </div>

          {/* Feature strip */}
          <div
            className="animate-fade-up mt-12 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3"
            style={{ animationDelay: "0.4s" }}
          >
            {[
              { icon: "🚐", label: "Hotel Pickup", sub: "Free within radius" },
              { icon: "⚡", label: "Instant Confirmation", sub: "Within 15 minutes" },
              { icon: "💰", label: "Best Price", sub: "Guaranteed or refunded" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3 rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-md"
              >
                <span className="text-xl">{item.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-white">{item.label}</p>
                  <p className="text-xs text-white/80">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;