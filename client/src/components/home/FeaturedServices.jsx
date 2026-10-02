import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

import Loader from "../common/Loader";
import ServiceCard from "../services/ServiceCard";

const FeaturedServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);

      const res = await api.get("/services");

      const servicesData =
        res.data?.services ||
        res.data?.data ||
        [];

      setServices(servicesData.slice(0, 8));
    } catch (error) {
      console.error("Error fetching services:", error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader />
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-12 lg:py-16">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-8 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
              Our Premium Services
            </h2>

            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Everything you need for the perfect Goa vacation.
            </p>

          </div>

          <Link
            to="/services"
            className="hidden font-semibold text-cyan-600 hover:text-cyan-700 md:block"
          >
            View All →
          </Link>

        </div>

        {/* Services */}
        {services.length === 0 ? (

          <div className="py-16 text-center text-red-500">
            No services found.
          </div>

        ) : (

          <>
            {/* Mobile */}
            <div className="grid grid-cols-2 gap-4 lg:hidden">

              {services.map((service) => (

                <ServiceCard
                  key={service._id}
                  service={service}
                />

              ))}

            </div>

            {/* Desktop */}
            <div className="hidden lg:grid lg:grid-cols-4 gap-6">

              {services.map((service) => (

                <ServiceCard
                  key={service._id}
                  service={service}
                />

              ))}

            </div>

          </>

        )}

        {/* Mobile Button */}
        <div className="mt-8 text-center md:hidden">

          <Link
            to="/services"
            className="inline-flex items-center justify-center rounded-xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-cyan-700"
          >
            View All Services
          </Link>

        </div>

      </div>

    </section>
  );
};

export default FeaturedServices;