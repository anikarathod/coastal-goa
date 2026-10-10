import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaEye,
  FaPhone,
  FaTrash,
  FaCalendarAlt,
  FaRupeeSign,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaSortAmountDown,
  FaFilter,
  FaUsers,
  FaInbox,
} from "react-icons/fa";

import api from "../../services/api";
import Loader from "../../components/common/Loader";

const statusOptions = ["Pending", "Confirmed", "Completed", "Cancelled"];

const Bookings = () => {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  const [search, setSearch] = useState("");
  const [statusTab, setStatusTab] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await api.get("/bookings");
      setBookings(res.data.bookings || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, value) => {
    try {
      await api.put(`/bookings/${id}`, { status: value });
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: value } : b))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update booking.");
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking? This cannot be undone.")) return;

    try {
      setDeletingId(id);
      await api.delete(`/bookings/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete booking.");
    } finally {
      setDeletingId(null);
    }
  };

  // ---- STATS ----
  const stats = useMemo(() => {
    const total = bookings.length;
    const pending = bookings.filter((b) => b.status === "Pending").length;
    const confirmed = bookings.filter((b) => b.status === "Confirmed").length;
    const completed = bookings.filter((b) => b.status === "Completed").length;
    const cancelled = bookings.filter((b) => b.status === "Cancelled").length;

    const revenue = bookings
      .filter((b) => b.status === "Confirmed" || b.status === "Completed")
      .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

    return { total, pending, confirmed, completed, cancelled, revenue };
  }, [bookings]);

  // ---- FILTER + SORT ----
  const filteredBookings = useMemo(() => {
    let list = [...bookings];

    // Status tab
    if (statusTab !== "All") {
      list = list.filter((b) => b.status === statusTab);
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (b) =>
          b.name?.toLowerCase().includes(q) ||
          b.packageName?.toLowerCase().includes(q) ||
          b.phone?.includes(search) ||
          b.email?.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case "travel-asc":
        list.sort(
          (a, b) => new Date(a.travelDate || 0) - new Date(b.travelDate || 0)
        );
        break;
      case "travel-desc":
        list.sort(
          (a, b) => new Date(b.travelDate || 0) - new Date(a.travelDate || 0)
        );
        break;
      case "price-desc":
        list.sort((a, b) => (b.totalPrice || 0) - (a.totalPrice || 0));
        break;
      case "price-asc":
        list.sort((a, b) => (a.totalPrice || 0) - (b.totalPrice || 0));
        break;
      case "newest":
      default:
        list.sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );
        break;
    }

    return list;
  }, [bookings, statusTab, search, sortBy]);

  const formatPrice = (price) =>
    price ? `₹${Number(price).toLocaleString("en-IN")}` : "₹0";

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "—";

  if (loading) {
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
          Bookings
        </h1>
        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          Manage all customer bookings
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <KpiCard
          icon={<FaUsers />}
          label="Total"
          value={stats.total}
          color="teal"
        />
        <KpiCard
          icon={<FaClock />}
          label="Pending"
          value={stats.pending}
          color="yellow"
        />
        <KpiCard
          icon={<FaCheckCircle />}
          label="Confirmed"
          value={stats.confirmed}
          color="blue"
        />
        <KpiCard
          icon={<FaCheckCircle />}
          label="Completed"
          value={stats.completed}
          color="green"
        />
        <KpiCard
          icon={<FaRupeeSign />}
          label="Revenue"
          value={formatPrice(stats.revenue)}
          color="purple"
          isText
        />
      </div>

      {/* STATUS TABS */}
      <div className="overflow-x-auto">
        <div className="flex min-w-max gap-2 rounded-xl border border-gray-100 bg-white p-1.5 shadow-sm">
          {["All", ...statusOptions].map((tab) => {
            const count =
              tab === "All"
                ? stats.total
                : bookings.filter((b) => b.status === tab).length;

            const isActive = statusTab === tab;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setStatusTab(tab)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab}
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SEARCH + SORT */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

          {/* SEARCH */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, phone, email, or package..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm shadow-sm transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100 sm:text-base"
            />
          </div>

          {/* SORT */}
          <div className="flex items-center gap-2">
            <FaSortAmountDown className="hidden text-gray-400 sm:block" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100 sm:w-auto"
            >
              <option value="newest">Newest First</option>
              <option value="travel-asc">Travel Date: Soonest</option>
              <option value="travel-desc">Travel Date: Latest</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="price-asc">Price: Low → High</option>
            </select>
          </div>
        </div>
      </div>

      {/* RESULTS TABLE */}
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">

        {filteredBookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <FaInbox className="text-2xl text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              {search || statusTab !== "All"
                ? "No bookings match your filters"
                : "No bookings yet"}
            </h3>
            <p className="mt-2 max-w-md text-sm text-gray-500">
              {search || statusTab !== "All"
                ? "Try adjusting your search or switching tabs."
                : "New customer bookings will appear here."}
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
                      Package
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Travel Date
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Persons
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Amount
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Status
                    </th>
                    <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredBookings.map((b) => (
                    <tr key={b._id} className="transition hover:bg-gray-50">

                      {/* CUSTOMER */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-sm font-bold text-teal-700">
                            {b.name?.charAt(0)?.toUpperCase() || "?"}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-gray-900">
                              {b.name || "Unknown"}
                            </p>
                            <p className="truncate text-xs text-gray-500">
                              {b.phone || "—"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* PACKAGE */}
                      <td className="px-5 py-4">
                        <p className="max-w-[200px] truncate font-medium text-gray-900">
                          {b.packageName || "—"}
                        </p>
                      </td>

                      {/* TRAVEL DATE */}
                      <td className="px-5 py-4 text-sm text-gray-700">
                        <span className="inline-flex items-center gap-1.5">
                          <FaCalendarAlt className="text-xs text-gray-400" />
                          {formatDate(b.travelDate)}
                        </span>
                      </td>

                      {/* PERSONS */}
                      <td className="px-5 py-4 text-sm text-gray-700">
                        {b.adults || 1}
                        {b.children > 0 && ` + ${b.children} child`}
                      </td>

                      {/* AMOUNT */}
                      <td className="px-5 py-4">
                        <span className="font-semibold text-gray-900">
                          {formatPrice(b.totalPrice)}
                        </span>
                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-4">
                        <StatusBadge status={b.status} />
                      </td>

                      {/* ACTIONS */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            to={`/pearlrathod/bookings/${b._id}`}
                            className="rounded-lg bg-blue-50 p-2.5 text-blue-600 transition hover:bg-blue-100"
                            title="View Details"
                          >
                            <FaEye />
                          </Link>

                          <a
                            href={`tel:${b.phone}`}
                            className="rounded-lg bg-green-50 p-2.5 text-green-600 transition hover:bg-green-100"
                            title="Call Customer"
                          >
                            <FaPhone />
                          </a>

                          <button
                            type="button"
                            onClick={() => deleteBooking(b._id)}
                            disabled={deletingId === b._id}
                            className="rounded-lg bg-red-50 p-2.5 text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                            title="Delete"
                          >
                            {deletingId === b._id ? (
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
              {filteredBookings.map((b) => (
                <div key={b._id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-sm font-bold text-teal-700">
                        {b.name?.charAt(0)?.toUpperCase() || "?"}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {b.name || "Unknown"}
                        </p>
                        <p className="text-xs text-gray-500">{b.phone || "—"}</p>
                      </div>
                    </div>
                    <StatusBadge status={b.status} />
                  </div>

                  <div className="mt-3 space-y-1.5 text-sm">
                    <p className="text-gray-700">
                      <span className="text-gray-500">Package:</span>{" "}
                      <span className="font-medium">{b.packageName || "—"}</span>
                    </p>
                    <p className="text-gray-700">
                      <span className="text-gray-500">Travel:</span>{" "}
                      {formatDate(b.travelDate)}
                    </p>
                    <p className="text-gray-700">
                      <span className="text-gray-500">Amount:</span>{" "}
                      <span className="font-semibold">
                        {formatPrice(b.totalPrice)}
                      </span>
                    </p>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <Link
                      to={`/pearlrathod/bookings/${b._id}`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-50 py-2 text-sm font-semibold text-blue-600"
                    >
                      <FaEye /> View
                    </Link>
                    <a
                      href={`tel:${b.phone}`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-50 py-2 text-sm font-semibold text-green-600"
                    >
                      <FaPhone /> Call
                    </a>
                    <button
                      type="button"
                      onClick={() => deleteBooking(b._id)}
                      disabled={deletingId === b._id}
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
    </div>
  );
};

/* ============= KPI CARD ============= */
const KpiCard = ({ icon, label, value, color, isText }) => {
  const colorMap = {
    teal: "bg-teal-50 text-teal-600",
    yellow: "bg-yellow-50 text-yellow-600",
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
      <p
        className={`mt-1 font-extrabold text-gray-900 ${
          isText ? "text-xl" : "text-2xl"
        }`}
      >
        {value}
      </p>
    </div>
  );
};

/* ============= STATUS BADGE ============= */
const StatusBadge = ({ status }) => {
  const styles = {
    Pending: "bg-yellow-100 text-yellow-700 ring-yellow-200",
    Confirmed: "bg-blue-100 text-blue-700 ring-blue-200",
    Completed: "bg-green-100 text-green-700 ring-green-200",
    Cancelled: "bg-red-100 text-red-700 ring-red-200",
  };

  const dotColor = {
    Pending: "bg-yellow-500",
    Confirmed: "bg-blue-500",
    Completed: "bg-green-500",
    Cancelled: "bg-red-500",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${
        styles[status] || "bg-gray-100 text-gray-700 ring-gray-200"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotColor[status] || "bg-gray-500"}`} />
      {status || "Unknown"}
    </span>
  );
};

export default Bookings;