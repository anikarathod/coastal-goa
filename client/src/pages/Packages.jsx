import { useEffect, useState, useCallback } from "react";
import {
  FaSlidersH,
  FaChevronDown,
  FaChevronUp,
  FaTimes,
  FaSearch,
} from "react-icons/fa";

import api from "../services/api";

import Loader from "../components/common/Loader";
import Pagination from "../components/common/Pagination";
import PackageGrid from "../components/packages/PackageGrid";
import PackageFilter from "../components/packages/PackageFilter";
import PackageSearch from "../components/packages/PackageSearch";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(""); // live input
  const [search, setSearch] = useState(""); // debounced search value
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [filters, setFilters] = useState({
    category: "",
    location: "",
    duration: "",
    minPrice: "",
    maxPrice: "",
    sort: "latest",
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    totalPages: 1,
    totalItems: 0,
  });

  // ---- DEBOUNCE SEARCH (wait 500ms after typing stops) ----
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPagination((prev) => ({ ...prev, page: 1 }));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // ---- FETCH PACKAGES ----
  useEffect(() => {
    fetchPackages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filters, pagination.page]);

  // ---- SCROLL TO TOP ON PAGE CHANGE ----
  useEffect(() => {
    if (pagination.page > 1) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pagination.page]);

  const fetchPackages = async () => {
    try {
      setLoading(true);

      const res = await api.get("/packages", {
        params: {
          page: pagination.page,
          limit: pagination.limit,
          search,
          ...filters,
        },
      });

      setPackages(res.data?.packages || []);

      setPagination((prev) => ({
        ...prev,
        totalPages: res.data?.totalPages || 1,
        totalItems: res.data?.totalItems || 0,
      }));
    } catch (err) {
      console.error("Error fetching packages:", err);
      setPackages([]);

      setPagination((prev) => ({
        ...prev,
        totalPages: 1,
        totalItems: 0,
      }));
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = useCallback(() => {
    setSearchInput("");
    setSearch("");

    setFilters({
      category: "",
      location: "",
      duration: "",
      minPrice: "",
      maxPrice: "",
      sort: "latest",
    });

    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  }, []);

  // Counts search + filters + sort
  const activeFiltersCount = [
    search,
    filters.category,
    filters.location,
    filters.duration,
    filters.minPrice,
    filters.maxPrice,
    filters.sort !== "latest" ? filters.sort : "",
  ].filter(Boolean).length;

  const hasActiveFilters = activeFiltersCount > 0;

  return (
    <section className="min-h-screen bg-gray-50 py-6 sm:py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">

        {/* PAGE HEADING */}
        <div className="mb-6 text-center sm:mb-10">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Goa Tour Packages
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-600 sm:mt-3 sm:text-base">
            Handpicked experiences at the best prices — no hidden costs.
          </p>
        </div>

        {/* SEARCH + FILTER TOOLBAR */}
        <div className="mb-5 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm sm:p-4">

          {/* SEARCH ROW */}
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

            {/* SEARCH INPUT */}
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search packages by name or location..."
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

            {/* SORT DROPDOWN (desktop always visible) */}
            <div className="hidden lg:block">
              <select
                value={filters.sort}
                onChange={(e) => {
                  setFilters((prev) => ({ ...prev, sort: e.target.value }));
                  setPagination((prev) => ({ ...prev, page: 1 }));
                }}
                className="rounded-xl border border-gray-200 bg-white py-3.5 pl-4 pr-10 text-sm font-medium text-gray-700 shadow-sm transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
              >
                <option value="latest">Sort: Latest</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="rating">Top Rated</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            {/* MOBILE FILTER TOGGLE */}
            <button
              type="button"
              onClick={() => setFiltersOpen((prev) => !prev)}
              aria-expanded={filtersOpen}
              aria-controls="package-filters"
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

          {/* FILTER PANEL (Mobile: Collapsible | Desktop: Always visible below search) */}
          <div
            id="package-filters"
            className={`mt-3 border-t border-gray-100 pt-3 lg:mt-3 lg:block ${
              filtersOpen ? "block" : "hidden"
            }`}
          >
            <PackageFilter
              filters={filters}
              setFilters={(updatedFilters) => {
                setFilters(updatedFilters);
                setPagination((prev) => ({ ...prev, page: 1 }));
              }}
              onReset={resetFilters}
            />
          </div>
        </div>

        {/* RESULTS HEADER */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 sm:mb-6">
          <h2 className="text-base font-bold text-gray-900 sm:text-xl">
            {loading ? (
              <span className="text-gray-400">Loading packages...</span>
            ) : (
              <>
                {pagination.totalItems}{" "}
                {pagination.totalItems === 1 ? "Package" : "Packages"} Found
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

        {/* PACKAGE GRID / LOADING / EMPTY */}
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
        ) : packages.length > 0 ? (
          <PackageGrid packages={packages} />
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white px-4 py-12 text-center sm:py-16">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-50">
              <FaSlidersH className="text-2xl text-teal-700" />
            </div>

            <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
              No packages match your search
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
              Try adjusting your filters or searching for something else.
              We've got plenty more Goa experiences waiting for you!
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

export default Packages;