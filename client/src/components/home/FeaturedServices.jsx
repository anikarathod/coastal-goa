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
      className="bg-white px-3 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-6 text-center sm:mb-12">
          <span className="inline-block rounded-full bg-teal-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-teal-700 sm:px-4 sm:py-1.5 sm:text-sm">
            ✨ Explore More
          </span>

          <h2 className="mt-3 text-xl font-extrabold tracking-tight text-slate-900 sm:mt-4 sm:text-3xl lg:text-4xl">
            Our Travel Services
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-xs text-slate-600 sm:mt-3 sm:text-base">
            Hotels, taxis, water sports and more — book everything for your
            Goa trip in one place.
          </p>
        </div>

        {/* LOADING SKELETONS */}
        {loading && (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <div className="h-40 bg-slate-200 sm:h-48 md:h-52" />
                <div className="space-y-2 p-2.5 sm:space-y-3 sm:p-4">
                  <div className="h-4 w-3/4 rounded bg-slate-200 sm:h-5" />
                  <div className="h-3 w-1/2 rounded bg-slate-200 sm:h-4" />
                  <div className="h-8 rounded-lg bg-slate-200 sm:h-10" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ERROR STATE */}
        {!loading && error && (
          <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6 text-center sm:p-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 sm:h-14 sm:w-14">
              <FaSuitcase className="text-xl text-rose-500 sm:text-2xl" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-slate-900 sm:text-lg">
              Couldn't load services
            </h3>
            <p className="mt-1 text-sm text-slate-600">
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
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center sm:p-12">
            <p className="text-sm text-slate-500">
              No featured services available right now.
            </p>
          </div>
        )}

        {/* SERVICE GRID */}
        {!loading && !error && services.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {services.map((service, index) => {
              const name =
                service.title ?? service.name ?? "Goa Travel Service";
              const slug = service.slug;
              const link = slug
                ? `/services/${slug}`
                : `/services/${service._id}`;

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
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg"
                >
                  {/* IMAGE — fixed pixel height, no gray gaps */}
                  <Link
                    to={link}
                    aria-label={`View ${name}`}
                    className="relative block h-40 w-full overflow-hidden bg-slate-100 sm:h-48 md:h-52"
                  >
                    {image ? (
                      <img
                        src={image}
                        alt={name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "https://placehold.co/600x400?text=Service";
                        }}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-slate-400">
                        No image
                      </div>
                    )}

                    {/* Gradient overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* CATEGORY BADGE */}
                    {category && (
                      <span className="absolute left-1.5 top-1.5 inline-flex max-w-[calc(100%-60px)] items-center gap-1 truncate rounded-full bg-teal-600 px-2 py-0.5 text-[9px] font-bold text-white shadow-md sm:left-3 sm:top-3 sm:max-w-[calc(100%-90px)] sm:px-2.5 sm:py-1 sm:text-xs">
                        <FaTag className="shrink-0 text-[8px] sm:text-[10px]" />
                        <span className="truncate">{category}</span>
                      </span>
                    )}

                    {/* DISCOUNT BADGE */}
                    {discount > 0 && (
                      <span className="absolute right-1.5 top-1.5 rounded-full bg-rose-500 px-2 py-0.5 text-[9px] font-bold text-white shadow-md sm:right-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-xs">
                        {discount}% OFF
                      </span>
                    )}

                    {/* LOCATION */}
                    {location && (
                      <span className="absolute bottom-1.5 left-1.5 right-1.5 inline-flex items-center gap-1 truncate rounded-full bg-black/60 px-2 py-0.5 text-[9px] font-medium text-white backdrop-blur-sm sm:bottom-3 sm:left-3 sm:right-auto sm:max-w-[calc(100%-24px)] sm:px-2.5 sm:py-1 sm:text-xs">
                        <FaMapMarkerAlt className="shrink-0 text-[8px] sm:text-[10px]" />
                        <span className="truncate">{location}</span>
                      </span>
                    )}
                  </Link>

                  {/* CONTENT */}
                  <div className="flex flex-1 flex-col p-2.5 sm:p-4">
                    {/* TITLE */}
                    <h3 className="line-clamp-2 text-[13px] font-bold capitalize leading-tight text-slate-900 transition group-hover:text-teal-700 sm:text-base">
                      {name}
                    </h3>

                    {/* DESCRIPTION */}
                    {description && (
                      <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-slate-500 sm:mt-1.5 sm:text-sm sm:leading-5">
                        {description}
                      </p>
                    )}

                    {/* RATING */}
                    {rating > 0 && (
                      <div className="mt-1 flex items-center gap-1">
                        <FaStar className="text-[9px] text-amber-400 sm:text-xs" />
                        <span className="text-[10px] font-semibold text-slate-900 sm:text-xs">
                          {rating}
                        </span>
                      </div>
                    )}

                    {/* PRICE */}
                    <div className="mt-1.5 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
                      {finalPrice ? (
                        <>
                          <span className="text-base font-extrabold text-teal-700 sm:text-xl">
                            {formatPrice(finalPrice)}
                          </span>
                          <span className="text-[9px] text-slate-400 sm:text-xs">
                            onwards
                          </span>
                          {discountPrice && (
                            <span className="text-[10px] text-slate-400 line-through sm:text-sm">
                              {formatPrice(basePrice)}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-[10px] font-semibold text-slate-400 sm:text-xs">
                          Best rates guaranteed
                        </span>
                      )}
                    </div>

                    {/* CTA BUTTONS */}
                    <div className="mt-auto flex flex-col gap-1.5 pt-2.5 sm:gap-2 sm:pt-3">
                      <Link
                        to={link}
                        className="inline-flex min-h-8 items-center justify-center gap-1 rounded-lg border border-teal-600 bg-white px-2 py-1.5 text-[11px] font-bold !text-teal-700 transition hover:bg-teal-50 sm:min-h-9 sm:py-2.5 sm:text-sm"
                      >
                        View Details
                        <FaArrowRight className="text-[9px] sm:text-[10px]" />
                      </Link>

                      <Link
                        to="/contact"
                        className="inline-flex min-h-8 items-center justify-center gap-1 rounded-lg bg-teal-600 px-2 py-1.5 text-[11px] font-bold !text-white shadow-sm transition hover:bg-teal-700 sm:min-h-9 sm:py-2.5 sm:text-sm"
                      >
                        Enquire Now
                        <FaArrowRight className="text-[9px] sm:text-[10px]" />
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
          <div className="mt-8 text-center sm:mt-12">
            <Link
              to="/services"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-bold !text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-md sm:min-h-12 sm:px-8 sm:text-base"
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