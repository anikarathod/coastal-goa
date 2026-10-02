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
    icon: <FaMapMarkedAlt />,
    title: "Local Experts",
    description: "Experienced Goa specialists.",
  },
  {
    id: 2,
    icon: <FaMoneyBillWave />,
    title: "Best Prices",
    description: "No hidden charges.",
  },
  {
    id: 3,
    icon: <FaShieldAlt />,
    title: "Safe Booking",
    description: "Verified operators only.",
  },
  {
    id: 4,
    icon: <FaHeadset />,
    title: "24/7 Support",
    description: "Always available.",
  },
  {
    id: 5,
    icon: <FaUsers />,
    title: "5000+ Travelers",
    description: "Trusted by tourists.",
  },
  {
    id: 6,
    icon: <FaAward />,
    title: "Top Rated",
    description: "Premium experiences.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-white py-12 lg:py-16">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-10 text-center">

          <span className="inline-block rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            WHY CHOOSE US
          </span>

          <h2 className="mt-4 text-3xl font-bold text-gray-900 lg:text-4xl">
            Why Travelers Love
            <span className="text-cyan-600">
              {" "}Coastal Goa
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Affordable, safe and unforgettable Goa experiences.
          </p>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">

          {features.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-xl text-cyan-600">
                {item.icon}
              </div>

              <h3 className="text-sm font-bold text-gray-900 md:text-lg">
                {item.title}
              </h3>

              <p className="mt-2 text-xs text-gray-600 md:text-sm">
                {item.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default WhyChooseUs;