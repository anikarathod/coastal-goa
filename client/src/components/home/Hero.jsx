import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
  return (
    <>
      {/* Animation CSS — scoped to this component */}
      <style>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-up {
          animation: fade-up 0.7s ease-out both;
        }

        /* Respect users who prefer less motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-up {
            animation: none;
          }
        }
      `}</style>

      <section className="relative flex min-h-[540px] items-center overflow-hidden bg-slate-900 text-white sm:min-h-[600px] lg:min-h-[680px]">
        <img
          src="/goa-hero.jpg"
          alt="Aerial view of a Goa beach with palm trees and blue sea"
          loading="eager"
          decoding="async"
          fetchpriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Stronger overlay so text pops on any photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-slate-900/20" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <p
            className="animate-fade-up mb-4 text-xs font-bold uppercase tracking-[0.25em] text-cyan-200 sm:text-sm"
          >
            Discover the Beauty of Goa
          </p>

          <h1
            className="animate-fade-up max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.1s" }}
          >
            Explore <span className="text-cyan-200">Goa</span>
            <br />
            With Us
          </h1>

          <p
            className="animate-fade-up mt-5 max-w-lg text-sm leading-6 text-slate-100 sm:text-base sm:leading-7"
            style={{ animationDelay: "0.2s" }}
          >
            Cruises, water sports, sightseeing tours &amp; airport transfers —
            choose your dream package and we&apos;ll handle the rest.
          </p>

          <div
            className="animate-fade-up mt-8 flex flex-wrap gap-3"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              to="/packages"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition hover:bg-cyan-600 hover:shadow-cyan-500/40"
            >
              Explore Packages <FaArrowRight />
            </Link>

            <Link
              to="/contact"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/70 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-slate-900"
            >
              Contact Us
            </Link>
          </div>

          {/* Trust strip — instant credibility */}
          <div
            className="animate-fade-up mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-300 sm:text-sm"
            style={{ animationDelay: "0.4s" }}
          >
            <span>⭐ 4.9 Rated on Google</span>
            <span className="hidden h-4 w-px bg-white/30 sm:block" />
            <span>5,000+ Happy Travelers</span>
            <span className="hidden h-4 w-px bg-white/30 sm:block" />
            <span>24/7 Local Support</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;