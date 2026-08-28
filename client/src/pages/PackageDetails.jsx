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
  <section className="bg-gray-50 min-h-screen">

    {/* Gallery */}
    <PackageGallery
      images={[
        packageData.coverImage,
        ...(packageData.images || []),
      ].filter(Boolean)}
    />

    <div className="mx-auto max-w-7xl px-6 py-12">

      {/* Package Info */}
      <div className="rounded-2xl bg-white p-8 shadow-sm">

        <PackageInfo packageData={packageData} />

        {/* Quick Stats */}
        <div className="mt-8 grid gap-4 md:grid-cols-4">

          <div className="rounded-xl border p-4">
            <p className="text-sm text-gray-500">
              Location
            </p>
            <p className="font-semibold">
              {packageData.location || "N/A"}
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <p className="text-sm text-gray-500">
              Duration
            </p>
            <p className="font-semibold">
              {packageData.duration || "N/A"}
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <p className="text-sm text-gray-500">
              Category
            </p>
            <p className="font-semibold">
              {packageData.category || "N/A"}
            </p>
          </div>

          <div className="rounded-xl border p-4">
            <p className="text-sm text-gray-500">
              Rating
            </p>
            <p className="font-semibold">
              ⭐ {packageData.rating || "4.8"}
            </p>
          </div>

        </div>

      </div>

      {/* Highlights */}
      {packageData.highlights?.length > 0 && (
        <div className="mt-12 rounded-2xl bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-2xl font-bold">
            Highlights
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

            {packageData.highlights.map((item, index) => (
              <div
                key={index}
                className="rounded-xl border p-4"
              >
                ✓ {item}
              </div>
            ))}

          </div>

        </div>
      )}

      {/* Inclusions & Exclusions */}
      <div className="mt-12 grid gap-8 md:grid-cols-2">

        <div className="rounded-2xl bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-2xl font-bold text-green-600">
            What's Included
          </h2>

          {(packageData.inclusions || []).map((item, index) => (
            <p key={index} className="mb-3">
              ✓ {item}
            </p>
          ))}

        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm">

          <h2 className="mb-6 text-2xl font-bold text-red-600">
            What's Excluded
          </h2>

          {(packageData.exclusions || []).map((item, index) => (
            <p key={index} className="mb-3">
              ✗ {item}
            </p>
          ))}

        </div>

      </div>

      {/* Map */}
      {packageData.latitude &&
        packageData.longitude && (
          <div className="mt-12 rounded-2xl bg-white p-8 shadow-sm">

            <h2 className="mb-6 text-2xl font-bold">
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
      <section className="mt-16">
        <RelatedPackages
          packageId={packageData._id}
        />
      </section>

    </div>

  </section>
);
};

export default PackageDetails;