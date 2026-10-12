const BookingTable = ({ bookings = [] }) => {
  const formatDate = (value) => {
    if (!value) return "—";
    const d = new Date(value);
    if (isNaN(d)) return value;
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const StatusPill = ({ status }) => {
    const s = (status || "").toLowerCase();
    const styles =
      s === "confirmed"
        ? "bg-emerald-100 text-emerald-700"
        : s === "pending"
        ? "bg-amber-100 text-amber-700"
        : s === "cancelled"
        ? "bg-rose-100 text-rose-700"
        : "bg-slate-100 text-slate-700";
    return (
      <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${styles}`}>
        {status || "—"}
      </span>
    );
  };

  if (!bookings.length) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow-sm">
        <p className="text-sm text-slate-500">No bookings found</p>
      </div>
    );
  }

  return (
    <>
      {/* ============================================
          DESKTOP — table
          ============================================ */}
      <div className="hidden overflow-x-auto rounded-xl bg-white shadow-sm md:block">
        <table className="w-full">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="p-4 text-left text-sm font-semibold">Customer</th>
              <th className="p-4 text-left text-sm font-semibold">Package</th>
              <th className="p-4 text-left text-sm font-semibold">Date</th>
              <th className="p-4 text-left text-sm font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking._id}
                className="border-b border-slate-100 transition hover:bg-slate-50"
              >
                <td className="p-4 text-sm text-slate-800">{booking.name}</td>
                <td className="p-4 text-sm text-slate-600">
                  {booking.packageName}
                </td>
                <td className="p-4 text-sm text-slate-600">
                  {formatDate(booking.travelDate)}
                </td>
                <td className="p-4">
                  <StatusPill status={booking.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ============================================
          MOBILE — cards
          ============================================ */}
      <div className="space-y-3 md:hidden">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {booking.name}
                </p>
                <p className="mt-0.5 truncate text-xs text-slate-500">
                  {booking.packageName || "—"}
                </p>
              </div>
              <StatusPill status={booking.status} />
            </div>

            <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3 text-xs text-slate-500">
              <span className="font-medium text-slate-600">Travel date:</span>
              <span>{formatDate(booking.travelDate)}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BookingTable;