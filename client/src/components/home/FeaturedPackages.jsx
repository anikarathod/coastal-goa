import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaClock, FaStar } from "react-icons/fa";
import api from "../../services/api";

const FeaturedPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchPackages = async () => {
      try {
        const response = await api.get("/packages/featured");
        const data = response.data;

        const fetchedPackages =
          data?.packages ?? data?.data?.packages ?? data?.data ?? [];

        if (isMounted) {
          setPackages(
            Array.isArray(fetchedPackages) ? fetchedPackages.slice(0, 4) : []
          );
        }
      } catch (err) {
        console.error("Failed to load packages:", err);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPackages();

    return () => {
      isMounted = false;
    };
  }, []);

  // Format price: 1500 → ₹1,500
  const formatPrice = (price) =>
    `₹${Number(price).toLocaleString("en-IN")}`;

  return (
    <section
      id="packages"
      className="bg-slate-50 px-3 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-6 text-center sm:mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700 sm:text-sm">
            Discover Goa
          </p>

          <h2 className="mt-2 text-xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl">
            Explore Our Tour Packages
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500 sm:text-base">
            Handpicked experiences at the best prices — no hidden costs.
          </p>
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-xl bg-white"
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

        {/* Package cards */}
        {!loading && !error && packages.length > 0 && (
          <div className="grid grid-cols-2 items-stretch gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {packages.map((pkg, index) => {
              const name = pkg.title ?? pkg.name ?? "Goa Tour Package";

              const image =
                pkg.coverImage ??
                pkg.image ??
                pkg.imageUrl ??
                pkg.thumbnail;

              const price =
                pkg.price ?? pkg.startingPrice ?? pkg.pricePerPerson ?? null;

              const duration = pkg.duration ?? pkg.days ?? null;

              const packageLink = pkg.slug
                ? `/packages/${pkg.slug}`
                : "/packages";

              return (
                <article
                  key={pkg._id ?? pkg.id ?? `${name}-${index}`}
                  className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-2xl"
                >
                  {/* Image */}
                  <Link
                    to={packageLink}
                    aria-label={`View ${name}`}
                    className="relative block aspect-[4/3] overflow-hidden bg-slate-100"
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

                    {/* Duration badge on image */}
                    {duration && (
                      <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-slate-950/70 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm sm:left-3 sm:top-3 sm:text-xs">
                        <FaClock className="text-[8px] sm:text-[10px]" />
                        {duration}
                      </span>
                    )}
                  </Link>

                  {/* Name, price, buttons */}
                  <div className="flex flex-1 flex-col gap-2 p-2.5 sm:gap-3 sm:p-4">
                    <h3 className="line-clamp-2 min-h-10 text-sm font-bold leading-5 text-slate-900 sm:min-h-12 sm:text-base sm:leading-6">
                      {name}
                    </h3>

                    {/* Price row */}
                    <div className="flex min-h-6 items-center gap-1.5">
                      {price ? (
                        <>
                          <span className="text-sm font-extrabold text-teal-700 sm:text-lg">
                            {formatPrice(price)}
                          </span>
                          <span className="text-[10px] text-slate-400 sm:text-xs">
                            / person
                          </span>
                        </>
                      ) : (
                        <span className="text-[11px] font-semibold text-slate-400 sm:text-xs">
                          Custom pricing available
                        </span>
                      )}
                    </div>

                    <div className="mt-auto flex flex-col gap-2 pt-1">
                      <Link
                        to={packageLink}
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
        {!loading && (error || packages.length === 0) && (
          <p className="py-8 text-center text-sm text-slate-500">
            {error
              ? "Packages couldn't be loaded. Please try again later."
              : "No packages are available right now."}
          </p>
        )}

        {/* View all packages */}
        <div className="mt-7 text-center sm:mt-10">
          <Link
            to="/packages"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-800 sm:min-h-12 sm:px-8 sm:text-base"
          >
            View All Packages
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;