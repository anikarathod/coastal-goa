import { useEffect, useState } from "react";
import api from "../services/api";

import Loader from "../components/common/Loader";
import Pagination from "../components/common/Pagination";
import SearchBar from "../components/common/SearchBar";
import ServiceGrid from "../components/services/ServiceGrid";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    category: "",
    location: "",
    sort: "latest",
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    totalPages: 1,
    totalItems: 0,
  });

  useEffect(() => {
    fetchServices();
  }, [search, filters, pagination.page]);

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

      setServices(res.data.services || []);

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
            Our Services
          </h1>

          <p className="mt-4 text-gray-600">
            Everything you need for an unforgettable Goa trip.
          </p>

        </div>

        {/* Search */}

        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search services..."
        />

        {/* Filters */}

        <div className="my-8 grid gap-4 md:grid-cols-4">

          <select
            value={filters.category}
            onChange={(e) =>
              setFilters({
                ...filters,
                category: e.target.value,
              })
            }
            className="rounded-lg border p-3"
          >
            <option value="">All Categories</option>
            <option>Transport</option>
            <option>Adventure</option>
            <option>Accommodation</option>
            <option>Cruise</option>
            <option>Rental</option>
          </select>

          <select
            value={filters.location}
            onChange={(e) =>
              setFilters({
                ...filters,
                location: e.target.value,
              })
            }
            className="rounded-lg border p-3"
          >
            <option value="">All Locations</option>
            <option>North Goa</option>
            <option>South Goa</option>
            <option>Panjim</option>
            <option>Calangute</option>
          </select>

          <select
            value={filters.sort}
            onChange={(e) =>
              setFilters({
                ...filters,
                sort: e.target.value,
              })
            }
            className="rounded-lg border p-3"
          >
            <option value="latest">Newest</option>
            <option value="priceLow">
              Price: Low to High
            </option>
            <option value="priceHigh">
              Price: High to Low
            </option>
            <option value="rating">
              Highest Rated
            </option>
          </select>

          <button
            onClick={resetFilters}
            className="rounded-lg bg-red-500 px-4 py-3 text-white hover:bg-red-600"
          >
            Reset Filters
          </button>

        </div>

        {/* Results */}

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-xl font-semibold">

            {pagination.totalItems} Services Found

          </h2>

        </div>

        {/* Grid */}

        {loading ? (
          <div className="flex justify-center py-24">
            <Loader />
          </div>
        ) : (
          <ServiceGrid services={services} />
        )}

        {/* Pagination */}

        {!loading && pagination.totalPages > 1 && (
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

export default Services;