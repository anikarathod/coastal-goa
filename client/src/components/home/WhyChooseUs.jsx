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
    title: "5000+ Happy Travelers",
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
    <section className="bg-slate-50 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            WHY CHOOSE COASTAL GOA
          </span>

          <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
            Trusted Goa Travel Experts
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            We make your Goa trip simple, affordable and memorable with
            carefully selected tours, activities and local support.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="group rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-2xl text-cyan-600 transition group-hover:bg-cyan-600 group-hover:text-white">
                  <Icon />
                </div>

                <h3 className="text-base font-bold text-slate-900 md:text-lg">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
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