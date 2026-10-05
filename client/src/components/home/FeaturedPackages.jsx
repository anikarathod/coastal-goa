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
    <section className="bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
              Popular Tour Packages
            </h2>

            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Discover our most loved Goa experiences.
            </p>
          </div>

          <Link
            to="/packages"
            className="hidden md:block font-semibold text-cyan-600 hover:text-cyan-700"
          >
            View All →
          </Link>
        </div>

        {/* Packages */}
        {packages.length === 0 ? (
          <div className="py-16 text-center text-red-500">
            No packages found.
          </div>
        ) : (
          <>
            {/* Mobile */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:hidden">
              {packages.map((pkg) => (
                <PackageCard
                  key={pkg._id}
                  packageData={pkg}
                />
              ))}
            </div>

            {/* Desktop */}
            <div className="hidden lg:grid lg:grid-cols-4 gap-6">
              {packages.map((pkg) => (
                <PackageCard
                  key={pkg._id}
                  packageData={pkg}
                />
              ))}
            </div>
          </>
        )}

        {/* Mobile Button */}
        <div className="mt-8 text-center md:hidden">
          <Link
            to="/packages"
            className="inline-flex items-center justify-center rounded-xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-cyan-700"
          >
            View All Packages
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedPackages;