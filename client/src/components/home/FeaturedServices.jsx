import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaStar,
  FaMapMarkerAlt,
  FaTag,
  FaSuitcase,
  FaRedo,
} from "react-icons/fa";
import api from "../../services/api";

const FeaturedServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await api.get("/services/featured");
      const data = response.data;

      const fetchedServices =
        data?.services ?? data?.data?.services ?? data?.data ?? [];

      setServices(
        Array.isArray(fetchedServices) ? fetchedServices.slice(0, 4) : []
      );
    } catch (err) {
      console.error("Failed to load services:", err.message);
      setError(true);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => `₹${Number(price).toLocaleString("en-IN")}`;

  return (
    <section
      id="services"
      className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-8 text-center sm:mb-12">
          <span className="inline-block rounded-full bg-teal-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 sm:text-sm">
            ✨ Explore More
          </span>

          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
            Our Travel Services
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 sm:text-base">
            Hotels, taxis, water sports and more — book everything for your
            Goa trip in one place.
          </p>
        </div>

        {/* LOADING SKELETONS */}
        {loading && (
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-2xl border border-gray-100 bg-white"
              >
                <div className="aspect-[4/3] bg-gray-200" />
                <div className="space-y-3 p-4">
                  <div className="h-5 w-3/4 rounded bg-gray-200" />
                  <div className="h-4 w-1/2 rounded bg-gray-200" />
                  <div className="h-10 rounded-lg bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ERROR STATE */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
              <FaSuitcase className="text-2xl text-red-500" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              Couldn't load services
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Something went wrong. Please try again.
            </p>
            <button
              type="button"
              onClick={fetchServices}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              <FaRedo className="text-xs" />
              Retry
            </button>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && services.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center">
            <p className="text-sm text-gray-500">
              No featured services available right now.
            </p>
          </div>
        )}

        {/* SERVICE GRID */}
        {!loading && !error && services.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {services.map((service, index) => {
              const name =
                service.title ?? service.name ?? "Goa Travel Service";
              const slug = service.slug;
              const link = slug ? `/services/${slug}` : `/services/${service._id}`;

              const image =
                service.coverImage ??
                service.image ??
                service.imageUrl ??
                service.thumbnail ??
                service.coverImageUrl;

              const basePrice =
                service.price ??
                service.startingPrice ??
                service.fromPrice ??
                null;

              const discountPrice =
                service.discountPrice && service.discountPrice > 0
                  ? service.discountPrice
                  : null;

              const finalPrice = discountPrice || basePrice;

              const discount =
                basePrice && discountPrice && basePrice > discountPrice
                  ? Math.round(((basePrice - discountPrice) / basePrice) * 100)
                  : 0;

              const description =
                service.shortDescription ?? service.tagline ?? null;

              const category = service.category ?? null;
              const location = service.location ?? null;
              const rating = service.rating ?? null;

              return (
                <article
                  key={service._id ?? service.id ?? `${name}-${index}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg"
                >
                  {/* IMAGE */}
                  <Link
                    to={link}
                    aria-label={`View ${name}`}
                    className="relative block aspect-[4/3] overflow-hidden bg-gray-100"
                  >
                    {image ? (
                      <img
                        src={image}
                        alt={name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "https://placehold.co/600x400?text=Service";
                        }}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-gray-400">
                        No image
                      </div>
                    )}

                    {/* Gradient overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    {/* CATEGORY BADGE */}
                    {category && (
                      <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-teal-600 px-2.5 py-1 text-[10px] font-bold text-white shadow-md sm:left-3 sm:top-3 sm:text-xs">
                        <FaTag className="text-[8px] sm:text-[10px]" />
                        {category}
                      </span>
                    )}

                    {/* DISCOUNT BADGE */}
                    {discount > 0 && (
                      <span className="absolute right-2 top-2 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-md sm:right-3 sm:top-3 sm:text-xs">
                        {discount}% OFF
                      </span>
                    )}

                    {/* LOCATION OVERLAY */}
                    {location && (
                      <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm sm:bottom-3 sm:left-3 sm:text-xs">
                        <FaMapMarkerAlt className="text-[8px] sm:text-[10px]" />
                        {location}
                      </span>
                    )}
                  </Link>

                  {/* CONTENT */}
                  <div className="flex flex-1 flex-col p-3 sm:p-4">

                    {/* TITLE */}
                    <h3 className="line-clamp-2 text-sm font-bold capitalize text-gray-900 transition group-hover:text-teal-700 sm:text-base">
                      {name}
                    </h3>

                    {/* DESCRIPTION */}
                    {description && (
                      <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-gray-500 sm:text-sm">
                        {description}
                      </p>
                    )}

                    {/* RATING */}
                    {rating > 0 && (
                      <div className="mt-1.5 flex items-center gap-1">
                        <FaStar className="text-[10px] text-yellow-500 sm:text-xs" />
                        <span className="text-xs font-semibold text-gray-900">
                          {rating}
                        </span>
                      </div>
                    )}

                    {/* PRICE */}
                    <div className="mt-2 flex items-baseline gap-2">
                      {finalPrice ? (
                        <>
                          <span className="text-lg font-extrabold text-teal-700 sm:text-xl">
                            {formatPrice(finalPrice)}
                          </span>
                          <span className="text-[10px] text-gray-400 sm:text-xs">
                            onwards
                          </span>
                          {discountPrice && (
                            <span className="text-xs text-gray-400 line-through sm:text-sm">
                              {formatPrice(basePrice)}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-xs font-semibold text-gray-400">
                          Best rates guaranteed
                        </span>
                      )}
                    </div>

                    {/* CTA BUTTONS */}
                    <div className="mt-auto flex flex-col gap-2 pt-3">
                      <Link
                        to={link}
                        className="flex items-center justify-center gap-1.5 rounded-lg border border-teal-600 px-2 py-2 text-xs font-bold text-teal-700 transition hover:bg-teal-50 sm:py-2.5 sm:text-sm"
                      >
                        View Details
                        <FaArrowRight className="text-[10px]" />
                      </Link>

                      <Link
                        to="/contact"
                        className="flex items-center justify-center gap-1.5 rounded-lg bg-teal-600 px-2 py-2 text-xs font-bold text-white transition hover:bg-teal-700 sm:py-2.5 sm:text-sm"
                      >
                        Enquire Now
                        <FaArrowRight className="text-[10px]" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* VIEW ALL */}
        {!loading && !error && services.length > 0 && (
          <div className="mt-10 text-center sm:mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-md sm:px-8 sm:text-base"
            >
              View All Services
              <FaArrowRight />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedServices;