import {
  FaMapMarkedAlt,
  FaShieldAlt,
  FaHeadset,
  FaMoneyBillWave,
  FaUsers,
  FaAward,
} from "react-icons/fa";

const features = [
  {
    id: 1,
    icon: FaMapMarkedAlt,
    title: "Local Experts",
    description: "Experienced Goa travel specialists who know every hidden cove.",
    accent: "from-teal-500 to-teal-600",
  },
  {
    id: 2,
    icon: FaMoneyBillWave,
    title: "Best Prices",
    description: "Affordable packages with no hidden costs, ever.",
    accent: "from-emerald-500 to-emerald-600",
  },
  {
    id: 3,
    icon: FaShieldAlt,
    title: "Safe Booking",
    description: "Verified operators and fully secure payment processing.",
    accent: "from-sky-500 to-sky-600",
  },
  {
    id: 4,
    icon: FaHeadset,
    title: "24/7 Support",
    description: "Quick assistance on WhatsApp before and during your trip.",
    accent: "from-violet-500 to-violet-600",
  },
  {
    id: 5,
    icon: FaUsers,
    title: "5,000+ Travellers",
    description: "Trusted by visitors from across India and around the world.",
    accent: "from-amber-500 to-amber-600",
  },
  {
    id: 6,
    icon: FaAward,
    title: "Premium Experiences",
    description: "Handpicked tours and activities curated for every type of traveller.",
    accent: "from-rose-500 to-rose-600",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="relative overflow-hidden bg-slate-50 px-3 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      {/* Subtle background accent */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-teal-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-teal-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-8 text-center sm:mb-12">
          <span className="inline-block rounded-full bg-teal-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-teal-700 sm:px-4 sm:py-1.5 sm:text-sm">
            Why Choose Alpha Waves Goa
          </span>

          <h2 className="mt-3 text-xl font-extrabold tracking-tight text-slate-900 sm:mt-4 sm:text-3xl lg:text-4xl">
            Trusted Goa Travel Experts
          </h2>

          <p className="mx-auto mt-2.5 max-w-2xl text-xs leading-6 text-slate-500 sm:mt-4 sm:text-base sm:leading-7">
            We make your Goa trip simple, affordable and memorable —
            with carefully selected tours, activities and local support.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:gap-5">
          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl sm:p-5"
              >
                {/* Icon — gradient background per card */}
                <div
                  className={`mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${item.accent} text-lg text-white shadow-md transition-transform duration-300 group-hover:scale-110 sm:mb-4 sm:h-14 sm:w-14 sm:rounded-2xl sm:text-xl`}
                >
                  <Icon />
                </div>

                <h3 className="text-sm font-bold text-slate-900 sm:text-base md:text-lg">
                  {item.title}
                </h3>

                <p className="mt-1.5 text-xs leading-5 text-slate-500 sm:mt-2 sm:text-sm sm:leading-6">
                  {item.description}
                </p>

                {/* Subtle bottom accent line on hover */}
                <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-teal-500 to-teal-600 transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            );
          })}
        </div>

        {/* Trust strip */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-slate-500 sm:mt-12 sm:text-sm">
          <span className="inline-flex items-center gap-2">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Verified operators
          </span>
          <span className="hidden h-3 w-px bg-slate-300 sm:inline-block" />
          <span className="inline-flex items-center gap-2">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Instant WhatsApp support
          </span>
          <span className="hidden h-3 w-px bg-slate-300 sm:inline-block" />
          <span className="inline-flex items-center gap-2">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Free cancellation up to 24h
          </span>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;