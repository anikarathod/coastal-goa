import { useEffect, useState } from "react";
import {
  FaSearch,
  FaEye,
  FaPhone,
  FaTrash,
} from "react-icons/fa";

import api from "../../services/api";
import Loader from "../../components/common/Loader";

const statusOptions = [
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
];

const Bookings = () => {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchBookings();
  }, [search, status]);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const res = await api.get("/bookings");

      let data = res.data.bookings || [];

      if (search) {
        data = data.filter(
          (booking) =>
            booking.name
              ?.toLowerCase()
              .includes(search.toLowerCase()) ||
            booking.packageName
              ?.toLowerCase()
              .includes(search.toLowerCase()) ||
            booking.phone?.includes(search)
        );
      }

      if (status) {
        data = data.filter(
          (booking) => booking.status === status
        );
      }

      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, value) => {
    try {
      await api.put(`/bookings/${id}`, {
        status: value,
      });

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === id
            ? { ...booking, status: value }
            : booking
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update booking.");
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking?")) return;

    try {
      await api.delete(`/bookings/${id}`);

      setBookings((prev) =>
        prev.filter((booking) => booking._id !== id)
      );
    } catch (err) {
      console.error(err);
      alert("Failed to delete booking.");
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
          Bookings
        </h1>

        <p className="text-gray-500">
          Manage customer bookings
        </p>
      </div>

      {/* Filters */}

      <div className="grid gap-4 md:grid-cols-2">

        <div className="relative">

          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search booking..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-lg border py-3 pl-12 pr-4"
          />

        </div>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="rounded-lg border p-3"
        >
          <option value="">
            All Status
          </option>

          {statusOptions.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

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
                Phone
              </th>

              <th className="px-6 py-4 text-left">
                Package
              </th>

              <th className="px-6 py-4 text-left">
                Travel Date
              </th>

              <th className="px-6 py-4 text-left">
                Persons
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {bookings.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  className="py-10 text-center text-gray-500"
                >
                  No bookings found.
                </td>

              </tr>

            ) : (

              bookings.map((booking) => (

                <tr
                  key={booking._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="px-6 py-4">
                    {booking.name}
                  </td>

                  <td className="px-6 py-4">
                    {booking.phone}
                  </td>

                  <td className="px-6 py-4">
                    {booking.packageName}
                  </td>

                  <td className="px-6 py-4">
                    {booking.travelDate
                      ? new Date(
                          booking.travelDate
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="px-6 py-4">
                    {booking.adults || 1}
                  </td>

                  <td className="px-6 py-4">

                    <select
                      value={booking.status}
                      onChange={(e) =>
                        updateStatus(
                          booking._id,
                          e.target.value
                        )
                      }
                      className="rounded-lg border p-2"
                    >
                      {statusOptions.map((item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      ))}
                    </select>

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex justify-center gap-2">

                      <button
                        className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
                      >
                        <FaEye />
                      </button>

                      <a
                        href={`tel:${booking.phone}`}
                        className="rounded bg-green-500 p-2 text-white hover:bg-green-600"
                      >
                        <FaPhone />
                      </a>

                      <button
                        onClick={() =>
                          deleteBooking(
                            booking._id
                          )
                        }
                        className="rounded bg-red-500 p-2 text-white hover:bg-red-600"
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Bookings;