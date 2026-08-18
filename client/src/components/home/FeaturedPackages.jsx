import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import axios from "axios";
import Loader from "../common/Loader";

const FeaturedPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

 const fetchPackages = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/packages"
    );

    console.log("Packages:", res.data);

    const packagesData =
      res.data.packages ||
      res.data.data ||
      res.data ||
      [];

    setPackages(packagesData.slice(0, 6));
  } catch (err) {
    console.error("Error fetching packages:", err);
    setPackages([]);
  } finally {
    setLoading(false);
  }
};

  const getImageUrl = (pkg) => {
    const image =
      pkg.coverImage ||
      pkg.image ||
      pkg.photo ||
      pkg.thumbnail ||
      (pkg.images && pkg.images.length > 0
        ? pkg.images[0]
        : null);

    if (typeof image === "object" && image !== null) {
      return (
        image.url ||
        image.secure_url ||
        image.path ||
        image.src ||
        "https://placehold.co/600x400?text=Goa+Package"
      );
    }

    if (typeof image === "string" && image.trim() !== "") {
      if (
        image.startsWith("http://") ||
        image.startsWith("https://")
      ) {
        return image;
      }

      if (image.startsWith("/")) {
        return `http://localhost:5000${image}`;
      }

      return image;
    }

    return "https://placehold.co/600x400?text=Goa+Package";
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
             Popular Tour Packages
          </h2>

          <p className="mt-3 text-lg text-gray-600">
            Discover our most loved Goa experiences.
          </p>
        </div>

        {/* Packages */}
        {packages.length === 0 ? (
          <div className="py-10 text-center text-lg text-gray-500">
            No featured packages found.
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => (
              <div
                key={pkg._id}
                className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Image */}
                <div className="h-60 overflow-hidden bg-gray-200">
                  <img
                    src={getImageUrl(pkg)}
                    alt={pkg.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src =
                        "https://placehold.co/600x400?text=Goa+Package";
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {pkg.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-gray-600">
                    {pkg.description}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    {pkg.location && (
                      <span className="flex items-center gap-2 text-gray-500">
                        <FaMapMarkerAlt className="text-cyan-600" />
                        {pkg.location}
                      </span>
                    )}

                    {pkg.duration && (
                      <span className="flex items-center gap-2 text-gray-500">
                        <FaClock className="text-cyan-600" />
                        {pkg.duration}
                      </span>
                    )}
                  </div>

                  <div className="mt-6 flex items-end justify-between">
                    <div>
                      <p className="text-sm text-gray-500">
                        Starting From
                      </p>

                      <h4 className="text-3xl font-bold text-cyan-600">
                        ₹{pkg.price}
                      </h4>
                    </div>

                    <Link
                      to={`/packages/${pkg.slug || pkg._id}`}
                      className="rounded-xl bg-cyan-500 px-5 py-3 font-bold text-black shadow-md transition hover:bg-cyan-600"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="mt-14 text-center">
          <Link
            to="/packages"
            className="inline-flex items-center justify-center rounded-xl bg-cyan-500 px-10 py-4 text-lg font-bold text-black shadow-lg transition-all hover:scale-105 hover:bg-cyan-600"
          >
            View All Packages
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedPackages;