import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import api from "../../services/api";
import Loader from "../common/Loader";

const FeaturedServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await api.get("/services/featured");

      console.log("Featured Services:", res.data);

      setServices(res.data.services || []);
    } catch (error) {
      console.error("Error fetching services:", error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
            Our Premium Services
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
            Everything you need for the perfect Goa vacation in one place.
          </p>
        </div>

        {/* No Services */}
        {services.length === 0 ? (
          <div className="py-10 text-center text-lg text-gray-500">
            No featured services found.
          </div>
        ) : (
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">

            {services.map((service) => (
              <div
                key={service._id}
                className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Image */}
                <div className="h-56 overflow-hidden bg-gray-200">
                  <img
                    src={
                      service.image ||
                      service.coverImage ||
                      "https://placehold.co/600x400?text=Service+Image"
                    }
                    alt={service.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    onError={(e) => {
                      e.target.src =
                        "https://placehold.co/600x400?text=Service+Image";
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {service.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-gray-600">
                    {service.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xl font-bold text-cyan-600">
                      ₹{service.price}
                    </span>

                    <Link
                      to={`/services/${service.slug || service._id}`}
                      className="flex items-center gap-2 font-semibold text-cyan-600 transition hover:text-cyan-700"
                    >
                      Learn More
                      <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Services */}
        <div className="mt-14 text-center">
          <Link
            to="/services"
            className="inline-flex items-center justify-center rounded-xl bg-cyan-500 px-8 py-4 font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-cyan-600"
          >
            View All Services
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedServices;