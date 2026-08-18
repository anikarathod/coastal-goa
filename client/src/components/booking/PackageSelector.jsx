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
    <div className="space-y-3">

      {packages.map((pkg) => {

        const selected =
          selectedPackages.some(
            (item) => item._id === pkg._id
          );

        return (
          <div
            key={pkg._id}
            className={`flex items-center justify-between rounded-xl border p-3 transition

            ${
              selected
                ? "border-green-500 bg-green-50"
                : "border-gray-200 bg-white"
            }`}
          >

            {/* Left Side */}

            <div className="flex items-center gap-4">

              <img
                src={
                  pkg.coverImage ||
                  pkg.image ||
                  "https://placehold.co/100x100?text=Goa"
                }
                alt={pkg.title}
                className="h-16 w-16 rounded-lg object-cover"
              />

              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {pkg.title}
                </h3>
              </div>

            </div>

            {/* Button */}

            <button
              type="button"
              onClick={() =>
                handleToggle(pkg)
              }
              className={`rounded-full px-5 py-2 text-sm font-semibold transition

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