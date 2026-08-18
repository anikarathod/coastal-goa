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
    <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow">

      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-cyan-600"
      >
        <FaArrowLeft />
        Back
      </button>

      <h1 className="mb-8 text-3xl font-bold">
        Booking Details
      </h1>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <p className="text-gray-500">Customer</p>
          <h2 className="text-xl font-semibold">
            {booking.name}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Phone</p>
          <h2>{booking.phone}</h2>
        </div>

        <div>
          <p className="text-gray-500">Email</p>
          <h2>{booking.email}</h2>
        </div>

        <div>
          <p className="text-gray-500">Package</p>
          <h2>{booking.packageName}</h2>
        </div>

        <div>
          <p className="text-gray-500">Travel Date</p>
          <h2>
            {new Date(
              booking.travelDate
            ).toLocaleDateString()}
          </h2>
        </div>

        <div>
          <p className="text-gray-500">Adults</p>
          <h2>{booking.adults}</h2>
        </div>

        <div>
          <p className="text-gray-500">Children</p>
          <h2>{booking.children}</h2>
        </div>

        <div className="md:col-span-2">
          <p className="text-gray-500">
            Special Requests
          </p>

          <div className="rounded-lg bg-gray-100 p-4">
            {booking.specialRequests || "None"}
          </div>
        </div>

      </div>

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

      <div className="mt-10 flex gap-4">

        <a
          href={`https://wa.me/91${booking.phone}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-white"
        >
          <FaWhatsapp />
          WhatsApp Customer
        </a>

        <button
          onClick={deleteBooking}
          className="flex items-center gap-2 rounded-lg bg-red-500 px-6 py-3 text-white"
        >
          <FaTrash />
          Delete Booking
        </button>

      </div>

    </div>
  );
};

export default BookingDetails;