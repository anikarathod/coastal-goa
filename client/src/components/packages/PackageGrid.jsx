import PackageCard from "./PackageCard";
import Loader from "../common/Loader";

const PackageGrid = ({
  packages = [],
  loading = false,
  emptyMessage = "No packages found.",
}) => {
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader />
      </div>
    );
  }

  if (!packages.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <img
          src="/images/no-data.svg"
          alt="No Packages"
          className="w-52 mb-6"
        />

        <h2 className="text-2xl font-bold text-gray-700">
          {emptyMessage}
        </h2>

        <p className="mt-2 text-gray-500">
          Please try changing your filters or search.
        </p>
      </div>
    );
  }

  return (
    <section className="py-10">

      {/* Package Count */}
      <div className="mb-8 flex items-center justify-between">

        <h2 className="text-3xl font-bold text-gray-900">
          Tour Packages
        </h2>

        <p className="text-gray-600">
          {packages.length} Package{packages.length !== 1 && "s"} Found
        </p>

      </div>

      {/* Grid */}

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        {packages.map((pkg) => (
          <PackageCard
            key={pkg._id}
            packageData={pkg}
          />
        ))}

      </div>

    </section>
  );
};

export default PackageGrid;