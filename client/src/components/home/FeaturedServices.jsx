import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
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
          data?.services ?? data?.data?.services ?? data?.data ?? [];

        if (isMounted) {
          setServices(
            Array.isArray(fetchedServices) ? fetchedServices.slice(0, 4) : []
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

  const formatPrice = (price) => `₹${Number(price).toLocaleString("en-IN")}`;

  return (
    <section
      id="services"
      className="bg-white px-3 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-6 text-center sm:mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700 sm:text-sm">
            Explore More
          </p>

          <h2 className="mt-2 text-xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl">
            Our Travel Services
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500 sm:text-base">
            Hotels, taxis, water sports and more — book everything for your Goa
            trip in one place.
          </p>
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-xl bg-slate-100 sm:rounded-2xl"
              >
                <div className="aspect-[4/3] bg-slate-200" />
                <div className="space-y-3 p-3 sm:p-4">
                  <div className="h-4 w-3/4 rounded bg-slate-200" />
                  <div className="h-8 rounded bg-slate-200" />
                  <div className="h-8 rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Service cards — grid auto-fits to actual item count */}
        {!loading && !error && services.length > 0 && (
          <div
            className="grid grid-cols-2 items-stretch gap-3 sm:gap-5 lg:gap-6"
            style={{
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              maxWidth: services.length < 4 ? "900px" : undefined,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {services.map((service, index) => {
              const name =
                service.title ?? service.name ?? "Goa Travel Service";

              const image =
                service.coverImage ??
                service.image ??
                service.imageUrl ??
                service.thumbnail ??
                service.coverImageUrl;

              const price =
                service.price ?? service.startingPrice ?? service.fromPrice ?? null;

              const description = service.shortDescription ?? service.tagline ?? null;

              const serviceLink = service.slug
                ? `/services/${service.slug}`
                : "/services";

              return (
                <article
                  key={service._id ?? service.id ?? `${name}-${index}`}
                  className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-2xl"
                >
                  {/* Image */}
                  <Link
                    to={serviceLink}
                    aria-label={`View ${name}`}
                    className="block aspect-[4/3] overflow-hidden bg-slate-100"
                  >
                    {image ? (
                      <img
                        src={image}
                        alt={name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center p-2 text-center text-xs text-slate-500">
                        Image unavailable
                      </div>
                    )}
                  </Link>

                  {/* Name, description, price, buttons */}
                  <div className="flex flex-1 flex-col gap-2 p-2.5 sm:gap-3 sm:p-4">
                    <h3 className="line-clamp-2 min-h-10 text-sm font-bold capitalize leading-5 text-slate-900 sm:min-h-12 sm:text-base sm:leading-6">
                      {name}
                    </h3>

                    {description && (
                      <p className="line-clamp-2 min-h-8 text-[11px] leading-4 text-slate-500 sm:text-xs sm:leading-5">
                        {description}
                      </p>
                    )}

                    {/* Price row */}
                    <div className="flex min-h-6 items-center">
                      {price ? (
                        <>
                          <span className="text-sm font-extrabold text-teal-700 sm:text-lg">
                            {formatPrice(price)}
                          </span>
                          <span className="ml-1.5 text-[10px] text-slate-400 sm:text-xs">
                            onwards
                          </span>
                        </>
                      ) : (
                        <span className="text-[11px] font-semibold text-slate-400 sm:text-xs">
                          Best rates guaranteed
                        </span>
                      )}
                    </div>

                    <div className="mt-auto flex flex-col gap-2 pt-1">
                      <Link
                        to={serviceLink}
                        className="flex min-h-9 items-center justify-center gap-1 rounded-lg border border-teal-700 px-1.5 py-2 text-center text-[10px] font-bold leading-4 text-teal-800 transition hover:bg-teal-50 min-[380px]:text-xs sm:min-h-11 sm:px-3 sm:text-sm"
                      >
                        View More Details
                        <FaArrowRight className="shrink-0 text-[10px] sm:text-xs" />
                      </Link>

                      <Link
  to="/booking"
  className="flex min-h-9 items-center justify-center gap-1 rounded-lg bg-teal-700 px-2 py-2 text-center text-xs font-bold text-white transition hover:bg-teal-800 sm:min-h-11 sm:text-sm"
>
  Book Now
  <FaArrowRight className="shrink-0 text-[10px] sm:text-xs" />
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
          <div className="py-8 text-center text-sm text-slate-500">
            {error
              ? "Services couldn't be loaded. Please try again later."
              : "No services are available right now."}
          </div>
        )}

        {/* View all services */}
        <div className="mt-7 text-center sm:mt-10">
          <Link
            to="/services"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-800 sm:min-h-12 sm:px-8 sm:text-base"
          >
            View All Services
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;