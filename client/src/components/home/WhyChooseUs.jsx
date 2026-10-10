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
    description: "Experienced Goa travel specialists.",
  },
  {
    id: 2,
    icon: FaMoneyBillWave,
    title: "Best Prices",
    description: "Affordable packages with no hidden costs.",
  },
  {
    id: 3,
    icon: FaShieldAlt,
    title: "Safe Booking",
    description: "Verified operators and secure payments.",
  },
  {
    id: 4,
    icon: FaHeadset,
    title: "24/7 Support",
    description: "Quick assistance before and during your trip.",
  },
  {
    id: 5,
    icon: FaUsers,
    title: "5,000+ Happy Travelers",
    description: "Trusted by tourists visiting Goa every year.",
  },
  {
    id: 6,
    icon: FaAward,
    title: "Premium Experiences",
    description: "Carefully selected tours and activities.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-slate-50 px-3 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-10 text-center sm:mb-14">
          <span className="inline-block rounded-full bg-teal-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-teal-700 sm:text-sm">
            Why Choose Coastal Goa
          </span>

          <h2 className="mt-4 text-2xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl">
            Trusted Goa Travel Experts
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            We make your Goa trip simple, affordable and memorable with
            carefully selected tours, activities and local support.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:gap-6">
          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="group rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-teal-200 hover:shadow-xl sm:p-6"
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-xl text-teal-700 transition-all duration-300 group-hover:bg-teal-700 group-hover:text-white sm:mb-4 sm:h-14 sm:w-14 sm:rounded-2xl sm:text-2xl">
                  <Icon />
                </div>

                <h3 className="text-sm font-bold text-slate-900 sm:text-base md:text-lg">
                  {item.title}
                </h3>

                <p className="mt-1.5 text-xs leading-5 text-slate-500 sm:mt-2 sm:text-sm sm:leading-6">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;