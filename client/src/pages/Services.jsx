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
    limit: 12,
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
    <section className="min-h-screen bg-gray-50 py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-8 text-center sm:mb-10 lg:mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Our Services
          </h1>

          <p className="mt-3 text-sm text-gray-600 sm:text-base">
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
        <div className="my-6 grid gap-4 md:grid-cols-4">

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
            <option value="Transport">Transport</option>
            <option value="Adventure">Adventure</option>
            <option value="Accommodation">Accommodation</option>
            <option value="Cruise">Cruise</option>
            <option value="Rental">Rental</option>
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
            <option value="North Goa">North Goa</option>
            <option value="South Goa">South Goa</option>
            <option value="Panjim">Panjim</option>
            <option value="Calangute">Calangute</option>
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
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>

          <button
            onClick={resetFilters}
            className="rounded-lg bg-red-500 px-4 py-3 font-medium text-white hover:bg-red-600"
          >
            Reset Filters
          </button>

        </div>

        {/* Results Count */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            {pagination.totalItems} Services Found
          </h2>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        ) : (
          <ServiceGrid services={services} />
        )}

        {/* Pagination */}
        {!loading && pagination.totalPages > 1 && (
          <div className="mt-10 flex justify-center">
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