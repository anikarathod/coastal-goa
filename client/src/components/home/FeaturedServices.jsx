import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import api from "../../services/api";

const FeaturedServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/services/featured");
        const data = response.data;

        const fetchedServices =
          data?.services ??
          data?.data?.services ??
          data?.data ??
          [];

        setServices(
          Array.isArray(fetchedServices)
            ? fetchedServices.slice(0, 4)
            : []
        );
      } catch (error) {
        console.error("Failed to load featured services:", error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <section
      id="services"
      className="bg-white px-5 py-16 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600">
            What We Offer
          </p>

          <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Our Travel Services
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-600">
            From comfortable transfers to unforgettable adventures,
            explore the services available for your Goa trip.
          </p>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-2xl border border-slate-200"
              >
                <div className="h-48 bg-slate-200" />
                <div className="space-y-3 p-5">
                  <div className="h-5 w-3/4 rounded bg-slate-200" />
                  <div className="h-4 w-full rounded bg-slate-200" />
                  <div className="h-4 w-1/2 rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Services posted by admin */}
        {!loading && services.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => {
              const name =
                service.name ??
                service.title ??
                "Goa Travel Service";

              const image =
                service.image ??
                service.imageUrl ??
                service.coverImage ??
                service.thumbnail;

              const price =
                service.price ?? service.offerPrice;

              return (
                <article
                  key={
                    service._id ??
                    service.id ??
                    `${name}-${index}`
                  }
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Service image */}
                  <div className="h-48 overflow-hidden bg-slate-200">
                    {image ? (
                      <img
                        src={image}
                        alt={name}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-slate-500">
                        Service image unavailable
                      </div>
                    )}
                  </div>

                  {/* Service information */}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-bold text-slate-900">
                      {name}
                    </h3>

                    {service.description && (
                      <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                        {service.description}
                      </p>
                    )}

                    <div className="mt-auto pt-5">
                      {price != null && (
                        <p className="text-xl font-extrabold text-cyan-700">
                          ₹{price}
                          <span className="ml-1 text-sm font-normal text-slate-500">
                            onwards
                          </span>
                        </p>
                      )}

                      <Link
                        to="/services"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-cyan-700 transition hover:text-cyan-900"
                      >
                        View Details <FaArrowRight />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Empty state */}
        {!loading && services.length === 0 && (
          <p className="py-8 text-center text-slate-500">
            No services are available right now. Please check back soon.
          </p>
        )}

        {/* View more button */}
        <div className="mt-10 text-center">
          <Link
            to="/services"
            className="inline-flex items-center justify-center gap-3 rounded-xl bg-cyan-600 px-8 py-4 font-bold text-white shadow-md transition hover:bg-cyan-700"
          >
            View More Services
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;