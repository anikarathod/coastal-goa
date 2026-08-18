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

const Packages = () => {
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);

      const res = await api.get("/packages");

      setPackages(res.data.packages || []);
    } catch (err) {
      console.error("Error loading packages:", err);
    } finally {
      setLoading(false);
    }
  };

  const deletePackage = async (id) => {
    if (!window.confirm("Delete this package?")) return;

    try {
      await api.delete(`/packages/${id}`);

      setPackages((prev) =>
        prev.filter((pkg) => pkg._id !== id)
      );

      alert("Package deleted successfully.");

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to delete package."
      );
    }
  };

  const filteredPackages = packages.filter((pkg) =>
    pkg.title
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

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Packages
          </h1>

          <p className="text-gray-500">
            Manage all tour packages
          </p>
        </div>

        <Link
          to="/admin/packages/new"
          className="flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-3 text-white hover:bg-cyan-700"
        >
          <FaPlus />
          Add Package
        </Link>

      </div>

      {/* Search */}

      <div className="relative">

        <FaSearch className="absolute left-4 top-4 text-gray-400" />

        <input
          type="text"
          placeholder="Search packages..."
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

              <th className="px-6 py-4 text-left">
                Image
              </th>

              <th className="px-6 py-4 text-left">
                Package
              </th>

              <th className="px-6 py-4 text-left">
                Price
              </th>

              <th className="px-6 py-4 text-left">
                Duration
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredPackages.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="py-10 text-center text-gray-500"
                >
                  No packages found.
                </td>

              </tr>

            ) : (

              filteredPackages.map((pkg) => (

                <tr
                  key={pkg._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="px-6 py-4">

                    <img
                      src={
                        pkg.coverImage ||
                        "https://placehold.co/150x100?text=No+Image"
                      }
                      alt={pkg.title}
                      className="h-16 w-24 rounded-lg object-cover"
                    />

                  </td>

                  <td className="px-6 py-4 font-semibold">
                    {pkg.title}
                  </td>

                  <td className="px-6 py-4">
                    ₹{pkg.price}
                  </td>

                  <td className="px-6 py-4">
                    {pkg.duration}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        pkg.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {pkg.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex justify-center gap-3">

                      <Link
                        to={`/admin/packages/edit/${pkg._id}`}
                        className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
                      >
                        <FaEdit />
                      </Link>

                      <button
                        onClick={() =>
                          deletePackage(pkg._id)
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

export default Packages;