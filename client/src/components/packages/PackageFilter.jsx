import { FaFilter } from "react-icons/fa";

const PackageFilter = ({
  filters,
  onChange,
  onReset,
  locations = [],
  categories = [],
}) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">

      {/* Heading */}
      <div className="mb-6 flex items-center gap-3">
        <FaFilter className="text-cyan-600 text-xl" />
        <h2 className="text-2xl font-bold">
          Filters
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">

        {/* Location */}
        <div>
          <label className="mb-2 block font-semibold">
            Location
          </label>

          <select
            name="location"
            value={filters.location}
            onChange={onChange}
            className="w-full rounded-lg border p-3 focus:border-cyan-500 focus:outline-none"
          >
            <option value="">All Locations</option>

            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}

          </select>
        </div>

        {/* Category */}
        <div>

          <label className="mb-2 block font-semibold">
            Category
          </label>

          <select
            name="category"
            value={filters.category}
            onChange={onChange}
            className="w-full rounded-lg border p-3 focus:border-cyan-500 focus:outline-none"
          >
            <option value="">All Categories</option>

            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}

          </select>

        </div>

        {/* Duration */}
        <div>

          <label className="mb-2 block font-semibold">
            Duration
          </label>

          <select
            name="duration"
            value={filters.duration}
            onChange={onChange}
            className="w-full rounded-lg border p-3 focus:border-cyan-500 focus:outline-none"
          >
            <option value="">Any</option>
            <option value="Half Day">Half Day</option>
            <option value="Full Day">Full Day</option>
            <option value="2 Days">2 Days</option>
            <option value="3 Days">3 Days</option>
          </select>

        </div>

        {/* Price */}
        <div>

          <label className="mb-2 block font-semibold">
            Max Price
          </label>

          <input
            type="number"
            name="price"
            value={filters.price}
            onChange={onChange}
            placeholder="₹5000"
            className="w-full rounded-lg border p-3 focus:border-cyan-500 focus:outline-none"
          />

        </div>

        {/* Sort */}
        <div>

          <label className="mb-2 block font-semibold">
            Sort By
          </label>

          <select
            name="sort"
            value={filters.sort}
            onChange={onChange}
            className="w-full rounded-lg border p-3 focus:border-cyan-500 focus:outline-none"
          >
            <option value="">Default</option>
            <option value="priceLow">
              Price: Low to High
            </option>
            <option value="priceHigh">
              Price: High to Low
            </option>
            <option value="rating">
              Highest Rated
            </option>
            <option value="newest">
              Newest
            </option>
          </select>

        </div>

      </div>

      {/* Buttons */}

      <div className="mt-8 flex flex-wrap gap-4">

        <button
          onClick={onReset}
          className="rounded-lg border border-gray-300 px-6 py-3 font-semibold transition hover:bg-gray-100"
        >
          Reset Filters
        </button>

      </div>

    </div>
  );
};

export default PackageFilter;