import { useEffect, useMemo, useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaRedo, FaTimes } from "react-icons/fa";
import api from "../services/api";
import PlaceGrid from "../components/places/PlaceGrid";
import Loader from "../components/common/Loader";

// Categories matching your backend schema
const CATEGORIES = [
  "All",
  "Hotel",
  "Guesthouse",
  "Restaurant",
  "Shop",
];

const Places = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchPlaces();

    // Auto-refresh when the user clicks back to this tab
    const handleFocus = () => {
      fetchPlaces();
    };
    
    window.addEventListener("focus", handleFocus);
    
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const fetchPlaces = async () => {
    try {
      setLoading(true);
      setError(false);

      const res = await api.get("/places");
      const data = res.data;

      const list = data?.places ?? data?.data?.places ?? data?.data ?? [];

      setPlaces(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Failed to load places:", err);
      setError(true);
      setPlaces([]);
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    return places.filter((p) => {
      const matchesCategory =
        category === "All" ||
        (p.type || "").toLowerCase() === category.toLowerCase();

      const haystack = `${p.name || p.title || ""} ${
        p.location || ""
      } ${p.type || ""}`.toLowerCase();

      const matchesSearch = haystack.includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [places, category, search]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
  };

  return (
    <div className="bg-slate-50">
      {/* HERO HEADER */}
      <div className="relative overflow-hidden bg-slate-900">
        <img
          src="/hotel-hero.jpg" // 👈 Changed to hotel image (save an image with this name in public folder)
          alt="Luxury hotel in Goa"
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        
        {/* Dark gradient on the left for text readability, fading out to the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/50 to-transparent" />
        
        {/* Subtle warm tint for a premium sunny feel */}
        <div className="absolute inset-0 bg-gradient-to-tr from-teal-900/20 via-transparent to-amber-500/10" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider !text-white backdrop-blur-sm sm:px-4 sm:py-1.5 sm:text-xs">
            <FaMapMarkerAlt />
            Explore Goa
          </span>

          <h1 className="mt-4 max-w-2xl text-2xl font-extrabold tracking-tight !text-white drop-shadow-md sm:text-3xl md:text-4xl lg:text-5xl">
            Places to Stay & Things to Do
          </h1>

          <p className="mt-3 max-w-xl text-sm !text-white/90 drop-shadow-sm sm:mt-4 sm:text-base">
            Handpicked hotels, guest houses, restaurants and shops —
            all in one place.
          </p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="sticky top-16 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md sm:top-[72px] md:top-20">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          {/* Search row */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search places, locations, categories..."
                className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-11 pr-10 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 sm:py-3 sm:text-base"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <FaTimes className="text-xs" />
                </button>
              )}
            </div>

            {/* Mobile filter indicator */}
            {(category !== "All" || search) && (
              <button
                type="button"
                onClick={clearFilters}
                className="hidden items-center gap-1.5 self-start rounded-lg px-2 py-1 text-xs font-medium text-teal-600 transition hover:bg-teal-50 sm:inline-flex"
              >
                <FaTimes className="text-[10px]" />
                Clear filters
              </button>
            )}
          </div>

          {/* Category chips */}
          <div className="mt-3 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [&::-webkit-scrollbar]:hidden sm:mt-4">
            {CATEGORIES.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition sm:px-4 sm:py-2 sm:text-sm ${
                    active
                      ? "bg-teal-600 !text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:text-teal-700"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* RESULTS */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {loading && (
          <div className="flex min-h-[40vh] items-center justify-center">
            <Loader />
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6 text-center sm:p-10">
            <h2 className="text-lg font-bold text-slate-900">
              Couldn't load places
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Something went wrong. Please try again.
            </p>
            <button
              type="button"
              onClick={fetchPlaces}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              <FaRedo className="text-xs" />
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <PlaceGrid
            places={filtered}
            totalCount={places.length}
            onClearFilters={clearFilters}
          />
        )}
      </div>
    </div>
  );
};

export default Places;