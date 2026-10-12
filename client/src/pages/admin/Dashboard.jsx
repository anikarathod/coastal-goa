import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBoxOpen,
  FaSuitcase,
  FaCalendarCheck,
  FaUsers,
  FaImages,
  FaEnvelope,
  FaPlus,
  FaArrowRight,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaChartLine,
} from "react-icons/fa";

import api from "../../services/api";
import Loader from "../../components/common/Loader";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    packages: 0,
    services: 0,
    gallery: 0,
    bookings: 0,
    contacts: 0,
    customers: 0,
  });

  const [recentBookings, setRecentBookings] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/dashboard");

      setStats(res.data.stats || {});
      setRecentBookings(res.data.recentBookings || []);
      setRecentContacts(res.data.recentContacts || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "—";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  const cards = [
    {
      title: "Packages",
      value: stats.packages || 0,
      icon: <FaBoxOpen />,
      link: "/pearlrathod/packages",
      gradient: "from-teal-500 to-teal-600",
    },
    {
      title: "Services",
      value: stats.services || 0,
      icon: <FaSuitcase />,
      link: "/pearlrathod/services",
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Bookings",
      value: stats.bookings || 0,
      icon: <FaCalendarCheck />,
      link: "/pearlrathod/bookings",
      gradient: "from-sky-500 to-sky-600",
    },
    {
      title: "Customers",
      value: stats.customers || 0,
      icon: <FaUsers />,
      link: "/pearlrathod/customers",
      gradient: "from-violet-500 to-violet-600",
    },
    {
      title: "Gallery",
      value: stats.gallery || 0,
      icon: <FaImages />,
      link: "/pearlrathod/gallery",
      gradient: "from-pink-500 to-pink-600",
    },
    {
      title: "Contacts",
      value: stats.contacts || 0,
      icon: <FaEnvelope />,
      link: "/pearlrathod/contacts",
      gradient: "from-amber-500 to-amber-600",
    },
  ];

  const quickActions = [
    {
      label: "Add Package",
      to: "/pearlrathod/packages/new",
      icon: <FaPlus />,
      color: "bg-teal-600 hover:bg-teal-700",
    },
    {
      label: "Add Service",
      to: "/pearlrathod/services/new",
      icon: <FaPlus />,
      color: "bg-emerald-600 hover:bg-emerald-700",
    },
    {
      label: "Upload Gallery",
      to: "/pearlrathod/gallery/new",
      icon: <FaPlus />,
      color: "bg-pink-600 hover:bg-pink-700",
    },
  ];

  return (
    <div className="space-y-5 sm:space-y-6">

      {/* WELCOME BANNER */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-600 to-teal-800 p-5 text-white shadow-md sm:p-8">
        <div className="relative z-10">
          <p className="text-xs font-medium text-teal-100 sm:text-sm">
            {getGreeting()}, Admin 👋
          </p>
          <h1 className="mt-1 text-xl font-bold sm:text-3xl">
            Welcome to Alpha Waves Goa
          </h1>
          <p className="mt-2 max-w-2xl text-xs text-teal-100 sm:text-base">
            Here's what's happening with your business today.
          </p>
        </div>

        {/* Decorative circles */}
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-16 -right-4 h-32 w-32 rounded-full bg-white/5" />
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.title}
            to={card.link}
            className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md sm:gap-4 sm:p-5"
          >
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:text-sm sm:font-medium sm:normal-case sm:tracking-normal">
                {card.title}
              </p>
              <h2 className="mt-1 text-xl font-extrabold text-slate-900 sm:mt-1.5 sm:text-3xl">
                {card.value.toLocaleString("en-IN")}
              </h2>
              <p className="mt-2 hidden items-center gap-1 text-xs font-semibold text-teal-600 opacity-0 transition-opacity group-hover:opacity-100 sm:flex">
                View all <FaArrowRight className="text-[10px]" />
              </p>
            </div>

            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${card.gradient} text-lg text-white shadow-md transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14 sm:text-2xl`}
            >
              {card.icon}
            </div>
          </Link>
        ))}
      </div>

      {/* QUICK ACTIONS */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <FaChartLine className="text-teal-600" />
          <h2 className="text-base font-bold text-slate-900 sm:text-lg">
            Quick Actions
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {quickActions.map(({ label, to, icon, color }) => (
            <Link
              key={label}
              to={to}
              className={`flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${color}`}
            >
              {icon}
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* RECENT BOOKINGS */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 p-4 sm:p-6">
          <div className="flex items-center gap-2">
            <FaCalendarCheck className="text-sky-600" />
            <h2 className="text-base font-bold text-slate-900 sm:text-lg">
              Recent Bookings
            </h2>
          </div>
          <Link
            to="/pearlrathod/bookings"
            className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 hover:text-teal-700 sm:text-sm"
          >
            View all <FaArrowRight className="text-xs" />
          </Link>
        </div>

        {recentBookings.length === 0 ? (
          <EmptyState
            icon={<FaCalendarCheck />}
            title="No bookings yet"
            message="Customer bookings will appear here."
            ctaTo="/pearlrathod/bookings"
            ctaLabel="Go to Bookings"
          />
        ) : (
          <>
            {/* DESKTOP TABLE */}
            <div className="hidden overflow-x-auto md:block">
              <table className="min-w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Package
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Travel Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentBookings.slice(0, 5).map((booking) => (
                    <tr
                      key={booking._id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-50 text-xs font-bold text-teal-700">
                            {booking.name?.charAt(0)?.toUpperCase() || "?"}
                          </div>
                          <p className="font-medium text-slate-900">
                            {booking.name || "Unknown"}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {booking.packageName || "—"}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {formatDate(booking.travelDate)}
                      </td>
                      <td className="px-6 py-4">
                        <BookingStatusBadge status={booking.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="divide-y divide-slate-100 md:hidden">
              {recentBookings.slice(0, 5).map((booking) => (
                <div key={booking._id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-50 text-xs font-bold text-teal-700">
                        {booking.name?.charAt(0)?.toUpperCase() || "?"}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-slate-900">
                          {booking.name || "Unknown"}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          {booking.packageName || "—"}
                        </p>
                      </div>
                    </div>
                    <BookingStatusBadge status={booking.status} />
                  </div>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                    <FaClock className="text-[10px]" />
                    Travel: {formatDate(booking.travelDate)}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* RECENT CONTACTS */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 p-4 sm:p-6">
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-amber-600" />
            <h2 className="text-base font-bold text-slate-900 sm:text-lg">
              Recent Contact Messages
            </h2>
          </div>
          <Link
            to="/pearlrathod/contacts"
            className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 hover:text-teal-700 sm:text-sm"
          >
            View all <FaArrowRight className="text-xs" />
          </Link>
        </div>

        {recentContacts.length === 0 ? (
          <EmptyState
            icon={<FaEnvelope />}
            title="No messages yet"
            message="Customer contact submissions will appear here."
            ctaTo="/pearlrathod/contacts"
            ctaLabel="Go to Contacts"
          />
        ) : (
          <>
            {/* DESKTOP TABLE */}
            <div className="hidden overflow-x-auto md:block">
              <table className="min-w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Received
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentContacts.slice(0, 5).map((contact) => (
                    <tr
                      key={contact._id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-50 text-xs font-bold text-amber-600">
                            {contact.name?.charAt(0)?.toUpperCase() || "?"}
                          </div>
                          <p className="font-medium text-slate-900">
                            {contact.name || "Unknown"}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {contact.subject || "—"}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        <a
                          href={`mailto:${contact.email}`}
                          className="hover:text-teal-600 hover:underline"
                        >
                          {contact.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {formatDate(contact.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="divide-y divide-slate-100 md:hidden">
              {recentContacts.slice(0, 5).map((contact) => (
                <div key={contact._id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-50 text-xs font-bold text-amber-600">
                      {contact.name?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-slate-900">
                        {contact.name || "Unknown"}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {contact.subject || "No subject"}
                      </p>
                      <p className="truncate text-xs text-slate-400">
                        {contact.email}
                      </p>
                    </div>
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

/* ============= STATUS BADGE ============= */
const BookingStatusBadge = ({ status }) => {
  const styles = {
    Pending: "bg-amber-100 text-amber-700 ring-amber-200",
    Confirmed: "bg-emerald-100 text-emerald-700 ring-emerald-200",
    Completed: "bg-sky-100 text-sky-700 ring-sky-200",
    Cancelled: "bg-rose-100 text-rose-700 ring-rose-200",
  };

  const icons = {
    Pending: <FaClock className="text-[10px]" />,
    Confirmed: <FaCheckCircle className="text-[10px]" />,
    Completed: <FaCheckCircle className="text-[10px]" />,
    Cancelled: <FaTimesCircle className="text-[10px]" />,
  };

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${
        styles[status] || "bg-slate-100 text-slate-700 ring-slate-200"
      }`}
    >
      {icons[status]}
      {status || "Unknown"}
    </span>
  );
};

/* ============= EMPTY STATE ============= */
const EmptyState = ({ icon, title, message, ctaTo, ctaLabel }) => (
  <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-400">
      {icon}
    </div>
    <h3 className="mt-3 text-base font-semibold text-slate-900">{title}</h3>
    <p className="mt-1 max-w-sm text-sm text-slate-500">{message}</p>
    <Link
      to={ctaTo}
      className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700 transition hover:bg-teal-100"
    >
      {ctaLabel} <FaArrowRight className="text-xs" />
    </Link>
  </div>
);

export default Dashboard;