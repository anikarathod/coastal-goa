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

      console.log("Packages Response:", res.data);

      const packagesData =
        res.data?.packages ||
        res.data?.data ||
        [];

      console.log("Packages Array:", packagesData);

      setPackages(packagesData.slice(0, 10));
    } catch (err) {
      console.error("Error fetching packages:", err);
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader />
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4">

        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Popular Tour Packages
          </h2>

          <p className="mt-2 text-gray-600">
            Discover our most loved Goa experiences.
          </p>
        </div>

        {/* Packages */}
        {packages.length === 0 ? (
          <div className="py-10 text-center text-red-500">
            No packages found.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg._id}
                packageData={pkg}
              />
            ))}
          </div>
        )}

        {/* View All */}
        <div className="mt-8 text-center">
          <Link
            to="/packages"
            className="inline-flex items-center rounded-lg bg-cyan-600 px-5 py-2 text-sm font-semibold text-white hover:bg-cyan-700"
          >
            View All Packages
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedPackages;