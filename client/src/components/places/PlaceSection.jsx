// client/src/components/places/PlaceSection.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRedo, FaArrowRight } from "react-icons/fa";
import api from "../../services/api";
import PlaceCard from "./PlaceCard";

export default function PlaceSection({
  type,                       // "hotel" | "guesthouse" | "restaurant" | "shop"
  title,                      // section heading
  subtitle,                   // small text under heading
  badge,                      // pill above heading (e.g. "🏨 Stay in Goa")
  bg = "bg-white",            // background class
  limit = 8,                  // how many places to fetch
  viewAllTo,                  // optional: e.g. "/hotels" — shows a "See all" link
}) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        setError(false);

        const res = await api.get(
          `/places?type=${encodeURIComponent(type)}&limit=${limit}`
        );
        const data = res.data;
        const list =
          data?.places ?? data?.data?.places ?? data?.data ?? [];

        if (mounted) {
          setPlaces(Array.isArray(list) ? list.slice(0, limit) : []);
        }
      } catch (err) {
        console.error(`Failed to load ${type}:`, err.message);
        if (mounted) setError(true);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [type, limit]);

  const retry = () => {
    // Trigger effect again
    setLoading(true);
    setError(false);
    setPlaces([]);
    // Re-fetch manually (same logic as in effect)
    (async () => {
      try {
        const res = await api.get(
          `/places?type=${encodeURIComponent(type)}&limit=${limit}`
        );
        const data = res.data;
        const list =
          data?.places ?? data?.data?.places ?? data?.data ?? [];
        setPlaces(Array.isArray(list) ? list.slice(0, limit) : []);
      } catch (err) {
        console.error(`Retry failed for ${type}:`, err.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <section className={`${bg} px-3 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20`}>
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-6 text-center sm:mb-10">
          {badge && (
            <span className="inline-block rounded-full bg-teal-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-teal-700 sm:px-4 sm:py-1.5 sm:text-sm">
              {badge}
            </span>
          )}
          <h2 className="mt-3 text-xl font-extrabold tracking-tight text-slate-900 sm:mt-4 sm:text-3xl lg:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto mt-2 max-w-2xl text-xs text-slate-600 sm:mt-3 sm:text-base">
              {subtitle}
            </p>
          )}
        </div>

        {/* LOADING SKELETONS */}
        {loading && (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <div className="h-40 bg-slate-200 sm:h-48 md:h-52" />
                <div className="space-y-2 p-2.5 sm:space-y-3 sm:p-4">
                  <div className="h-4 w-3/4 rounded bg-slate-200 sm:h-5" />
                  <div className="h-3 w-1/2 rounded bg-slate-200 sm:h-4" />
                  <div className="h-8 rounded-lg bg-slate-200 sm:h-10" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ERROR STATE */}
        {!loading && error && (
          <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6 text-center">
            <p className="text-sm text-slate-600">
              Couldn't load this section.
            </p>
            <button
              type="button"
              onClick={retry}
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              <FaRedo className="text-xs" />
              Retry
            </button>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && places.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center sm:p-10">
            <p className="text-sm text-slate-500">
              No {title.toLowerCase()} listed yet.
            </p>
            {viewAllTo && (
              <Link
                to={viewAllTo}
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-800"
              >
                Explore all
                <FaArrowRight className="text-[10px]" />
              </Link>
            )}
          </div>
        )}

        {/* GRID */}
        {!loading && !error && places.length > 0 && (
          <>
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
              {places.map((place) => (
                <PlaceCard key={place._id ?? place.slug} place={place} />
              ))}
            </div>

            {viewAllTo && (
              <div className="mt-8 text-center sm:mt-10">
                <Link
                  to={viewAllTo}
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-teal-600 bg-white px-5 py-2.5 text-sm font-bold text-teal-700 transition hover:bg-teal-50 sm:min-h-11 sm:px-7"
                >
                  See All {title}
                  <FaArrowRight className="text-xs" />
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}