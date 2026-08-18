import { useEffect, useState } from "react";
import {
  FaSearch,
  FaEye,
  FaEnvelope,
  FaPhone,
  FaTrash,
} from "react-icons/fa";

import api from "../../services/api";
import Loader from "../../components/common/Loader";
import Pagination from "../../components/common/Pagination";

const Customers = () => {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
    totalItems: 0,
  });

  useEffect(() => {
    fetchCustomers();
  }, [search, pagination.page]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);

      const res = await api.get("/admin/customers", {
        params: {
          page: pagination.page,
          limit: pagination.limit,
          search,
        },
      });

      setCustomers(res.data.customers);

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

  const deleteCustomer = async (id) => {
    if (!window.confirm("Delete this customer?")) return;

    try {
      await api.delete(`/admin/customers/${id}`);
      fetchCustomers();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Customers
        </h1>

        <p className="text-gray-500">
          Manage registered customers
        </p>
      </div>

      {/* Search */}

      <div className="relative">

        <FaSearch className="absolute left-4 top-4 text-gray-400" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customer..."
          className="w-full rounded-lg border py-3 pl-12 pr-4"
        />

      </div>

      {/* Table */}

      <div className="overflow-x-auto rounded-xl bg-white shadow">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-6 py-4 text-left">
                Customer
              </th>

              <th className="px-6 py-4 text-left">
                Email
              </th>

              <th className="px-6 py-4 text-left">
                Phone
              </th>

              <th className="px-6 py-4 text-left">
                Bookings
              </th>

              <th className="px-6 py-4 text-left">
                Joined
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {customers.map((customer) => (

              <tr
                key={customer._id}
                className="border-b"
              >

                <td className="px-6 py-4">

                  <div>

                    <h3 className="font-semibold">
                      {customer.name}
                    </h3>

                  </div>

                </td>

                <td className="px-6 py-4">
                  {customer.email}
                </td>

                <td className="px-6 py-4">
                  {customer.phone}
                </td>

                <td className="px-6 py-4">
                  {customer.totalBookings}
                </td>

                <td className="px-6 py-4">
                  {new Date(
                    customer.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">

                  <div className="flex justify-center gap-2">

                    <button
                      className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
                      title="View"
                    >
                      <FaEye />
                    </button>

                    <a
                      href={`mailto:${customer.email}`}
                      className="rounded bg-purple-500 p-2 text-white hover:bg-purple-600"
                      title="Email"
                    >
                      <FaEnvelope />
                    </a>

                    <a
                      href={`tel:${customer.phone}`}
                      className="rounded bg-green-500 p-2 text-white hover:bg-green-600"
                      title="Call"
                    >
                      <FaPhone />
                    </a>

                    <button
                      onClick={() =>
                        deleteCustomer(customer._id)
                      }
                      className="rounded bg-red-500 p-2 text-white hover:bg-red-600"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

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
  );
};

export default Customers;