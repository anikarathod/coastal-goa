import { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaSuitcase,
  FaCalendarCheck,
  FaUsers,
  FaImages,
  FaEnvelope,
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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  const cards = [
    {
      title: "Packages",
      value: stats.packages,
      icon: <FaBoxOpen />,
      color: "bg-blue-500",
    },
    {
      title: "Services",
      value: stats.services,
      icon: <FaSuitcase />,
      color: "bg-green-500",
    },
    {
      title: "Gallery",
      value: stats.gallery,
      icon: <FaImages />,
      color: "bg-pink-500",
    },
    {
      title: "Bookings",
      value: stats.bookings,
      icon: <FaCalendarCheck />,
      color: "bg-purple-500",
    },
    {
      title: "Contacts",
      value: stats.contacts,
      icon: <FaEnvelope />,
      color: "bg-orange-500",
    },
    {
      title: "Customers",
      value: stats.customers,
      icon: <FaUsers />,
      color: "bg-cyan-500",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Welcome to Coastal Goa Admin Panel
        </p>
      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {cards.map((card) => (

          <div
            key={card.title}
            className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {card.value}
                </h2>

              </div>

              <div
                className={`rounded-xl p-4 text-2xl text-white ${card.color}`}
              >
                {card.icon}
              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Recent Bookings */}

      <div className="rounded-xl bg-white shadow">

        <div className="border-b p-6">

          <h2 className="text-xl font-semibold">
            Recent Bookings
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="px-6 py-4 text-left">
                  Customer
                </th>

                <th className="px-6 py-4 text-left">
                  Package
                </th>

                <th className="px-6 py-4 text-left">
                  Travel Date
                </th>

                <th className="px-6 py-4 text-left">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {recentBookings.length === 0 ? (

                <tr>

                  <td
                    colSpan="4"
                    className="py-8 text-center text-gray-500"
                  >
                    No bookings yet.
                  </td>

                </tr>

              ) : (

                recentBookings.map((booking) => (

                  <tr
                    key={booking._id}
                    className="border-b"
                  >

                    <td className="px-6 py-4">
                      {booking.name}
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

                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                        {booking.status}
                      </span>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* Recent Contacts */}

      <div className="rounded-xl bg-white shadow">

        <div className="border-b p-6">

          <h2 className="text-xl font-semibold">
            Recent Contact Messages
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="px-6 py-4 text-left">
                  Name
                </th>

                <th className="px-6 py-4 text-left">
                  Subject
                </th>

                <th className="px-6 py-4 text-left">
                  Email
                </th>

              </tr>

            </thead>

            <tbody>

              {recentContacts.length === 0 ? (

                <tr>

                  <td
                    colSpan="3"
                    className="py-8 text-center text-gray-500"
                  >
                    No contact messages.
                  </td>

                </tr>

              ) : (

                recentContacts.map((contact) => (

                  <tr
                    key={contact._id}
                    className="border-b"
                  >

                    <td className="px-6 py-4">
                      {contact.name}
                    </td>

                    <td className="px-6 py-4">
                      {contact.subject}
                    </td>

                    <td className="px-6 py-4">
                      {contact.email}
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;