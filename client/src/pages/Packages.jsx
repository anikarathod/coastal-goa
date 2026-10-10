import { useEffect, useState } from "react";
import { FaSlidersH, FaChevronDown, FaChevronUp } from "react-icons/fa";

import api from "../services/api";

import Loader from "../components/common/Loader";
import Pagination from "../components/common/Pagination";
import PackageGrid from "../components/packages/PackageGrid";
import PackageFilter from "../components/packages/PackageFilter";
import PackageSearch from "../components/packages/PackageSearch";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
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

  useEffect(() => {
    fetchPackages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filters, pagination.page]);

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

  const resetFilters = () => {
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
  };

  const activeFiltersCount = [
    filters.category,
    filters.location,
    filters.duration,
    filters.minPrice,
    filters.maxPrice,
  ].filter(Boolean).length;

  return (
    <section className="min-h-screen bg-gray-50 py-5 sm:py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">

        {/* Page Heading */}
        <div className="mb-5 text-center sm:mb-8 lg:mb-10">
          <h1 className="text-2xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            Goa Tour Packages
          </h1>

          <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-600 sm:mt-3 sm:text-base">
            Choose from our best-selling Goa tour packages and experiences.
          </p>
        </div>

        {/* Search */}
        <div className="mb-3 sm:mb-5">
          <PackageSearch
            value={search}
            onChange={(value) => {
              setSearch(value);
              setPagination((prev) => ({ ...prev, page: 1 }));
            }}
          />
        </div>

        {/* Filters */}
        <div className="mb-5 sm:mb-7">
          {/* Mobile Filter Toggle */}
          <button
            type="button"
            onClick={() => setFiltersOpen((prev) => !prev)}
            aria-expanded={filtersOpen}
            aria-controls="package-filters"
            className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3.5 shadow-sm transition hover:border-teal-600 sm:py-4 lg:hidden"
          >
            <span className="flex items-center gap-3">
              <FaSlidersH className="text-teal-700" />

              <span className="font-semibold text-gray-900">
                Filter Packages
              </span>

              {activeFiltersCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-700 px-1.5 text-xs font-bold text-white">
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

          {/* Desktop: Always visible | Mobile: Collapsible */}
          <div
            id="package-filters"
            className={`mt-3 ${
              filtersOpen ? "block" : "hidden"
            } lg:mt-0 lg:block`}
          >
            <PackageFilter
              filters={filters}
              setFilters={(updatedFilters) => {
                setFilters(updatedFilters);
                setPagination((prev) => ({
                  ...prev,
                  page: 1,
                }));
              }}
              onReset={resetFilters}
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 flex items-center justify-between gap-3 sm:mb-6">
          <h2 className="text-base font-bold text-gray-900 sm:text-xl">
            {loading ? "Loading packages..." : `${pagination.totalItems} Packages Found`}
          </h2>

          {activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={resetFilters}
              className="shrink-0 text-sm font-semibold text-teal-700 hover:text-teal-900"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Package Grid */}
        {loading ? (
          <div className="flex justify-center py-16 sm:py-20">
            <Loader />
          </div>
        ) : packages.length > 0 ? (
          <PackageGrid packages={packages} />
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white px-4 py-10 text-center sm:py-14">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-50">
              <FaSlidersH className="text-xl text-teal-700" />
            </div>

            <h3 className="mt-4 text-lg font-bold text-gray-900">
              No packages found
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              Try changing your search or filters to find available Goa tours.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-xl bg-teal-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-800"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {!loading && pagination.totalPages > 1 && (
          <div className="mt-8 flex justify-center sm:mt-12">
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={(page) =>
                setPagination((prev) => ({
                  ...prev,
                  page,
                }))
              }
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Packages;