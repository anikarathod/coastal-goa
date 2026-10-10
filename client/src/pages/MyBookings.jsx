import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaEye,
  FaWhatsapp,
  FaInbox,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaSuitcase,
  FaRupeeSign,
} from "react-icons/fa";

import api from "../services/api";
import Loader from "../components/common/Loader";

const MyBookings = () => {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const res = await api.get("/bookings/my");

      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.bookings || [];

      setBookings(data);
    } catch (error) {
      console.error(error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  // ---- STATS ----
  const stats = useMemo(() => {
    const total = bookings.length;
    const pending = bookings.filter((b) => b.status === "Pending").length;
    const confirmed = bookings.filter((b) => b.status === "Confirmed").length;
    const completed = bookings.filter((b) => b.status === "Completed").length;
    const cancelled = bookings.filter((b) => b.status === "Cancelled").length;
    const totalSpent = bookings
      .filter((b) => b.status !== "Cancelled")
      .reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);

    return { total, pending, confirmed, completed, cancelled, totalSpent };
  }, [bookings]);

  // ---- FILTER ----
  const filteredBookings = useMemo(() => {
    if (activeTab === "All") return bookings;
    return bookings.filter((b) => b.status === activeTab);
  }, [bookings, activeTab]);

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "—";

  const formatAmount = (amount) =>
    amount ? `₹${Number(amount).toLocaleString("en-IN")}` : "₹0";

  // ---- LOADING ----
  if (loading) {
    return (
      <section className="min-h-screen bg-gray-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="h-8 w-64 animate-pulse rounded bg-gray-200" />
            <div className="mt-2 h-4 w-96 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-56 animate-pulse rounded-2xl bg-gray-200"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            My Bookings
          </h1>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            Track all your Goa bookings and their current status.
          </p>
        </div>

        {/* NO BOOKINGS AT ALL */}
        {bookings.length === 0 ? (
          <div className="rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm sm:p-16">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-50">
              <FaSuitcase className="text-3xl text-teal-600" />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              No Bookings Yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-gray-500">
              Start planning your Goa adventure today. Browse our curated
              packages and book your dream trip in seconds.
            </p>

            <Link
              to="/packages"
              className="mt-8 inline-block rounded-xl bg-teal-600 px-8 py-3 font-semibold text-white shadow-sm transition hover:bg-teal-700"
            >
              Browse Packages
            </Link>
          </div>
        ) : (
          <>
            {/* KPI CARDS */}
            <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <KpiCard
                icon={<FaSuitcase />}
                label="Total Bookings"
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
                color="green"
              />
              <KpiCard
                icon={<FaRupeeSign />}
                label="Total Spent"
                value={formatAmount(stats.totalSpent)}
                color="purple"
              />
            </div>

            {/* TABS */}
            <div className="mb-6 overflow-x-auto">
              <div className="flex min-w-max gap-2 rounded-xl border border-gray-100 bg-white p-1.5 shadow-sm">
                {[
                  { key: "All", label: "All", count: stats.total },
                  { key: "Pending", label: "Pending", count: stats.pending },
                  { key: "Confirmed", label: "Confirmed", count: stats.confirmed },
                  { key: "Completed", label: "Completed", count: stats.completed },
                  { key: "Cancelled", label: "Cancelled", count: stats.cancelled },
                ].map(({ key, label, count }) => {
                  const isActive = activeTab === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setActiveTab(key)}
                      className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                        isActive
                          ? "bg-teal-600 text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {label}
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

            {/* FILTERED RESULT */}
            {filteredBookings.length === 0 ? (
              <div className="rounded-3xl border border-gray-100 bg-white p-12 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <FaInbox className="text-2xl text-gray-400" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900">
                  No {activeTab.toLowerCase()} bookings
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  You don't have any {activeTab.toLowerCase()} bookings yet.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {filteredBookings.map((booking) => (
                  <BookingCard
                    key={booking._id}
                    booking={booking}
                    formatDate={formatDate}
                    formatAmount={formatAmount}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

/* ============= BOOKING CARD ============= */
const BookingCard = ({ booking, formatDate, formatAmount }) => {
  const statusConfig = {
    Pending: {
      color: "bg-yellow-100 text-yellow-700 ring-yellow-200",
      dot: "bg-yellow-500",
      icon: <FaClock />,
    },
    Confirmed: {
      color: "bg-green-100 text-green-700 ring-green-200",
      dot: "bg-green-500",
      icon: <FaCheckCircle />,
    },
    Completed: {
      color: "bg-blue-100 text-blue-700 ring-blue-200",
      dot: "bg-blue-500",
      icon: <FaCheckCircle />,
    },
    Cancelled: {
      color: "bg-red-100 text-red-700 ring-red-200",
      dot: "bg-red-500",
      icon: <FaTimesCircle />,
    },
  };

  const status = statusConfig[booking.status] || statusConfig.Pending;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md">
      <div className="grid gap-0 md:grid-cols-4">

        {/* IMAGE */}
        <div className="relative h-48 md:h-full">
          <img
            src={
              booking.packageImage ||
              "https://placehold.co/600x400?text=No+Image"
            }
            alt={booking.packageName || "Package"}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.target.src =
                "https://placehold.co/600x400?text=No+Image";
            }}
          />
          <div className="absolute left-3 top-3">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ring-1 ${status.color}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
              {booking.status || "Pending"}
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-5 sm:p-6 md:col-span-3">

          {/* HEADER ROW */}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                {booking.packageName || "Package"}
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                Booking ID:{" "}
                <span className="font-mono font-medium text-gray-700">
                  {booking.bookingId || "—"}
                </span>
              </p>
            </div>
          </div>

          {/* DETAILS GRID */}
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">

            <InfoBlock
              icon={<FaCalendarAlt />}
              label="Travel Date"
              value={formatDate(booking.travelDate)}
            />

            <InfoBlock
              icon={<FaUsers />}
              label="Guests"
              value={`${booking.adults || 1}${
                booking.children ? ` + ${booking.children}` : ""
              } ${booking.adults === 1 ? "Adult" : "Adults"}`}
            />

            <InfoBlock
              icon={<FaMapMarkerAlt />}
              label="Destination"
              value={booking.location || "—"}
              className="col-span-2 sm:col-span-1"
            />
          </div>

          {/* FOOTER — AMOUNT + ACTIONS */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                Total Amount
              </p>
              <p className="mt-0.5 text-2xl font-extrabold text-teal-700 sm:text-3xl">
                {formatAmount(booking.totalAmount)}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                to={`/booking/${booking._id}`}
                className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"
              >
                <FaEye />
                View Details
              </Link>

              <a
                href="https://wa.me/919175884119"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-700 transition hover:bg-green-100"
              >
                <FaWhatsapp />
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============= INFO BLOCK ============= */
const InfoBlock = ({ icon, label, value, className = "" }) => (
  <div className={`flex items-start gap-3 ${className}`}>
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-0.5 truncate text-sm font-semibold text-gray-900">
        {value}
      </p>
    </div>
  </div>
);

/* ============= KPI CARD ============= */
const KpiCard = ({ icon, label, value, color }) => {
  const colorMap = {
    teal: "bg-teal-50 text-teal-600",
    yellow: "bg-yellow-50 text-yellow-600",
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

export default MyBookings;