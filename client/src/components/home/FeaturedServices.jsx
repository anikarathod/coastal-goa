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
      const res = await api.get("/services");

      console.log("Services Response:", res.data);

      const servicesData =
        res.data.services ||
        res.data.data ||
        [];

      setServices(servicesData.slice(0, 10));
    } catch (error) {
      console.error("Error fetching services:", error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader />
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4">

        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Our Premium Services
          </h2>

          <p className="mt-2 text-gray-600">
            Everything you need for the perfect Goa vacation.
          </p>
        </div>

        {services.length === 0 ? (
          <div className="py-10 text-center text-red-500">
            No services found.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {services.map((service) => (
              <ServiceCard
                key={service._id}
                service={service}
              />
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            to="/services"
            className="inline-flex items-center rounded-lg bg-cyan-600 px-5 py-2 text-sm font-semibold text-white hover:bg-cyan-700"
          >
            View All Services
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedServices;