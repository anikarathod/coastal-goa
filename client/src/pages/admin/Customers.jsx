import { useEffect, useState, useMemo } from "react";
import {
  FaSearch,
  FaEye,
  FaEnvelope,
  FaPhone,
  FaTrash,
  FaUsers,
  FaUserPlus,
  FaCalendarAlt,
  FaInbox,
} from "react-icons/fa";

import api from "../../services/api";
import Loader from "../../components/common/Loader";
import Pagination from "../../components/common/Pagination";

const Customers = () => {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
    totalItems: 0,
  });

  useEffect(() => {
    fetchCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, pagination.page]);

  // Debounce search → reset page to 1 when typing
  useEffect(() => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, [search]);

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

      setCustomers(res.data.customers || []);

      setPagination((prev) => ({
        ...prev,
        totalPages: res.data.totalPages || 1,
        totalItems: res.data.totalItems || 0,
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteCustomer = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customer? This cannot be undone."
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      await api.delete(`/admin/customers/${id}`);

      // Remove from local state instead of refetch (faster UX)
      setCustomers((prev) => prev.filter((c) => c._id !== id));
      setPagination((prev) => ({
        ...prev,
        totalItems: Math.max(0, prev.totalItems - 1),
      }));
    } catch (err) {
      console.error("DELETE CUSTOMER ERROR:", err);
      alert(
        err.response?.data?.message ||
          "Failed to delete customer. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // Stats computed from the current page
  const stats = useMemo(() => {
    const currentPage = customers.length;
    const totalBookings = customers.reduce(
      (sum, c) => sum + (c.totalBookings || 0),
      0
    );

    // New this month
    const now = new Date();
    const newThisMonth = customers.filter((c) => {
      const created = new Date(c.createdAt);
      return (
        created.getMonth() === now.getMonth() &&
        created.getFullYear() === now.getFullYear()
      );
    }).length;

    return { currentPage, totalBookings, newThisMonth };
  }, [customers]);

  if (loading && customers.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Customers
        </h1>
        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          Manage registered customers
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          icon={<FaUsers />}
          label="Total Customers"
          value={pagination.totalItems}
          color="teal"
        />
        <KpiCard
          icon={<FaUsers />}
          label="On This Page"
          value={stats.currentPage}
          color="blue"
        />
        <KpiCard
          icon={<FaUserPlus />}
          label="New This Month"
          value={stats.newThisMonth}
          color="green"
        />
        <KpiCard
          icon={<FaCalendarAlt />}
          label="Bookings (Page)"
          value={stats.totalBookings}
          color="purple"
        />
      </div>

      {/* SEARCH */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or phone..."
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm shadow-sm transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100 sm:text-base"
          />
        </div>
      </div>

      {/* RESULTS */}
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">

        {customers.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <FaInbox className="text-2xl text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              {search ? "No customers match your search" : "No customers yet"}
            </h3>
            <p className="mt-2 max-w-md text-sm text-gray-500">
              {search
                ? "Try a different search term."
                : "New customer registrations will appear here."}
            </p>
          </div>
        ) : (
          <>
            {/* DESKTOP TABLE */}
            <div className="hidden overflow-x-auto lg:block">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Customer
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Contact
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Bookings
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Joined
                    </th>
                    <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {customers.map((customer) => (
                    <tr key={customer._id} className="transition hover:bg-gray-50">

                      {/* CUSTOMER (avatar + name) */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-sm font-bold text-teal-700">
                            {customer.name?.charAt(0)?.toUpperCase() || "?"}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-gray-900">
                              {customer.name || "Unknown"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* CONTACT (email + phone together) */}
                      <td className="px-5 py-4">
                        <p className="flex items-center gap-2 text-sm text-gray-700">
                          <FaEnvelope className="shrink-0 text-xs text-gray-400" />
                          <a
                            href={`mailto:${customer.email}`}
                            className="truncate hover:text-teal-600 hover:underline"
                          >
                            {customer.email}
                          </a>
                        </p>
                        <p className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                          <FaPhone className="shrink-0 text-xs text-gray-400" />
                          {customer.phone || "—"}
                        </p>
                      </td>

                      {/* BOOKINGS */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                            customer.totalBookings > 0
                              ? "bg-teal-50 text-teal-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {customer.totalBookings || 0}
                        </span>
                      </td>

                      {/* JOINED */}
                      <td className="px-5 py-4 text-sm text-gray-600">
                        {new Date(customer.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </td>

                      {/* ACTIONS */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            className="rounded-lg bg-blue-50 p-2.5 text-blue-600 transition hover:bg-blue-100"
                            title="View customer"
                            aria-label="View customer"
                          >
                            <FaEye />
                          </button>

                          <a
                            href={`mailto:${customer.email}`}
                            className="rounded-lg bg-purple-50 p-2.5 text-purple-600 transition hover:bg-purple-100"
                            title="Send email"
                            aria-label="Send email"
                          >
                            <FaEnvelope />
                          </a>

                          {customer.phone && (
                            <a
                              href={`tel:${customer.phone}`}
                              className="rounded-lg bg-green-50 p-2.5 text-green-600 transition hover:bg-green-100"
                              title="Call customer"
                              aria-label="Call customer"
                            >
                              <FaPhone />
                            </a>
                          )}

                          <button
                            type="button"
                            onClick={() => deleteCustomer(customer._id)}
                            disabled={deletingId === customer._id}
                            className="rounded-lg bg-red-50 p-2.5 text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                            title="Delete customer"
                            aria-label="Delete customer"
                          >
                            {deletingId === customer._id ? (
                              <span className="block h-4 w-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
                            ) : (
                              <FaTrash />
                            )}
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="divide-y divide-gray-100 lg:hidden">
              {customers.map((customer) => (
                <div key={customer._id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-50 text-sm font-bold text-teal-700">
                      {customer.name?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-semibold text-gray-900">
                        {customer.name || "Unknown"}
                      </h3>
                      <p className="mt-0.5 truncate text-xs text-gray-500">
                        {customer.email}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-500">
                        {customer.phone || "No phone"}
                      </p>

                      <div className="mt-2 flex items-center gap-3">
                        <span className="inline-flex items-center rounded-full bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal-700">
                          {customer.totalBookings || 0} bookings
                        </span>
                        <span className="text-xs text-gray-500">
                          Joined{" "}
                          {new Date(customer.createdAt).toLocaleDateString(
                            "en-IN",
                            { day: "2-digit", month: "short" }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <a
                      href={`mailto:${customer.email}`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-purple-50 py-2 text-sm font-semibold text-purple-600"
                    >
                      <FaEnvelope /> Email
                    </a>
                    {customer.phone && (
                      <a
                        href={`tel:${customer.phone}`}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-50 py-2 text-sm font-semibold text-green-600"
                      >
                        <FaPhone /> Call
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => deleteCustomer(customer._id)}
                      disabled={deletingId === customer._id}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-50 py-2 text-sm font-semibold text-red-600 disabled:opacity-50"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* PAGINATION */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center">
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
  );
};

/* ============= KPI CARD ============= */
const KpiCard = ({ icon, label, value, color }) => {
  const colorMap = {
    teal: "bg-teal-50 text-teal-600",
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-lg ${colorMap[color]}`}
      >
        {icon}
      </div>
      <p className="mt-3 text-xs font-medium uppercase tracking-wider text-gray-500">
        {label}
      </p>
      <p className="mt-1 text-2xl font-extrabold text-gray-900">{value}</p>
    </div>
  );
};

export default Customers;