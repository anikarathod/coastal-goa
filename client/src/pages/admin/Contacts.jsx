import { useEffect, useState, useMemo } from "react";
import {
  FaSearch,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaTrash,
  FaCheckCircle,
  FaInbox,
  FaEnvelopeOpen,
  FaEnvelope as FaUnread,
  FaClock,
  FaSortAmountDown,
} from "react-icons/fa";

import api from "../../services/api";
import Loader from "../../components/common/Loader";

const Contacts = () => {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("All"); // All | Unread | Read
  const [sortBy, setSortBy] = useState("newest");
  const [deletingId, setDeletingId] = useState(null);
  const [markingId, setMarkingId] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/contact");
      setContacts(res.data.contacts || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const markRead = async (id) => {
    try {
      setMarkingId(id);
      await api.put(`/contact/${id}/read`);

      setContacts((prev) =>
        prev.map((contact) =>
          contact._id === id
            ? { ...contact, isRead: true, status: "Read" }
            : contact
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to mark as read.");
    } finally {
      setMarkingId(null);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message? This cannot be undone.")) return;

    try {
      setDeletingId(id);
      await api.delete(`/contact/${id}`);
      setContacts((prev) => prev.filter((contact) => contact._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete message.");
    } finally {
      setDeletingId(null);
    }
  };

  // ---- STATS ----
  const stats = useMemo(() => {
    const total = contacts.length;
    const unread = contacts.filter((c) => !c.isRead).length;
    const read = total - unread;
    const last7Days = contacts.filter((c) => {
      const created = new Date(c.createdAt).getTime();
      return Date.now() - created < 7 * 24 * 60 * 60 * 1000;
    }).length;

    return { total, unread, read, last7Days };
  }, [contacts]);

  // ---- FILTER + SORT ----
  const filteredContacts = useMemo(() => {
    let list = [...contacts];

    // Tab
    if (tab === "Unread") {
      list = list.filter((c) => !c.isRead);
    } else if (tab === "Read") {
      list = list.filter((c) => c.isRead);
    }

    // Search
    if (search.trim()) {
      const text = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name?.toLowerCase().includes(text) ||
          c.email?.toLowerCase().includes(text) ||
          c.subject?.toLowerCase().includes(text) ||
          c.phone?.includes(search) ||
          c.message?.toLowerCase().includes(text)
      );
    }

    // Sort
    switch (sortBy) {
      case "oldest":
        list.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;
      case "name":
        list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      case "newest":
      default:
        list.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
    }

    return list;
  }, [contacts, tab, search, sortBy]);

  const formatDate = (date) =>
    new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

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
          Contact Messages
        </h1>
        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          Customer enquiries and feedback
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          icon={<FaInbox />}
          label="Total Messages"
          value={stats.total}
          color="teal"
        />
        <KpiCard
          icon={<FaEnvelope />}
          label="Unread"
          value={stats.unread}
          color="yellow"
        />
        <KpiCard
          icon={<FaEnvelopeOpen />}
          label="Read"
          value={stats.read}
          color="green"
        />
        <KpiCard
          icon={<FaClock />}
          label="Last 7 Days"
          value={stats.last7Days}
          color="blue"
        />
      </div>

      {/* TABS */}
      <div className="overflow-x-auto">
        <div className="flex min-w-max gap-2 rounded-xl border border-gray-100 bg-white p-1.5 shadow-sm">
          {[
            { key: "All", label: "All", count: stats.total },
            { key: "Unread", label: "Unread", count: stats.unread },
            { key: "Read", label: "Read", count: stats.read },
          ].map(({ key, label, count }) => {
            const isActive = tab === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
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

      {/* SEARCH + SORT */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* SEARCH */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, subject, or message..."
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
              <option value="oldest">Oldest First</option>
              <option value="name">Name: A → Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="space-y-4">
        {filteredContacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <FaInbox className="text-2xl text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              {search || tab !== "All"
                ? "No messages match your filters"
                : "No messages yet"}
            </h3>
            <p className="mt-2 max-w-md text-sm text-gray-500">
              {search || tab !== "All"
                ? "Try adjusting your search or switching tabs."
                : "New customer enquiries will appear here."}
            </p>
          </div>
        ) : (
          filteredContacts.map((contact) => (
            <div
              key={contact._id}
              className={`rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6 ${
                !contact.isRead
                  ? "border-teal-200 bg-teal-50/30"
                  : "border-gray-100"
              }`}
            >
              {/* HEADER ROW */}
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  {/* AVATAR */}
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      contact.isRead
                        ? "bg-gray-100 text-gray-600"
                        : "bg-teal-100 text-teal-700"
                    }`}
                  >
                    {contact.name?.charAt(0)?.toUpperCase() || "?"}
                  </div>

                  <div className="min-w-0">
                    <h2 className="flex items-center gap-2 text-base font-bold text-gray-900 sm:text-lg">
                      {contact.name}
                      {!contact.isRead && (
                        <span className="inline-block h-2 w-2 rounded-full bg-teal-500" />
                      )}
                    </h2>
                    <p className="mt-0.5 text-sm font-medium text-gray-700">
                      {contact.subject || "No subject"}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
                      <FaClock className="text-[10px]" />
                      {formatDate(contact.createdAt)}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
                    contact.isRead
                      ? "bg-green-50 text-green-700 ring-green-200"
                      : "bg-yellow-50 text-yellow-700 ring-yellow-200"
                  }`}
                >
                  {contact.isRead ? "Read" : "Unread"}
                </span>
              </div>

              {/* CONTACT INFO */}
              <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <p className="flex items-center gap-2 text-gray-700">
                  <FaEnvelope className="shrink-0 text-gray-400" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="truncate hover:text-teal-600 hover:underline"
                  >
                    {contact.email}
                  </a>
                </p>
                {contact.phone && (
                  <p className="flex items-center gap-2 text-gray-700">
                    <FaPhone className="shrink-0 text-gray-400" />
                    <a
                      href={`tel:${contact.phone}`}
                      className="hover:text-teal-600 hover:underline"
                    >
                      {contact.phone}
                    </a>
                  </p>
                )}
              </div>

              {/* MESSAGE */}
              <div className="mt-4 rounded-xl bg-gray-50 p-4 text-sm leading-relaxed text-gray-700">
                {contact.message}
              </div>

              {/* ACTIONS */}
              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
                >
                  <FaEnvelope />
                  Email
                </a>

                {contact.phone && (
                  <>
                    <a
                      href={`tel:${contact.phone}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 text-sm font-semibold text-green-600 transition hover:bg-green-100"
                    >
                      <FaPhone />
                      Call
                    </a>

                    <a
                      href={`https://wa.me/91${contact.phone}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-100"
                    >
                      <FaWhatsapp />
                      WhatsApp
                    </a>
                  </>
                )}

                {!contact.isRead && (
                  <button
                    type="button"
                    onClick={() => markRead(contact._id)}
                    disabled={markingId === contact._id}
                    className="inline-flex items-center gap-2 rounded-lg bg-yellow-50 px-4 py-2 text-sm font-semibold text-yellow-700 transition hover:bg-yellow-100 disabled:opacity-50"
                  >
                    {markingId === contact._id ? (
                      <span className="block h-3.5 w-3.5 animate-spin rounded-full border-2 border-yellow-700 border-t-transparent" />
                    ) : (
                      <FaCheckCircle />
                    )}
                    {markingId === contact._id ? "Marking..." : "Mark Read"}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => deleteMessage(contact._id)}
                  disabled={deletingId === contact._id}
                  className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                >
                  {deletingId === contact._id ? (
                    <span className="block h-3.5 w-3.5 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
                  ) : (
                    <FaTrash />
                  )}
                  {deletingId === contact._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

/* ============= KPI CARD ============= */
const KpiCard = ({ icon, label, value, color }) => {
  const colorMap = {
    teal: "bg-teal-50 text-teal-600",
    yellow: "bg-yellow-50 text-yellow-600",
    green: "bg-green-50 text-green-600",
    blue: "bg-blue-50 text-blue-600",
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

export default Contacts;