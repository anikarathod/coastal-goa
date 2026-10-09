
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative flex min-h-[360px] items-center overflow-hidden bg-slate-900 text-white sm:min-h-[400px] lg:min-h-[440px]">
      <img
        src="/images/goa-hero.jpg"
        alt="Beautiful Goa beach with palm trees"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-slate-900/10" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-cyan-200 sm:text-sm">
          Discover the beauty of Goa
        </p>

        <h1 className="max-w-xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Explore <span className="text-cyan-200">Goa</span>
          <br />
          With Us
        </h1>

        <p className="mt-5 max-w-lg text-sm leading-6 text-white sm:text-base sm:leading-7">
          Cruises, water sports, tours and airport transfers.
          <br className="hidden sm:block" />
          Choose your dream package and let us handle the rest.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="#packages"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 text-sm font-bold text-white hover:bg-cyan-600"
          >
            Explore Packages <FaArrowRight />
          </a>

          <Link
            to="/contact"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white px-6 py-3 text-sm font-bold text-white hover:bg-white hover:text-slate-900"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
