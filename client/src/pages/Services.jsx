import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  FaSlidersH,
  FaChevronDown,
  FaChevronUp,
  FaTimes,
  FaSearch,
  FaUndo,
  FaTools,
} from "react-icons/fa";

import api from "../services/api";

import Loader from "../components/common/Loader";
import Pagination from "../components/common/Pagination";
import ServiceGrid from "../components/services/ServiceGrid";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [filters, setFilters] = useState({
    category: "",
    location: "",
    sort: "latest",
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    totalPages: 1,
    totalItems: 0,
  });

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPagination((prev) => ({ ...prev, page: 1 }));
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch on filter/search/page change
  useEffect(() => {
    fetchServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filters, pagination.page]);

  // Scroll to top on page change
  useEffect(() => {
    if (pagination.page > 1) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pagination.page]);

  const fetchServices = async () => {
    try {
      setLoading(true);

      const res = await api.get("/services", {
        params: {
          page: pagination.page,
          limit: pagination.limit,
          search,
          ...filters,
        },
      });

      setServices(res.data?.services || []);

      setPagination((prev) => ({
        ...prev,
        totalPages: res.data?.totalPages || 1,
        totalItems: res.data?.totalItems || 0,
      }));
    } catch (err) {
      console.error("Error fetching services:", err);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  // Update a single filter + reset to page 1
  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const resetFilters = useCallback(() => {
    setSearchInput("");
    setSearch("");
    setFilters({
      category: "",
      location: "",
      sort: "latest",
    });
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  const activeFiltersCount = [
    search,
    filters.category,
    filters.location,
    filters.sort !== "latest" ? filters.sort : "",
  ].filter(Boolean).length;

  const hasActiveFilters = activeFiltersCount > 0;

  return (
    <section className="min-h-screen bg-gray-50 py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* HEADING */}
        <div className="mb-6 text-center sm:mb-10">
          <span className="inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-700">
            Our Services
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Everything You Need for Goa
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 sm:text-base">
            Handpicked services for an unforgettable Goa trip.
          </p>
        </div>

        {/* SEARCH + FILTER TOOLBAR */}
        <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm sm:p-4">

          {/* SEARCH ROW */}
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

            {/* SEARCH */}
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-12 pr-10 text-sm shadow-sm transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100 sm:text-base"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => setSearchInput("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                >
                  <FaTimes className="text-xs" />
                </button>
              )}
            </div>

            {/* SORT (desktop) */}
            <div className="hidden lg:block">
              <select
                value={filters.sort}
                onChange={(e) => updateFilter("sort", e.target.value)}
                className="rounded-xl border border-gray-200 bg-white py-3.5 pl-4 pr-10 text-sm font-medium text-gray-700 shadow-sm transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
              >
                <option value="latest">Sort: Latest</option>
                <option value="priceLow">Price: Low → High</option>
                <option value="priceHigh">Price: High → Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {/* MOBILE FILTER TOGGLE */}
            <button
              type="button"
              onClick={() => setFiltersOpen((prev) => !prev)}
              aria-expanded={filtersOpen}
              aria-controls="service-filters"
              className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3.5 shadow-sm transition hover:border-teal-500 lg:hidden"
            >
              <span className="flex items-center gap-3">
                <FaSlidersH className="text-teal-700" />
                <span className="font-semibold text-gray-900">
                  Filters & Sort
                </span>
                {activeFiltersCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-600 px-1.5 text-xs font-bold text-white">
                    {activeFiltersCount}
                  </span>
                )}
              </span>
              {filtersOpen ? (
                <FaChevronUp className="text-gray-500" />
              ) : (
                <FaChevronDown className="text-gray-500" />
              )}
            </button>
          </div>

          {/* FILTER PANEL */}
          <div
            id="service-filters"
            className={`mt-3 border-t border-gray-100 pt-4 lg:block ${
              filtersOpen ? "block" : "hidden"
            }`}
          >
            <div className="grid gap-3 md:grid-cols-3">

              {/* CATEGORY */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => updateFilter("category", e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                >
                  <option value="">All Categories</option>
                  <option value="Transport">Transport</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Accommodation">Accommodation</option>
                  <option value="Cruise">Cruise</option>
                  <option value="Rental">Rental</option>
                </select>
              </div>

              {/* LOCATION */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Location
                </label>
                <select
                  value={filters.location}
                  onChange={(e) => updateFilter("location", e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                >
                  <option value="">All Locations</option>
                  <option value="North Goa">North Goa</option>
                  <option value="South Goa">South Goa</option>
                  <option value="Panjim">Panjim</option>
                  <option value="Calangute">Calangute</option>
                </select>
              </div>

              {/* MOBILE SORT (desktop shows at top) */}
              <div className="lg:hidden">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Sort By
                </label>
                <select
                  value={filters.sort}
                  onChange={(e) => updateFilter("sort", e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                >
                  <option value="latest">Newest</option>
                  <option value="priceLow">Price: Low → High</option>
                  <option value="priceHigh">Price: High → Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              {/* RESET BUTTON */}
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={resetFilters}
                  disabled={!hasActiveFilters}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
                >
                  <FaUndo className="text-xs" />
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS HEADER */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-bold text-gray-900 sm:text-xl">
            {loading ? (
              <span className="text-gray-400">Loading services...</span>
            ) : (
              <>
                {pagination.totalItems}{" "}
                {pagination.totalItems === 1 ? "Service" : "Services"} Found
              </>
            )}
          </h2>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700 transition hover:bg-teal-100 sm:text-sm"
            >
              <FaTimes className="text-[10px]" />
              Clear all ({activeFiltersCount})
            </button>
          )}
        </div>

        {/* SERVICES GRID / LOADING / EMPTY */}
        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-2xl border border-gray-100 bg-white"
              >
                <div className="h-52 bg-gray-200" />
                <div className="space-y-3 p-5">
                  <div className="h-5 w-3/4 rounded bg-gray-200" />
                  <div className="h-4 w-1/2 rounded bg-gray-200" />
                  <div className="h-10 w-full rounded-lg bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        ) : services.length > 0 ? (
          <ServiceGrid services={services} />
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white px-4 py-12 text-center sm:py-16">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-50">
              <FaTools className="text-2xl text-teal-700" />
            </div>

            <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
              No services match your search
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
              Try adjusting your filters or searching for something else.
              We offer lots of services to make your Goa trip unforgettable!
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-teal-700"
            >
              <FaTimes /> Clear All Filters
            </button>
          </div>
        )}

        {/* PAGINATION */}
        {!loading && pagination.totalPages > 1 && (
          <div className="mt-10 flex justify-center sm:mt-14">
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={(page) =>
                setPagination((prev) => ({ ...prev, page }))
              }
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;