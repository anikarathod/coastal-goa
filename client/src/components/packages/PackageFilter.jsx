import { FaFilter, FaUndo } from "react-icons/fa";

const PackageFilter = ({ filters, setFilters, onReset }) => {
  const handleChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">

      {/* Heading */}
      <div className="mb-6 flex items-center gap-3">
        <FaFilter className="text-teal-600 text-xl" />
        <h2 className="text-2xl font-bold text-gray-900">
          Filters
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">

        {/* LOCATION */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Location
          </label>
          <select
            name="location"
            value={filters.location}
            onChange={(e) => handleChange("location", e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white p-3 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
          >
            <option value="">All Locations</option>
            <option value="North Goa">North Goa</option>
            <option value="South Goa">South Goa</option>
            <option value="Panjim">Panjim</option>
            <option value="Calangute">Calangute</option>
            <option value="Candolim">Candolim</option>
            <option value="Baga">Baga</option>
          </select>
        </div>

        {/* CATEGORY */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={filters.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white p-3 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
          >
            <option value="">All Categories</option>
            <option value="Tour">Tour</option>
            <option value="Cruise">Cruise</option>
            <option value="Adventure">Adventure</option>
            <option value="Sightseeing">Sightseeing</option>
            <option value="Water Sports">Water Sports</option>
          </select>
        </div>

        {/* DURATION */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Duration
          </label>
          <select
            name="duration"
            value={filters.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white p-3 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
          >
            <option value="">Any</option>
            <option value="Half Day">Half Day</option>
            <option value="Full Day">Full Day</option>
            <option value="2 Days">2 Days</option>
            <option value="3 Days">3 Days</option>
          </select>
        </div>

        {/* MAX PRICE */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Max Price (₹)
          </label>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={(e) => handleChange("maxPrice", e.target.value)}
            placeholder="5000"
            min="0"
            className="w-full rounded-lg border border-gray-200 bg-white p-3 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
          />
        </div>

        {/* SORT */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Sort By
          </label>
          <select
            name="sort"
            value={filters.sort}
            onChange={(e) => handleChange("sort", e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white p-3 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
          >
            <option value="latest">Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

      </div>

      {/* BUTTONS */}
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          <FaUndo className="text-xs" />
          Reset Filters
        </button>
      </div>

    </div>
  );
};

export default PackageFilter;