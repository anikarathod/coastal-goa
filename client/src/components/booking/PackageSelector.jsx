const PackageSelector = ({
  packages = [],
  selectedPackages = [],
  onChange,
}) => {
  const handleToggle = (pkg) => {
    const exists = selectedPackages.some(
      (item) => item._id === pkg._id
    );

    if (exists) {
      onChange(
        selectedPackages.filter(
          (item) => item._id !== pkg._id
        )
      );
    } else {
      onChange([
        ...selectedPackages,
        pkg,
      ]);
    }
  };

  return (
    <div className="space-y-4">

      {packages.map((pkg) => {

        const selected =
          selectedPackages.some(
            (item) => item._id === pkg._id
          );

        return (
          <div
            key={pkg._id}
            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border p-4 transition

            ${
              selected
                ? "border-green-500 bg-green-50"
                : "border-gray-200 bg-white"
            }`}
          >

            {/* Left Side */}

            <div className="flex items-center gap-3 md:gap-4">

              <img
                src={
                  pkg.coverImage ||
                  pkg.image ||
                  "https://placehold.co/100x100?text=Goa"
                }
                alt={pkg.title}
                className="h-14 w-14 md:h-16 md:w-16 rounded-lg object-cover flex-shrink-0"
              />

              <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-800">
                  {pkg.title}
                </h3>

                {pkg.price && (
                  <p className="text-sm text-cyan-600 font-medium">
                    ₹{pkg.price}
                  </p>
                )}
              </div>

            </div>

            {/* Button */}

            <button
              type="button"
              onClick={() =>
                handleToggle(pkg)
              }
              className={`w-full sm:w-auto rounded-full px-4 md:px-5 py-2 text-sm font-semibold transition

              ${
                selected
                  ? "bg-green-600 text-white"
                  : "border border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white"
              }`}
            >
              {selected
                ? "Selected"
                : "Select"}
            </button>

          </div>
        );
      })}

    </div>
  );
};

export default PackageSelector;