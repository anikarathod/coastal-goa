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
    <section className="bg-white">

      {/* Package Gallery */}
      <PackageGallery
  images={[
    packageData.coverImage,
    ...(packageData.images || []),
  ]}
/>

      <div className="mx-auto max-w-7xl px-6 py-16">

        {/* Package Information */}
        <PackageInfo packageData={packageData} />

        {/* Package Map */}
        {(packageData.latitude || packageData.longitude) && (
          <div className="mt-16">
            <PackageMap
              latitude={packageData.latitude}
              longitude={packageData.longitude}
              address={packageData.location}
            />
          </div>
        )}

        {/* Related Packages */}
        <section className="mt-20">
          <RelatedPackages
            packageId={packageData._id}
          />
        </section>

      </div>
    </section>
  );
};

export default PackageDetails;