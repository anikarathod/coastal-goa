import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
} from "react-icons/fa";

import api from "../../services/api";
import Loader from "../../components/common/Loader";

const Services = () => {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);

      const res = await api.get("/services");

      console.log("Services:", res.data.services);

      setServices(res.data.services || []);
    } catch (err) {
      console.error("Error loading services:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id) => {
    if (!window.confirm("Delete this service?")) return;

    try {
      await api.delete(`/services/${id}`);

      setServices((prev) =>
        prev.filter((service) => service._id !== id)
      );

      alert("Service deleted successfully.");
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to delete service."
      );
    }
  };

  const filteredServices = services.filter((service) =>
    service.title
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Services
          </h1>

          <p className="text-gray-500">
            Manage all tourism services
          </p>
        </div>

        <Link
          to="/admin/services/new"
          className="flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-3 text-white hover:bg-cyan-700"
        >
          <FaPlus />
          Add Service
        </Link>

      </div>

      {/* Search */}
      <div className="relative">

        <FaSearch className="absolute left-4 top-4 text-gray-400" />

        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border py-3 pl-12 pr-4"
        />

      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl bg-white shadow">

        <table className="min-w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left">Image</th>
              <th className="px-6 py-4 text-left">Service</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Price</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredServices.length === 0 ? (

              <tr>
                <td
                  colSpan="6"
                  className="py-10 text-center text-gray-500"
                >
                  No services found.
                </td>
              </tr>

            ) : (

              filteredServices.map((service) => (

                <tr
                  key={service._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="px-6 py-4">

                    <img
                      src={
                        service.image
                          ? service.image
                          : "https://placehold.co/150x100?text=No+Image"
                      }
                      alt={service.title}
                      className="h-16 w-24 rounded-lg object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/150x100?text=No+Image";
                      }}
                    />

                  </td>

                  <td className="px-6 py-4 font-semibold">
                    {service.title}
                  </td>

                  <td className="px-6 py-4">
                    {service.category}
                  </td>

                  <td className="px-6 py-4">
                    ₹{service.price}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        service.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {service.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex justify-center gap-3">

                      <Link
                        to={`/admin/services/edit/${service._id}`}
                        className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
                      >
                        <FaEdit />
                      </Link>

                      <button
                        onClick={() =>
                          deleteService(service._id)
                        }
                        className="rounded bg-red-500 p-2 text-white hover:bg-red-600"
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Services;