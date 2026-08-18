const BookingTable = ({ bookings = [] }) => {
  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow">
      <table className="w-full">
        <thead className="bg-cyan-600 text-white">
          <tr>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Package</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings.length ? (
            bookings.map((booking) => (
              <tr key={booking._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{booking.name}</td>
                <td className="p-3">{booking.packageName}</td>
                <td className="p-3">{booking.travelDate}</td>
                <td className="p-3">
                  <span className="rounded bg-green-100 px-2 py-1 text-sm text-green-700">
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-4 text-center" colSpan="4">
                No Bookings Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;