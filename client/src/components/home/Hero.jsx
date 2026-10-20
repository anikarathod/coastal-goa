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

  const features = [
    { icon: "🚐", label: "Pickup", sub: "Free" },
    { icon: "⚡", label: "Instant", sub: "Confirmed" },
    { icon: "💰", label: "Best Price", sub: "Guaranteed" },
  ];

  return (
    <>
      <style>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1;   transform: scale(1); }
          50%      { opacity: 0.6; transform: scale(1.3); }
        }
        .animate-fade-up { animation: fade-up 0.7s ease-out both; }
        .animate-pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-up,
          .animate-pulse-dot { animation: none; }
        }
      `}</style>

      <section className="relative flex min-h-[550px] items-center overflow-hidden bg-slate-950 text-white sm:min-h-[640px] lg:min-h-[720px]">
        
        {/* 👇 THE CSS BACKGROUND IMAGE (Option 2) */}
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center"
          style={{ backgroundImage: "url('/goa-hero.jpg')" }}
        />

        {/* 👇 DARK OVERLAY for text readability */}
        {/* We use a slightly darker overlay on mobile so the text is always clear */}
        <div className="absolute inset-0 bg-slate-950/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-slate-950/90 sm:via-slate-950/60 sm:to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 sm:py-24 lg:px-12">
          
          {/* Trust badge */}
          <div className="animate-fade-up mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-medium !text-white backdrop-blur-md sm:mb-6 sm:px-4 sm:py-1.5 sm:text-sm">
            <span className="animate-pulse-dot flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] sm:h-2 sm:w-2" />
            <span>Trusted by 5,000+ travellers</span>
          </div>

          {/* Headline */}
          <h1
            className="animate-fade-up max-w-3xl text-[2.2rem] font-extrabold leading-[1.1] tracking-tight !text-white drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.1s" }}
          >
            Discover Goa Beyond
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-teal-200 to-amber-200 bg-clip-text text-transparent">
              the Beaches
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="animate-fade-up mt-4 max-w-xl text-sm leading-6 !text-white/90 drop-shadow-md sm:mt-6 sm:text-lg sm:leading-8"
            style={{ animationDelay: "0.2s" }}
          >
            Sunset cruises, private tours, water sports and airport
            transfers — handpicked by locals.
          </p>

          {/* CTAs */}
          <div
            className="animate-fade-up mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              to="/packages"
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 text-sm font-bold !text-white shadow-lg shadow-cyan-500/30 transition hover:-translate-y-0.5 hover:bg-cyan-400 sm:w-auto sm:px-7"
            >
              Explore Packages <FaArrowRight />
            </Link>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-sm font-bold !text-white shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-400 sm:w-auto sm:px-7"
            >
              <FaWhatsapp className="text-base" /> Chat on WhatsApp
            </a>
          </div>

          {/* Compact Benefit Strip */}
          <div
            className="animate-fade-up mt-8 grid grid-cols-3 gap-2 sm:mt-12 sm:max-w-2xl sm:gap-4"
            style={{ animationDelay: "0.4s" }}
          >
            {features.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center justify-center rounded-xl border border-white/15 bg-white/10 p-2 text-center backdrop-blur-md sm:flex-row sm:items-start sm:justify-start sm:p-4 sm:text-left"
              >
                <span className="text-lg sm:mr-3 sm:text-xl">{item.icon}</span>
                <div className="mt-1 sm:mt-0">
                  <p className="text-[11px] font-semibold !text-white sm:text-sm">
                    {item.label}
                  </p>
                  <p className="hidden text-[11px] !text-white/70 sm:block sm:text-xs">
                    {item.sub}
                  </p>
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