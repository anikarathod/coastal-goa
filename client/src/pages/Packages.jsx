import { useEffect, useState } from "react";
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

  return (
    <section className="min-h-screen bg-gray-50 py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Page Heading */}
        <div className="mb-8 text-center sm:mb-10 lg:mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Goa Tour Packages
          </h1>

          <p className="mt-3 text-sm text-gray-600 sm:text-base">
            Choose from our best-selling Goa tour packages and experiences.
          </p>
        </div>

        {/* Search */}
        <PackageSearch
          value={search}
          onChange={setSearch}
        />

        {/* Filters */}
        <div className="my-6 sm:my-8">
          <PackageFilter
            filters={filters}
            setFilters={setFilters}
            onReset={resetFilters}
          />
        </div>

        {/* Results Count */}
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
            {pagination.totalItems} Packages Found
          </h2>
        </div>

        {/* Package Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        ) : (
          <PackageGrid packages={packages} />
        )}

        {/* Pagination */}
        {!loading && pagination.totalPages > 1 && (
          <div className="mt-10 flex justify-center sm:mt-12">
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