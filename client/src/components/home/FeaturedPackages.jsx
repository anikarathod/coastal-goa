import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaClock,
  FaStar,
  FaMapMarkerAlt,
  FaBoxOpen,
  FaRedo,
} from "react-icons/fa";
import api from "../../services/api";

const FeaturedPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await api.get("/packages/featured");
      const data = response.data;

      const fetchedPackages =
        data?.packages ?? data?.data?.packages ?? data?.data ?? [];

      setPackages(
        Array.isArray(fetchedPackages) ? fetchedPackages.slice(0, 4) : []
      );
    } catch (err) {
      console.error("Failed to load packages:", err.message);
      setError(true);
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) =>
    `₹${Number(price).toLocaleString("en-IN")}`;

  return (
    <section
      id="packages"
      className="bg-gradient-to-b from-white to-slate-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-8 text-center sm:mb-12">
          <span className="inline-block rounded-full bg-teal-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 sm:text-sm">
            🌴 Discover Goa
          </span>

          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Explore Our Tour Packages
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
            Handpicked experiences at the best prices — no hidden costs.
          </p>
        </div>

        {/* LOADING SKELETONS */}
        {loading && (
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <div className="aspect-[4/3] bg-slate-200" />
                <div className="space-y-3 p-4">
                  <div className="h-5 w-3/4 rounded bg-slate-200" />
                  <div className="h-4 w-1/2 rounded bg-slate-200" />
                  <div className="h-10 rounded-lg bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ERROR STATE */}
        {!loading && error && (
          <div className="rounded-2xl border border-rose-100 bg-rose-50 p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-100">
              <FaBoxOpen className="text-2xl text-rose-500" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              Couldn't load packages
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Something went wrong. Please try again.
            </p>
            <button
              type="button"
              onClick={fetchPackages}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              <FaRedo className="text-xs" />
              Retry
            </button>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && packages.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="text-sm text-slate-500">
              No featured packages available right now.
            </p>
          </div>
        )}

        {/* PACKAGE GRID */}
        {!loading && !error && packages.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {packages.map((pkg, index) => {
              const name = pkg.title ?? pkg.name ?? "Goa Tour Package";
              const slug = pkg.slug;
              const link = slug ? `/packages/${slug}` : "/packages";

              const image =
                pkg.coverImage ??
                pkg.image ??
                pkg.imageUrl ??
                pkg.thumbnail;

              const basePrice =
                pkg.price ?? pkg.startingPrice ?? pkg.pricePerPerson ?? null;
              const discountPrice =
                pkg.discountPrice && pkg.discountPrice > 0
                  ? pkg.discountPrice
                  : null;
              const finalPrice = discountPrice || basePrice;

              const discount =
                basePrice && discountPrice && basePrice > discountPrice
                  ? Math.round(((basePrice - discountPrice) / basePrice) * 100)
                  : 0;

              const duration = pkg.duration ?? pkg.days ?? null;
              const location = pkg.location ?? null;
              const rating = pkg.rating ?? null;

              return (
                <article
                  key={pkg._id ?? pkg.id ?? `${name}-${index}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg"
                >
                  {/* IMAGE — fixed aspect ratio, no gray gaps */}
                  <Link
                    to={link}
                    aria-label={`View ${name}`}
                    className="relative block w-full overflow-hidden bg-slate-100"
                    style={{ aspectRatio: "4 / 3" }}
                  >
                    {image ? (
                      <img
                        src={image}
                        alt={name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "https://placehold.co/600x400?text=Package";
                        }}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-slate-400">
                        No image
                      </div>
                    )}

                    {/* Gradient overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* DURATION BADGE */}
                    {duration && (
                      <span className="absolute left-2 top-2 inline-flex max-w-[calc(100%-70px)] items-center gap-1 truncate rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm sm:left-3 sm:top-3 sm:max-w-[calc(100%-90px)] sm:text-xs">
                        <FaClock className="shrink-0 text-[8px] sm:text-[10px]" />
                        <span className="truncate">{duration}</span>
                      </span>
                    )}

                    {/* DISCOUNT BADGE */}
                    {discount > 0 && (
                      <span className="absolute right-2 top-2 rounded-full bg-rose-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-md sm:right-3 sm:top-3 sm:text-xs">
                        {discount}% OFF
                      </span>
                    )}

                    {/* LOCATION OVERLAY — now truncates */}
                    {location && (
                      <span className="absolute bottom-2 left-2 right-2 inline-flex items-center gap-1 truncate rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm sm:bottom-3 sm:left-3 sm:right-auto sm:max-w-[calc(100%-24px)] sm:text-xs">
                        <FaMapMarkerAlt className="shrink-0 text-[8px] sm:text-[10px]" />
                        <span className="truncate">{location}</span>
                      </span>
                    )}
                  </Link>

                  {/* CONTENT */}
                  <div className="flex flex-1 flex-col p-3 sm:p-4">
                    {/* TITLE */}
                    <h3 className="line-clamp-2 text-sm font-bold text-slate-900 transition group-hover:text-teal-700 sm:text-base">
                      {name}
                    </h3>

                    {/* RATING */}
                    {rating > 0 && (
                      <div className="mt-1.5 flex items-center gap-1">
                        <FaStar className="text-[10px] text-amber-400 sm:text-xs" />
                        <span className="text-xs font-semibold text-slate-900">
                          {rating}
                        </span>
                        <span className="text-[10px] text-slate-500 sm:text-xs">
                          Rating
                        </span>
                      </div>
                    )}

                    {/* PRICE */}
                    <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      {finalPrice ? (
                        <>
                          <span className="text-lg font-extrabold text-teal-700 sm:text-xl">
                            {formatPrice(finalPrice)}
                          </span>
                          {discountPrice && (
                            <span className="text-xs text-slate-400 line-through sm:text-sm">
                              {formatPrice(basePrice)}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-xs font-semibold text-slate-400">
                          Custom pricing
                        </span>
                      )}
                    </div>

                    {/* CTA BUTTONS — text-white forced with ! important */}
                    <div className="mt-auto flex flex-col gap-2 pt-3">
                      <Link
                        to={link}
                        className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-teal-600 bg-white px-2 py-2 text-xs font-bold !text-teal-700 transition hover:bg-teal-50 sm:py-2.5 sm:text-sm"
                      >
                        View Details
                        <FaArrowRight className="text-[10px]" />
                      </Link>

                      <Link
                        to="/booking"
                        state={{ packageData: pkg }}
                        className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg bg-teal-600 px-2 py-2 text-xs font-bold !text-white shadow-sm transition hover:bg-teal-700 sm:py-2.5 sm:text-sm"
                      >
                        Book Now
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
        {!loading && !error && packages.length > 0 && (
          <div className="mt-10 text-center sm:mt-12">
            <Link
              to="/packages"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3.5 text-sm font-bold !text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-md sm:px-8 sm:text-base"
            >
              View All Packages
              <FaArrowRight />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedPackages;