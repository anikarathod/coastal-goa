import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaEye,
} from "react-icons/fa";

import api from "../services/api";
import Loader from "../components/common/Loader";

const statusColor = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-green-100 text-green-700",
  Completed: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
};

const MyBookings = () => {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const res = await api.get("/bookings/my");

      setBookings(res.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
    <section className="bg-gray-50 min-h-screen py-16">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-10">

          <h1 className="text-4xl font-bold">
            My Bookings
          </h1>

          <p className="mt-2 text-gray-500">
            View all your bookings and their status.
          </p>

        </div>

        {bookings.length === 0 ? (

          <div className="rounded-2xl bg-white p-16 text-center shadow">

            <img
              src="/images/no-booking.svg"
              alt="No Bookings"
              className="mx-auto mb-8 w-60"
            />

            <h2 className="text-2xl font-bold">
              No Bookings Yet
            </h2>

            <p className="mt-3 text-gray-500">
              Start planning your Goa adventure today.
            </p>

            <Link
              to="/packages"
              className="mt-8 inline-block rounded-xl bg-cyan-600 px-8 py-3 text-white hover:bg-cyan-700"
            >
              Browse Packages
            </Link>

          </div>

        ) : (

          <div className="space-y-8">

            {bookings.map((booking) => (

              <div
                key={booking._id}
                className="rounded-2xl bg-white shadow-lg overflow-hidden"
              >

                <div className="grid md:grid-cols-4">

                  <img
                    src={booking.packageImage}
                    alt={booking.packageName}
                    className="h-72 w-full object-cover"
                  />

                  <div className="col-span-3 p-8">

                    <div className="flex flex-wrap items-center justify-between gap-4">

                      <div>

                        <h2 className="text-2xl font-bold">
                          {booking.packageName}
                        </h2>

                        <p className="text-gray-500">
                          Booking ID : {booking.bookingId}
                        </p>

                      </div>

                      <span
                        className={`rounded-full px-5 py-2 text-sm font-semibold ${
                          statusColor[booking.status]
                        }`}
                      >
                        {booking.status}
                      </span>

                    </div>

                    <div className="mt-8 grid gap-5 md:grid-cols-3">

                      <div className="flex items-center gap-3">

                        <FaCalendarAlt className="text-cyan-600" />

                        <div>

                          <p className="text-sm text-gray-500">
                            Travel Date
                          </p>

                          <p>
                            {new Date(
                              booking.travelDate
                            ).toLocaleDateString()}
                          </p>

                        </div>

                      </div>

                      <div className="flex items-center gap-3">

                        <FaUsers className="text-cyan-600" />

                        <div>

                          <p className="text-sm text-gray-500">
                            Guests
                          </p>

                          <p>
                            {booking.adults} Adults
                          </p>

                        </div>

                      </div>

                      <div className="flex items-center gap-3">

                        <FaMapMarkerAlt className="text-cyan-600" />

                        <div>

                          <p className="text-sm text-gray-500">
                            Destination
                          </p>

                          <p>{booking.location}</p>

                        </div>

                      </div>

                    </div>

                    <div className="mt-8 flex flex-wrap items-center justify-between">

                      <div>

                        <p className="text-sm text-gray-500">
                          Total Paid
                        </p>

                        <p className="text-3xl font-bold text-cyan-600">
                          ₹{booking.totalAmount}
                        </p>

                      </div>

                      <Link
                        to={`/booking/${booking._id}`}
                        className="flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 text-white hover:bg-cyan-700"
                      >
                        <FaEye />

                        View Details
                      </Link>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>
  );
};

export default MyBookings;