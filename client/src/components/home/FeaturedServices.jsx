
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCompass } from "react-icons/fa";
import api from "../../services/api";

const FeaturedServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchServices = async () => {
      try {
        const response = await api.get("/services/featured");
        const data = response.data;

        const fetchedServices =
          data?.services ??
          data?.data?.services ??
          data?.data ??
          [];

        if (isMounted) {
          setServices(
            Array.isArray(fetchedServices)
              ? fetchedServices.slice(0, 4)
              : []
          );
        }
      } catch (err) {
        console.error("Failed to load services:", err);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchServices();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="services"
      className="bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
            <FaCompass />
            Explore More
          </span>

          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Our Travel Services
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
            Make your Goa holiday stress-free with our travel,
            transport and adventure services.
          </p>

          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-teal-600" />
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-2xl border border-slate-200"
              >
                <div className="aspect-[16/10] bg-slate-200" />
                <div className="space-y-3 p-5">
                  <div className="h-5 w-3/4 rounded bg-slate-200" />
                  <div className="h-4 rounded bg-slate-200" />
                  <div className="h-10 rounded-lg bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Service cards */}
        {!loading && !error && services.length > 0 && (
          <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5 xl:gap-6">
            {services.map((service, index) => {
              const name =
                service.title ??
                service.name ??
                "Goa Travel Service";

              const image =
                service.coverImage ??
                service.image ??
                service.imageUrl ??
                service.thumbnail ??
                service.coverImageUrl;

              const description =
                service.description ??
                service.shortDescription ??
                "Discover convenient services for your Goa holiday.";

              const price =
                service.discountPrice > 0
                  ? service.discountPrice
                  : service.price ?? service.offerPrice;

              const serviceLink = service.slug
                ? `/services/${service.slug}`
                : "/services";

              return (
                <article
                  key={service._id ?? service.id ?? `${name}-${index}`}
                  className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_3px_12px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-[0_14px_35px_rgba(15,23,42,0.12)]"
                >
                  {/* Image */}
                  <Link
                    to={serviceLink}
                    aria-label={`View ${name}`}
                    className="relative block aspect-[16/10] overflow-hidden bg-slate-100"
                  >
                    {image ? (
                      <img
                        src={image}
                        alt={name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(event) => {
                          event.currentTarget.style.visibility = "hidden";
                        }}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center px-4 text-center text-sm text-slate-500">
                        Image coming soon
                      </div>
                    )}

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
                  </Link>

                  {/* Details */}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="line-clamp-2 min-h-[3.5rem] text-lg font-bold leading-7 text-slate-900 transition-colors group-hover:text-teal-700">
                      {name}
                    </h3>

                    <p className="mt-2 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-slate-600">
                      {description}
                    </p>

                    <div className="mt-auto border-t border-slate-100 pt-4">
                      <div className="min-h-[3.25rem]">
                        {price != null &&
                        Number.isFinite(Number(price)) ? (
                          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                            <span className="text-2xl font-extrabold tracking-tight text-teal-700">
                              ₹{Number(price).toLocaleString("en-IN")}
                            </span>
                            <span className="text-sm text-slate-500">
                              onwards
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm font-semibold text-slate-600">
                            Contact for price
                          </span>
                        )}
                      </div>

                      <Link
                        to={serviceLink}
                        className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-teal-700 px-4 py-3 text-sm font-bold text-teal-800 transition-colors hover:bg-teal-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                      >
                        View Details
                        <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Empty or error state */}
        {!loading && (error || services.length === 0) && (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-10 text-center">
            <h3 className="text-lg font-bold text-slate-900">
              {error
                ? "Services couldn't be loaded"
                : "Services coming soon"}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {error
                ? "Please try again later or explore our available services."
                : "We're preparing more experiences for your Goa holiday."}
            </p>

            <Link
              to="/services"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-800"
            >
              Explore Services <FaArrowRight />
            </Link>
          </div>
        )}

        {/* View more */}
        <div className="mt-9 text-center sm:mt-12">
          <Link
            to="/services"
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-teal-700 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-teal-900/10 transition hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:px-8 sm:text-base"
          >
            View More Services
            <FaArrowRight />
          </Link>

          <p className="mt-3 text-xs text-slate-500">
            Everything you need for a memorable Goa trip
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
