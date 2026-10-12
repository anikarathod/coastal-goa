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
      <div className="flex min-h-[60vh] items-center justify-center">
        <FaSpinner className="animate-spin text-3xl text-teal-600" />
      </div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 sm:text-3xl">
            Analytics
          </h1>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Track how visitors use Alpha Waves Goa
          </p>
        </div>

        <select
          value={days}
          onChange={(e) => setDays(parseInt(e.target.value))}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 sm:w-auto"
        >
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
        </select>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
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
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 sm:text-lg">
            <FaChartLine className="text-teal-600" />
            Daily Page Views
          </h2>
          <span className="text-xs text-slate-500">Last {days} days</span>
        </div>

        {daily.length > 0 ? (
          <div className="h-64 w-full sm:h-72">
            <ResponsiveContainer>
              <LineChart data={daily} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="_id"
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  interval="preserveStartEnd"
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  width={35}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #e2e8f0",
                    fontSize: 13,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#0d9488"
                  strokeWidth={2.5}
                  dot={{ r: 2.5, fill: "#0d9488" }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="py-12 text-center text-sm text-slate-500">
            No data for this period yet.
          </p>
        )}
      </div>

      {/* TOP PAGES + TOP PACKAGES */}
      <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
        {/* TOP PAGES */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="mb-4 text-base font-bold text-slate-900 sm:text-lg">
            🔥 Top Pages
          </h2>

          {topPages.length === 0 ? (
            <p className="text-sm text-slate-500">No data yet.</p>
          ) : (
            <ul className="space-y-3">
              {topPages.map((p, i) => (
                <li
                  key={p._id}
                  className="flex items-center gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-50 text-xs font-bold text-teal-700">
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm text-slate-700">
                    {p._id}
                  </span>
                  <span className="shrink-0 text-sm font-bold text-slate-900">
                    {p.count}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* TOP PACKAGES */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="mb-4 text-base font-bold text-slate-900 sm:text-lg">
            🏆 Top Booked Packages
          </h2>

          {topPackages.length === 0 ? (
            <p className="text-sm text-slate-500">No data yet.</p>
          ) : (
            <ul className="space-y-3">
              {topPackages.map((p, i) => (
                <li
                  key={p._id}
                  className="flex items-center gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-50 text-xs font-bold text-amber-700">
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm text-slate-700">
                    {p.title || "Unknown package"}
                  </span>
                  <span className="shrink-0 text-sm font-bold text-slate-900">
                    {p.count} clicks
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <h2 className="mb-4 text-base font-bold text-slate-900 sm:text-lg">
          🟢 Recent Activity
        </h2>

        {recent.length === 0 ? (
          <p className="text-sm text-slate-500">No events yet.</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {recent.slice(0, 20).map((e, i) => (
              <div
                key={i}
                className="flex flex-col gap-1.5 py-3 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-2"
              >
                <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${eventColor(
                      e.eventType
                    )}`}
                  >
                    {e.eventType}
                  </span>
                  <span className="min-w-0 truncate text-slate-700">
                    {e.packageTitle || e.serviceTitle || e.page || "—"}
                  </span>
                </div>
                <span className="text-xs text-slate-400">
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
  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
    <div className="flex items-start justify-between gap-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-600 sm:h-10 sm:w-10">
        {icon}
      </div>
      {typeof trend === "number" && (
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold sm:text-xs ${
            trend >= 0
              ? "bg-emerald-100 text-emerald-700"
              : "bg-rose-100 text-rose-700"
          }`}
        >
          {trend >= 0 ? "▲" : "▼"} {Math.abs(trend)}%
        </span>
      )}
    </div>
    <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:mt-4 sm:text-xs sm:font-medium">
      {label}
    </p>
    <p className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
      {value}
    </p>
    {sub && (
      <p className="mt-0.5 truncate text-[11px] text-slate-500 sm:mt-1 sm:text-xs">
        {sub}
      </p>
    )}
  </div>
);

const eventColor = (type) => {
  switch (type) {
    case "book_click":
      return "bg-emerald-100 text-emerald-700";
    case "whatsapp_click":
      return "bg-teal-100 text-teal-700";
    case "package_view":
    case "service_view":
      return "bg-sky-100 text-sky-700";
    case "search":
      return "bg-amber-100 text-amber-700";
    case "page_view":
      return "bg-slate-100 text-slate-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
};

export default Analytics;