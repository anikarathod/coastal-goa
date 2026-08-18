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
    title: "Local Goa Experts",
    description:
      "Our experienced local team knows Goa inside out, helping you discover famous attractions and hidden gems.",
  },
  {
    id: 2,
    icon: <FaMoneyBillWave />,
    title: "Best Price Guarantee",
    description:
      "Enjoy transparent pricing with no hidden charges and the best value for your Goa vacation.",
  },
  {
    id: 3,
    icon: <FaShieldAlt />,
    title: "Safe & Secure",
    description:
      "Travel with confidence through verified partners, licensed operators, and secure online bookings.",
  },
  {
    id: 4,
    icon: <FaHeadset />,
    title: "24/7 Customer Support",
    description:
      "Our dedicated support team is always available to help you before, during, and after your trip.",
  },
  {
    id: 5,
    icon: <FaUsers />,
    title: "5000+ Happy Travelers",
    description:
      "Thousands of customers have trusted Coastal Goa for unforgettable Goa experiences.",
  },
  {
    id: 6,
    icon: <FaAward />,
    title: "Top Rated Tours",
    description:
      "From sightseeing to luxury cruises, every experience is carefully selected for quality.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">

        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            WHY CHOOSE US
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900 md:text-5xl">
            Why Travelers Love
            <span className="text-cyan-600"> Coastal Goa</span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-600">
            We are committed to making every Goa trip enjoyable,
            affordable, safe, and unforgettable through premium tours
            and personalized service.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-cyan-100 text-3xl text-cyan-600 transition-all group-hover:bg-cyan-600 group-hover:text-white">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-900">
                {item.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
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