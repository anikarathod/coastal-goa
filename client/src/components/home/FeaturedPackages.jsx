import { useEffect, useState } from "react";
import api from "../../services/api";

const FeaturedPackages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await api.get("/packages/featured");
        const data = response.data;

        setPackages(
          data?.packages ?? data?.data?.packages ?? []
        );
      } catch (error) {
        console.error("Failed to load featured packages:", error);
      }
    };

    fetchPackages();
  }, []);

  return (
    <section id="packages" className="bg-white px-5 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-cyan-600">
            Discover Goa
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Featured Packages
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Explore our tours, cruises and adventures to find your perfect Goa experience.
          </p>
        </div>

        {packages.length === 0 ? (
          <p className="text-center text-slate-500">
            Packages will be available soon.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <article
                key={pkg._id ?? pkg.id ?? pkg.name}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {pkg.image && (
                  <img
                    src={pkg.image}
                    alt={pkg.name ?? "Goa tour package"}
                    className="h-52 w-full object-cover"
                  />
                )}

                <div className="p-5">
                  <h3 className="text-xl font-bold text-slate-900">
                    {pkg.name ?? pkg.title}
                  </h3>

                  {pkg.description && (
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {pkg.description}
                    </p>
                  )}

                  {pkg.price != null && (
                    <p className="mt-4 text-lg font-bold text-cyan-700">
                      ₹{pkg.price}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedPackages;