import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";

import Loader from "../components/common/Loader";

import PackageGallery from "../components/packages/PackageGallery";
import PackageInfo from "../components/packages/PackageInfo";
import PackageMap from "../components/packages/PackageMap";
import RelatedPackages from "../components/packages/RelatedPackages";

const PackageDetails = () => {
  const { slug } = useParams();

  const [loading, setLoading] = useState(true);
  const [packageData, setPackageData] = useState(null);

  useEffect(() => {
    fetchPackage();
  }, [slug]);

  const fetchPackage = async () => {
    try {
      setLoading(true);

      const packageRes = await api.get(`/packages/${slug}`);

      console.log("Package:", packageRes.data);

      setPackageData(packageRes.data.package);
    } catch (error) {
      console.error(error);
      setPackageData(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader />
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-4xl font-bold">
          Package Not Found
        </h1>

        <p className="mt-4 text-gray-500">
          The requested package doesn't exist.
        </p>
      </div>
    );
  }

 return (
  <section className="min-h-screen bg-gray-50">

    {/* Gallery */}
    <PackageGallery
      images={[
        packageData.coverImage,
        ...(packageData.images || []),
      ].filter(Boolean)}
    />

    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">

      {/* Package Info */}
      <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-6 lg:p-8">

        <PackageInfo packageData={packageData} />

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">

          <div className="rounded-xl border p-3 sm:p-4">
            <p className="text-xs text-gray-500 sm:text-sm">
              Location
            </p>

            <p className="mt-1 text-sm font-semibold sm:text-base">
              {packageData.location || "N/A"}
            </p>
          </div>

          <div className="rounded-xl border p-3 sm:p-4">
            <p className="text-xs text-gray-500 sm:text-sm">
              Duration
            </p>

            <p className="mt-1 text-sm font-semibold sm:text-base">
              {packageData.duration || "N/A"}
            </p>
          </div>

          <div className="rounded-xl border p-3 sm:p-4">
            <p className="text-xs text-gray-500 sm:text-sm">
              Category
            </p>

            <p className="mt-1 text-sm font-semibold sm:text-base">
              {packageData.category || "N/A"}
            </p>
          </div>

          <div className="rounded-xl border p-3 sm:p-4">
            <p className="text-xs text-gray-500 sm:text-sm">
              Rating
            </p>

            <p className="mt-1 text-sm font-semibold sm:text-base">
              ⭐ {packageData.rating || "4.8"}
            </p>
          </div>

        </div>

      </div>

      {/* Map */}
      {packageData.latitude && packageData.longitude && (
        <div className="mt-8 rounded-2xl bg-white p-4 shadow-sm sm:mt-10 sm:p-6 lg:mt-12 lg:p-8">

          <h2 className="mb-4 text-xl font-bold sm:mb-6 sm:text-2xl">
            Location
          </h2>

          <PackageMap
            latitude={packageData.latitude}
            longitude={packageData.longitude}
            address={packageData.location}
          />

        </div>
      )}

         {/* Related Packages */}
      <section className="mt-10 sm:mt-12 lg:mt-16">
        <RelatedPackages
          packageId={packageData._id}
        />
      </section>

    </div>

  </section>
);
};

export default PackageDetails;