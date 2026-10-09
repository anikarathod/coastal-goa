import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import api from "../../services/api";

const FeaturedPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await api.get("/packages/featured");
        const data = response.data;

        const fetchedPackages =
          data?.packages ??
          data?.data?.packages ??
          data?.data ??
          [];

        setPackages(
          Array.isArray(fetchedPackages)
            ? fetchedPackages.slice(0, 4)
            : []
        );
      } catch (error) {
        console.error("Failed to load featured packages:", error);
        setPackages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return (
    <section
      id="packages"
      className="bg-slate-50 px-5 py-16 sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-600">
            Discover Goa
          </p>

          <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Explore Our Tour Packages
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Discover our sightseeing tours, cruises, water sports and
            unforgettable Goa experiences.
          </p>
        </div>

        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-sm"
              >
                <div className="h-48 bg-slate-200" />
                <div className="space-y-3 p-5">
                  <div className="h-5 w-3/4 rounded bg-slate-200" />
                  <div className="h-4 w-full rounded bg-slate-200" />
                  <div className="h-5 w-1/3 rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && packages.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {packages.map((pkg, index) => {
              const name =
                pkg.name ?? pkg.title ?? "Goa Tour Package";

              const image =
                pkg.image ??
                pkg.imageUrl ??
                pkg.coverImage ??
                pkg.thumbnail;

              const price = pkg.price ?? pkg.offerPrice;

              return (
                <article
                  key={pkg._id ?? pkg.id ?? `${name}-${index}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-200">
                    {image ? (
                      <img
                        src={image}
                        alt={name}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-slate-500">
                        Package image unavailable
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-bold text-slate-900">
                      {name}
                    </h3>

                    {pkg.description && (
                      <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                        {pkg.description}
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
                        to="/packages"
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

        {!loading && packages.length === 0 && (
          <p className="py-8 text-center text-slate-500">
            No packages are available right now. Please check back soon.
          </p>
        )}

        <div className="mt-10 text-center">
          <Link
            to="/packages"
            className="inline-flex items-center justify-center gap-3 rounded-xl bg-cyan-600 px-8 py-4 font-bold text-white shadow-md transition hover:bg-cyan-700"
          >
            View More Packages
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;