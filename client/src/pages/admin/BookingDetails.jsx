import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaWhatsapp,
  FaTrash,
  FaArrowLeft,
} from "react-icons/fa";

import api from "../../services/api";
import Loader from "../../components/common/Loader";

const statusOptions = [
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
];

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    try {
      const res = await api.get(`/bookings/${id}`);
      setBooking(res.data.booking);
    } catch (err) {
      console.error(err);
      alert("Booking not found.");
      navigate("/admin/bookings");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (status) => {
    try {
      await api.put(`/bookings/${id}`, {
        status,
      });

      setBooking((prev) => ({
        ...prev,
        status,
      }));

      alert("Status updated.");
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    }
  };

  const deleteBooking = async () => {
    if (!window.confirm("Delete this booking?")) return;

    try {
      await api.delete(`/bookings/${id}`);

      alert("Booking deleted.");

      navigate("/admin/bookings");
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

  if (!booking) return null;

  return (
    <div className="mx-auto max-w-5xl rounded-xl bg-white p-4 md:p-8 shadow">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm md:text-base text-cyan-600 hover:text-cyan-700"
      >
        <FaArrowLeft />
        Back
      </button>

      {/* Heading */}
      <h1 className="mb-8 text-2xl md:text-3xl font-bold">
        Booking Details
      </h1>

      {/* Booking Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="rounded-lg border bg-gray-50 p-4">
          <p className="text-sm text-gray-500">
            Customer
          </p>
          <h2 className="text-lg font-semibold">
            {booking.name}
          </h2>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <p className="text-sm text-gray-500">
            Phone
          </p>
          <h2>{booking.phone}</h2>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <p className="text-sm text-gray-500">
            Email
          </p>
          <h2>{booking.email || "-"}</h2>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <p className="text-sm text-gray-500">
            Package
          </p>
          <h2>{booking.packageName}</h2>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <p className="text-sm text-gray-500">
            Travel Date
          </p>
          <h2>
            {booking.travelDate
              ? new Date(
                  booking.travelDate
                ).toLocaleDateString()
              : "-"}
          </h2>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <p className="text-sm text-gray-500">
            Adults
          </p>
          <h2>{booking.adults || 1}</h2>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <p className="text-sm text-gray-500">
            Children
          </p>
          <h2>{booking.children || 0}</h2>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <p className="text-sm text-gray-500">
            Status
          </p>
          <h2>{booking.status}</h2>
        </div>

        {/* Special Requests */}
        <div className="md:col-span-2">
          <p className="mb-2 text-sm text-gray-500">
            Special Requests
          </p>

          <div className="rounded-lg bg-gray-100 p-4">
            {booking.specialRequests || "None"}
          </div>
        </div>

      </div>

      {/* Status Update */}
      <div className="mt-8">

        <label className="font-semibold">
          Booking Status
        </label>

        <select
          value={booking.status}
          onChange={(e) =>
            updateStatus(e.target.value)
          }
          className="mt-2 w-full rounded-lg border p-3"
        >
          {statusOptions.map((status) => (
            <option
              key={status}
              value={status}
            >
              {status}
            </option>
          ))}
        </select>

      </div>

      {/* Action Buttons */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">

        <a
          href={`https://wa.me/91${booking.phone}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-white hover:bg-green-600"
        >
          <FaWhatsapp />
          WhatsApp Customer
        </a>

        <button
          onClick={deleteBooking}
          className="flex items-center justify-center gap-2 rounded-lg bg-red-500 px-6 py-3 text-white hover:bg-red-600"
        >
          <FaTrash />
          Delete Booking
        </button>

      </div>

    </div>
  );
};

export default BookingDetails;