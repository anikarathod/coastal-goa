import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Loader from "../common/Loader";
import PackageCard from "./PackageCard";

const RelatedPackages = ({ packageId }) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, [packageId]);

  const fetchPackages = async () => {
    try {
      const res = await api.get("/packages");

      const allPackages =
        res.data.packages || res.data || [];

      const filteredPackages = allPackages
        .filter((pkg) => pkg._id !== packageId)
        .slice(0, 3);

      setPackages(filteredPackages);
    } catch (error) {
      console.error(
        "Failed to fetch related packages",
        error
      );
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  if (!packages.length) return null;

  return (
    <section className="py-20">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold">
            Related Packages
          </h2>

          <p className="mt-2 text-gray-600">
            You might also like these Goa experiences.
          </p>
        </div>

        <Link
          to="/packages"
          className="hidden rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700 md:block"
        >
          View All
        </Link>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <PackageCard
            key={pkg._id}
            packageData={pkg}
          />
        ))}
      </div>

      <div className="mt-10 text-center md:hidden">
        <Link
          to="/packages"
          className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700"
        >
          View All Packages
        </Link>
      </div>
    </section>
  );
};

export default RelatedPackages;