import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";
import Loader from "../common/Loader";
import PackageCard from "../packages/PackageCard";

const FeaturedPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);

      const res = await api.get("/packages");

      const packagesData =
        res.data?.packages ||
        res.data?.data ||
        [];

      setPackages(packagesData.slice(0, 8));
    } catch (err) {
      console.error("Error fetching packages:", err);
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader />
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-10 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-10 text-center">

          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
            Popular Tour Packages
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 sm:text-base">
            Discover our most loved Goa experiences and create unforgettable memories.
          </p>

        </div>

        {/* Packages Grid */}
        {packages.length === 0 ? (
          <div className="py-16 text-center text-red-500">
            No packages found.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg._id}
                packageData={pkg}
              />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="mt-10 text-center">
          <Link
            to="/packages"
            className="inline-flex items-center justify-center rounded-xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-cyan-700 hover:shadow-xl"
          >
            View All Packages
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedPackages;