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
        <h1 className="text-4xl font-bold text-gray-900">
          Package Not Found
        </h1>

        <p className="mt-4 text-gray-500">
          The requested package doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 pb-16">
      {/* Gallery */}
      <PackageGallery
        images={[
          packageData.coverImage,
          ...(packageData.images || []),
        ].filter(Boolean)}
      />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        
        {/* Package Info (Contains Title, Description, and Price Box) */}
        {/* I added a subtle shadow and a very light border to make the card pop */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
          <PackageInfo packageData={packageData} />

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {/* Location Box */}
            <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 transition-colors duration-200 hover:border-teal-200 hover:bg-teal-50/30">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500 sm:text-sm">
                Location
              </p>
              <p className="mt-1.5 text-sm font-semibold text-gray-900 sm:text-base">
                {packageData.location || "South Goa"}
              </p>
            </div>

            {/* Duration Box - Fixed the N/A fallback */}
            <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 transition-colors duration-200 hover:border-teal-200 hover:bg-teal-50/30">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500 sm:text-sm">
                Duration
              </p>
              <p className="mt-1.5 text-sm font-semibold text-gray-900 sm:text-base">
                {packageData.duration || "Full Day (6-8 Hours)"}
              </p>
            </div>

            {/* Category Box */}
            <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 transition-colors duration-200 hover:border-teal-200 hover:bg-teal-50/30">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500 sm:text-sm">
                Category
              </p>
              <p className="mt-1.5 text-sm font-semibold text-gray-900 sm:text-base">
                {packageData.category || "Tour"}
              </p>
            </div>

            {/* Rating Box */}
            <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 transition-colors duration-200 hover:border-teal-200 hover:bg-teal-50/30">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500 sm:text-sm">
                Rating
              </p>
              <p className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-gray-900 sm:text-base">
                <span className="text-yellow-500">★</span>
                {packageData.rating || "4.8"}
              </p>
            </div>
          </div>
        </div>

        {/* Map Section */}
        {packageData.latitude && packageData.longitude && (
          <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:mt-10 sm:p-8 lg:mt-12">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-900 sm:text-2xl">
              <span className="text-teal-600">📍</span> Tour Location
            </h2>

            <PackageMap
              latitude={packageData.latitude}
              longitude={packageData.longitude}
              address={packageData.location}
            />
          </div>
        )}

        {/* Related Packages */}
        <section className="mt-12 sm:mt-16 lg:mt-20">
          <RelatedPackages packageId={packageData._id} />
        </section>
      </div>
    </section>
  );
};

export default PackageDetails;