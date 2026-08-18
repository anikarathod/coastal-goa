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
    limit: 9,
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

      setPackages(res.data.packages || []);

      setPagination((prev) => ({
        ...prev,
        totalPages: res.data.totalPages,
        totalItems: res.data.totalItems,
      }));
    } catch (err) {
      console.error(err);
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
    <section className="bg-gray-50 py-16">

      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mb-12 text-center">

          <h1 className="text-4xl font-bold text-gray-900">
            Goa Tour Packages
          </h1>

          <p className="mt-4 text-gray-600">
            Choose from our best-selling Goa tour packages.
          </p>

        </div>

        {/* Search */}

        <PackageSearch
          value={search}
          onChange={setSearch}
        />

        {/* Filters */}

        <div className="my-8">

          <PackageFilter
            filters={filters}
            setFilters={setFilters}
            onReset={resetFilters}
          />

        </div>

        {/* Results */}

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-xl font-semibold">

            {pagination.totalItems} Packages Found

          </h2>

        </div>

        {/* Grid */}

        {loading ? (

          <div className="flex justify-center py-24">

            <Loader />

          </div>

        ) : (

          <PackageGrid packages={packages} />

        )}

        {/* Pagination */}

        {!loading &&
          pagination.totalPages > 1 && (

            <div className="mt-12 flex justify-center">

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