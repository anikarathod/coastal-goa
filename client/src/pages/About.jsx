import {
  FaUsers,
  FaMapMarkedAlt,
  FaAward,
  FaShip,
  FaBullseye,
  FaEye,
  FaPhoneAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import WhyChooseUs from "../components/home/WhyChooseUs";

const stats = [
  {
    icon: <FaUsers />,
    value: "10,000+",
    title: "Happy Travelers",
  },
  {
    icon: <FaMapMarkedAlt />,
    value: "100+",
    title: "Tour Packages",
  },
  {
    icon: <FaAward />,
    value: "8+",
    title: "Years Experience",
  },
  {
    icon: <FaShip />,
    value: "4.9★",
    title: "Customer Rating",
  },
];

const About = () => {
  return (
    <div className="bg-gray-50">

      {/* Hero */}

      <section className="bg-gradient-to-r from-cyan-600 to-blue-700 py-24 text-white">

        <div className="mx-auto max-w-7xl px-6 text-center">

          <h1 className="text-5xl font-bold">
            About Coastal Goa
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-cyan-100">
            We create unforgettable travel experiences
            across Goa through carefully planned tours,
            exciting adventures, and exceptional customer
            service.
          </p>

        </div>

      </section>

      {/* Story */}

      <section className="py-20">

        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2">

          <div>

            <img
              src="/images/about.jpg"
              alt="About Coastal Goa"
              className="rounded-3xl shadow-xl"
            />

          </div>

          <div>

            <h2 className="mb-6 text-4xl font-bold">
              Our Story
            </h2>

            <p className="mb-5 leading-8 text-gray-600">
              Coastal Goa was founded with one goal —
              to help visitors experience the true beauty
              of Goa beyond ordinary sightseeing.
            </p>

            <p className="mb-5 leading-8 text-gray-600">
              From beaches and waterfalls to cruises,
              yacht rentals, water sports and local
              experiences, we make every trip memorable.
            </p>

            <p className="leading-8 text-gray-600">
              Thousands of travelers trust us because we
              combine affordability, safety, and
              personalized service.
            </p>

          </div>

        </div>

      </section>

      {/* Mission & Vision */}

      <section className="bg-white py-20">

        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-2">

          <div className="rounded-2xl bg-cyan-50 p-8 shadow">

            <FaBullseye className="mb-5 text-5xl text-cyan-600" />

            <h2 className="mb-4 text-3xl font-bold">
              Our Mission
            </h2>

            <p className="leading-8 text-gray-600">
              To provide safe, affordable and memorable
              travel experiences while showcasing the
              natural beauty and culture of Goa.
            </p>

          </div>

          <div className="rounded-2xl bg-blue-50 p-8 shadow">

            <FaEye className="mb-5 text-5xl text-blue-600" />

            <h2 className="mb-4 text-3xl font-bold">
              Our Vision
            </h2>

            <p className="leading-8 text-gray-600">
              To become Goa's most trusted tourism
              company by delivering exceptional customer
              experiences and innovative travel services.
            </p>

          </div>

        </div>

      </section>

      {/* Statistics */}

      <section className="py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

            {stats.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white p-8 text-center shadow-lg"
              >
                <div className="mb-4 flex justify-center text-5xl text-cyan-600">
                  {item.icon}
                </div>

                <h3 className="text-4xl font-bold">
                  {item.value}
                </h3>

                <p className="mt-2 text-gray-600">
                  {item.title}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* Why Choose Us */}

      <WhyChooseUs />

      {/* CTA */}

      <section className="bg-gradient-to-r from-cyan-600 to-blue-700 py-20 text-white">

        <div className="mx-auto max-w-4xl px-6 text-center">

          <h2 className="text-4xl font-bold">
            Ready for Your Goa Adventure?
          </h2>

          <p className="mt-5 text-lg text-cyan-100">
            Book your dream vacation today and let
            Coastal Goa create unforgettable memories.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">

            <Link
              to="/packages"
              className="rounded-xl bg-white px-8 py-4 font-semibold text-cyan-700 transition hover:bg-gray-100"
            >
              Explore Packages
            </Link>

            <Link
              to="/contact"
              className="flex items-center gap-2 rounded-xl border border-white px-8 py-4 font-semibold transition hover:bg-white hover:text-cyan-700"
            >
              <FaPhoneAlt />

              Contact Us
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
};

export default About;