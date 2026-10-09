
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
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
          data?.packages ??
          data?.data?.packages ??
          data?.data ??
          [];

        if (isMounted) {
          setPackages(
            Array.isArray(fetchedPackages)
              ? fetchedPackages.slice(0, 4)
              : []
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

  return (
    <section
      id="packages"
      className="bg-slate-50 px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
            <FaMapMarkerAlt />
            Discover Goa
          </span>

          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Explore Our Tour Packages
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
            From beautiful beaches to breathtaking waterfalls,
            discover Goa with experiences designed for you.
          </p>

          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-teal-600" />
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <div className="aspect-[16/10] bg-slate-200" />
                <div className="space-y-4 p-5">
                  <div className="h-5 w-3/4 rounded bg-slate-200" />
                  <div className="h-4 rounded bg-slate-200" />
                  <div className="h-4 w-2/3 rounded bg-slate-200" />
                  <div className="h-10 rounded-lg bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Package cards */}
        {!loading && !error && packages.length > 0 && (
          <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5 xl:gap-6">
            {packages.map((pkg, index) => {
              const name =
                pkg.title ?? pkg.name ?? "Goa Tour Package";

              const image =
                pkg.coverImage ??
                pkg.image ??
                pkg.imageUrl ??
                pkg.thumbnail;

              const originalPrice = Number(pkg.price);
              const discountedPrice = Number(pkg.discountPrice);

              const hasDiscount =
                Number.isFinite(originalPrice) &&
                Number.isFinite(discountedPrice) &&
                originalPrice > 0 &&
                discountedPrice > 0 &&
                discountedPrice < originalPrice;

              const price = hasDiscount
                ? discountedPrice
                : pkg.price ?? pkg.offerPrice;

              const description =
                pkg.description ??
                pkg.shortDescription ??
                "Discover an unforgettable Goa experience with Coastal Goa Tours.";

              const packageLink = pkg.slug
                ? `/packages/${pkg.slug}`
                : "/packages";

              return (
                <article
                  key={pkg._id ?? pkg.id ?? `${name}-${index}`}
                  className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_3px_12px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-[0_14px_35px_rgba(15,23,42,0.12)]"
                >
                  {/* Image */}
                  <Link
                    to={packageLink}
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
                  <div className="flex flex-1 flex-col p-5 sm:p-5">
                    <h3 className="line-clamp-2 min-h-[3.5rem] text-lg font-bold leading-7 text-slate-900 transition-colors group-hover:text-teal-700">
                      {name}
                    </h3>

                    <p className="mt-2 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-slate-600">
                      {description}
                    </p>

                    {/* Price */}
                    <div className="mt-auto border-t border-slate-100 pt-4">
                      <div className="min-h-[3.25rem]">
                        {price != null &&
                        Number.isFinite(Number(price)) ? (
                          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                            <span className="text-2xl font-extrabold tracking-tight text-teal-700">
                              ₹{Number(price).toLocaleString("en-IN")}
                            </span>

                            {hasDiscount && (
                              <span className="text-sm text-slate-400 line-through">
                                ₹{originalPrice.toLocaleString("en-IN")}
                              </span>
                            )}

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

                      {/* Details button */}
                      <Link
                        to={packageLink}
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

        {/* Empty and error states */}
        {!loading && (error || packages.length === 0) && (
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-10 text-center">
            <h3 className="text-lg font-bold text-slate-900">
              {error
                ? "Packages couldn't be loaded"
                : "New experiences are coming soon"}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
              {error
                ? "Please try again later or explore our available tours."
                : "We're preparing more amazing Goa experiences for you."}
            </p>

            <Link
              to="/packages"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-800"
            >
              Explore Packages <FaArrowRight />
            </Link>
          </div>
        )}

        {/* View more */}
        <div className="mt-9 text-center sm:mt-12">
          <Link
            to="/packages"
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-teal-700 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-teal-900/10 transition hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:px-8 sm:text-base"
          >
            View More Packages
            <FaArrowRight />
          </Link>

          <p className="mt-3 text-xs text-slate-500">
            Find the perfect Goa experience for your trip
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;
