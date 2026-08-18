import { useEffect, useState } from "react";
import {
  FaSearch,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaTrash,
  FaCheckCircle,
} from "react-icons/fa";

import api from "../../services/api";
import Loader from "../../components/common/Loader";

const Contacts = () => {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

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
      await api.put(`/contact/${id}/read`);

      setContacts((prev) =>
        prev.map((contact) =>
          contact._id === id
            ? {
                ...contact,
                isRead: true,
                status: "Read",
              }
            : contact
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      await api.delete(`/contact/${id}`);

      setContacts((prev) =>
        prev.filter((contact) => contact._id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    const text = search.toLowerCase();

    return (
      contact.name?.toLowerCase().includes(text) ||
      contact.email?.toLowerCase().includes(text) ||
      contact.subject?.toLowerCase().includes(text) ||
      contact.phone?.includes(search)
    );
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Contact Messages
        </h1>

        <p className="text-gray-500">
          Customer enquiries
        </p>
      </div>

      {/* Search */}

      <div className="relative">

        <FaSearch className="absolute left-4 top-4 text-gray-400" />

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border py-3 pl-12 pr-4"
        />

      </div>

      {/* Messages */}

      <div className="space-y-5">

        {filteredContacts.length === 0 ? (

          <div className="rounded-xl bg-white p-10 text-center shadow">
            No contact messages found.
          </div>

        ) : (

          filteredContacts.map((contact) => (

            <div
              key={contact._id}
              className="rounded-xl bg-white p-6 shadow"
            >

              <div className="flex flex-wrap justify-between gap-5">

                <div>

                  <h2 className="text-xl font-bold">
                    {contact.name}
                  </h2>

                  <p className="text-gray-500">
                    {contact.subject}
                  </p>

                  <p className="mt-1 text-sm text-gray-400">
                    {new Date(
                      contact.createdAt
                    ).toLocaleString()}
                  </p>

                </div>

                <span
                  className={`rounded-full px-3 py-1 text-sm ${
                    contact.isRead
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {contact.isRead
                    ? "Read"
                    : "Unread"}
                </span>

              </div>

              <div className="mt-4">

                <p>
                  <strong>Email:</strong>{" "}
                  {contact.email}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {contact.phone || "-"}
                </p>

              </div>

              <div className="mt-5 rounded-lg bg-gray-50 p-4">
                {contact.message}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">

                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white"
                >
                  <FaEnvelope />
                  Email
                </a>

                {contact.phone && (
                  <>
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white"
                    >
                      <FaPhone />
                      Call
                    </a>

                    <a
                      href={`https://wa.me/91${contact.phone}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white"
                    >
                      <FaWhatsapp />
                      WhatsApp
                    </a>
                  </>
                )}

                {!contact.isRead && (
                  <button
                    onClick={() =>
                      markRead(contact._id)
                    }
                    className="flex items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 text-white"
                  >
                    <FaCheckCircle />
                    Mark Read
                  </button>
                )}

                <button
                  onClick={() =>
                    deleteMessage(contact._id)
                  }
                  className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white"
                >
                  <FaTrash />
                  Delete
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
};

export default Contacts;