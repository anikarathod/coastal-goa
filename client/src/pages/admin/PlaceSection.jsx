// client/src/pages/admin/PlacesAdmin.jsx
import { useEffect, useMemo, useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaRedo,
  FaHotel,
  FaHome,
  FaUtensils,
  FaStore,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";
import api, { resolveImage } from "../../services/api";
import PlaceForm from "../../components/admin/PlaceForm";

const TABS = [
  { key: "all", label: "All", Icon: null },
  { key: "hotel", label: "Hotels", Icon: FaHotel },
  { key: "guesthouse", label: "Guest Houses", Icon: FaHome },
  { key: "restaurant", label: "Restaurants", Icon: FaUtensils },
  { key: "shop", label: "Shops", Icon: FaStore },
];

const TYPE_LABEL = {
  hotel: "Hotel",
  guesthouse: "Guest House",
  restaurant: "Restaurant",
  shop: "Shop",
};

const TYPE_BADGE = {
  hotel: "bg-teal-100 text-teal-700",
  guesthouse: "bg-amber-100 text-amber-700",
  restaurant: "bg-rose-100 text-rose-700",
  shop: "bg-indigo-100 text-indigo-700",
};

export default function PlacesAdmin() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null); // place object or null

  const fetchPlaces = async () => {
    try {
      setLoading(true);
      setError(false);

      const res = await api.get("/places");
      const data = res.data;
      const list = data?.places ?? data?.data?.places ?? data?.data ?? [];

      setPlaces(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Failed to load places:", err.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  const filtered = useMemo(() => {
    let list = places;

    if (tab !== "all") {
      list = list.filter((p) => p.type === tab);
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.location?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [places, tab, query]);

  const counts = useMemo(() => {
    return {
      all: places.length,
      hotel: places.filter((p) => p.type === "hotel").length,
      guesthouse: places.filter((p) => p.type === "guesthouse").length,
      restaurant: places.filter((p) => p.type === "restaurant").length,
      shop: places.filter((p) => p.type === "shop").length,
    };
  }, [places]);

  const handleCreate = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (place) => {
    setEditing(place);
    setShowForm(true);
  };

  const handleDelete = async (place) => {
    const confirmed = window.confirm(
      `Delete "${place.name}"? This cannot be undone.`
    );
    if (!confirmed) return;

    try {
      await api.delete(`/places/${place._id}`);
      setPlaces((prev) => prev.filter((p) => p._id !== place._id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert(err.response?.data?.message || "Failed to delete place.");
    }
  };

  const handleSaved = () => {
    setShowForm(false);
    setEditing(null);
    fetchPlaces();
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 sm:mb-8">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Places
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Manage hotels, guest houses, restaurants & shops.
            </p>
          </div>

          <button
            onClick={handleCreate}
            className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-teal-700"
          >
            <FaPlus className="text-xs" />
            Add Place
          </button>
        </div>

        {/* Tabs + Search */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {TABS.map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition sm:text-sm ${
                  tab === key
                    ? "bg-teal-600 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                {Icon && <Icon className="text-[10px] sm:text-xs" />}
                {label}
                <span
                  className={`ml-1 rounded-full px-1.5 py-0.5 text-[10px] ${
                    tab === key
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {counts[key]}
                </span>
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or location..."
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            />
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <div className="h-40 bg-slate-200" />
                <div className="space-y-2 p-4">
                  <div className="h-4 w-3/4 rounded bg-slate-200" />
                  <div className="h-3 w-1/2 rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6 text-center">
            <p className="text-sm text-slate-600">
              Couldn't load places. Please try again.
            </p>
            <button
              onClick={fetchPlaces}
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
            >
              <FaRedo className="text-xs" />
              Retry
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="text-sm text-slate-500">
              {query || tab !== "all"
                ? "No places match your filter."
                : "No places yet — add your first one!"}
            </p>
            {!query && tab === "all" && (
              <button
                onClick={handleCreate}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-bold text-white hover:bg-teal-700"
              >
                <FaPlus className="text-xs" />
                Add Place
              </button>
            )}
          </div>
        )}

        {/* Grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((place) => {
              const img = resolveImage(
                place.image ??
                  place.coverImage ??
                  place.imageUrl ??
                  (Array.isArray(place.images) ? place.images[0] : null)
              );

              return (
                <div
                  key={place._id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  <div className="relative h-40 w-full bg-slate-100">
                    {img ? (
                      <img
                        src={img}
                        alt={place.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-slate-400">
                        No image
                      </div>
                    )}

                    <span
                      className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                        TYPE_BADGE[place.type] || "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {TYPE_LABEL[place.type] || place.type}
                    </span>

                    {!place.isActive && (
                      <span className="absolute right-2 top-2 rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-white">
                        Inactive
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="line-clamp-1 text-base font-bold text-slate-900">
                      {place.name}
                    </h3>

                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                      {place.location && (
                        <span className="inline-flex items-center gap-1">
                          <FaMapMarkerAlt className="text-teal-600" />
                          {place.location}
                        </span>
                      )}
                      {place.rating > 0 && (
                        <span className="inline-flex items-center gap-1">
                          <FaStar className="text-amber-400" />
                          {place.rating}
                        </span>
                      )}
                    </div>

                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(place)}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                      >
                        <FaEdit className="text-[10px]" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(place)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-rose-200 bg-white px-3 py-2 text-xs font-bold text-rose-600 transition hover:bg-rose-50"
                      >
                        <FaTrash className="text-[10px]" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Form modal */}
      {showForm && (
        <PlaceForm
          initial={editing}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}