import { useEffect, useState } from "react";
import {
  FaEye,
  FaMousePointer,
  FaWhatsapp,
  FaUsers,
  FaSpinner,
  FaChartLine,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import api from "../../services/api";

const Analytics = () => {
  const [summary, setSummary] = useState(null);
  const [topPages, setTopPages] = useState([]);
  const [topPackages, setTopPackages] = useState([]);
  const [daily, setDaily] = useState([]);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [s, p, pk, d, r] = await Promise.all([
        api.get("/analytics/summary"),
        api.get("/analytics/top-pages"),
        api.get("/analytics/top-packages"),
        api.get(`/analytics/daily-views?days=${days}`),
        api.get("/analytics/recent"),
      ]);

      setSummary(s.data);
      setTopPages(p.data.topPages || []);
      setTopPackages(pk.data.topPackages || []);
      setDaily(d.data.daily || []);
      setRecent(r.data.events || []);
    } catch (err) {
      console.error("Analytics fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <FaSpinner className="animate-spin text-3xl text-teal-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Analytics
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Track how visitors use Coastal Goa
          </p>
        </div>

        <select
          value={days}
          onChange={(e) => setDays(parseInt(e.target.value))}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
        >
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
        </select>
      </div>

      {/* KPI CARDS */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          icon={<FaEye />}
          label="Total Page Views"
          value={summary?.totalViews?.toLocaleString("en-IN") || 0}
          sub={`${summary?.viewsLast30 || 0} in last 30 days`}
          trend={summary?.viewGrowth}
        />
        <KpiCard
          icon={<FaMousePointer />}
          label="Book Now Clicks"
          value={summary?.bookClicks?.toLocaleString("en-IN") || 0}
          sub={`${summary?.bookClicksLast30 || 0} in last 30 days`}
        />
        <KpiCard
          icon={<FaWhatsapp />}
          label="WhatsApp Clicks"
          value={summary?.whatsappClicks?.toLocaleString("en-IN") || 0}
          sub="All time"
        />
        <KpiCard
          icon={<FaUsers />}
          label="Unique Sessions"
          value={summary?.uniqueSessions?.toLocaleString("en-IN") || 0}
          sub={`Conversion: ${summary?.conversionRate || 0}%`}
        />
      </div>

      {/* DAILY VIEWS CHART */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <FaChartLine className="text-teal-600" />
            Daily Page Views
          </h2>
          <span className="text-xs text-gray-500">Last {days} days</span>
        </div>

        {daily.length > 0 ? (
          <div className="h-72 w-full">
            <ResponsiveContainer>
              <LineChart data={daily}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="_id"
                  stroke="#9ca3af"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #e5e7eb",
                    fontSize: 13,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#0d9488"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: "#0d9488" }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="py-12 text-center text-sm text-gray-500">
            No data for this period yet.
          </p>
        )}
      </div>

      {/* TOP PAGES + TOP PACKAGES */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* TOP PAGES */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-4 text-lg font-bold text-gray-900">
            🔥 Top Pages
          </h2>

          {topPages.length === 0 ? (
            <p className="text-sm text-gray-500">No data yet.</p>
          ) : (
            <ul className="space-y-3">
              {topPages.map((p, i) => (
                <li
                  key={p._id}
                  className="flex items-center gap-3 border-b border-gray-50 pb-3 last:border-0"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-50 text-xs font-bold text-teal-700">
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm text-gray-700">
                    {p._id}
                  </span>
                  <span className="shrink-0 text-sm font-bold text-gray-900">
                    {p.count}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* TOP PACKAGES */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-4 text-lg font-bold text-gray-900">
            🏆 Top Booked Packages
          </h2>

          {topPackages.length === 0 ? (
            <p className="text-sm text-gray-500">No data yet.</p>
          ) : (
            <ul className="space-y-3">
              {topPackages.map((p, i) => (
                <li
                  key={p._id}
                  className="flex items-center gap-3 border-b border-gray-50 pb-3 last:border-0"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-yellow-50 text-xs font-bold text-yellow-700">
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm text-gray-700">
                    {p.title || "Unknown package"}
                  </span>
                  <span className="shrink-0 text-sm font-bold text-gray-900">
                    {p.count} clicks
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="mb-4 text-lg font-bold text-gray-900">
          🟢 Recent Activity
        </h2>

        {recent.length === 0 ? (
          <p className="text-sm text-gray-500">No events yet.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {recent.slice(0, 20).map((e, i) => (
              <div
                key={i}
                className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${eventColor(
                      e.eventType
                    )}`}
                  >
                    {e.eventType}
                  </span>
                  <span className="text-gray-700">
                    {e.packageTitle || e.serviceTitle || e.page || "—"}
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(e.createdAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ============= KPI CARD COMPONENT ============= */
const KpiCard = ({ icon, label, value, sub, trend }) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
        {icon}
      </div>
      {typeof trend === "number" && (
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-bold ${
            trend >= 0
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {trend >= 0 ? "▲" : "▼"} {Math.abs(trend)}%
        </span>
      )}
    </div>
    <p className="mt-4 text-xs font-medium uppercase tracking-wider text-gray-500">
      {label}
    </p>
    <p className="mt-1 text-2xl font-extrabold text-gray-900">{value}</p>
    {sub && <p className="mt-1 text-xs text-gray-500">{sub}</p>}
  </div>
);

const eventColor = (type) => {
  switch (type) {
    case "book_click":
      return "bg-green-100 text-green-700";
    case "whatsapp_click":
      return "bg-emerald-100 text-emerald-700";
    case "package_view":
    case "service_view":
      return "bg-blue-100 text-blue-700";
    case "search":
      return "bg-yellow-100 text-yellow-700";
    case "page_view":
      return "bg-gray-100 text-gray-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default Analytics;