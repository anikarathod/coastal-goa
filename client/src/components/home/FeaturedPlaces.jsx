import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import api from "../../services/api";
import PlaceCard from "../places/PlaceCard";
import Loader from "../common/Loader";

const FeaturedPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        // Fetches only the ones marked "Featured" in the admin panel
        const res = await api.get("/places/featured");
        const data = res.data?.places ?? res.data?.data ?? res.data ?? [];
        setPlaces(Array.isArray(data) ? data.slice(0, 4) : []);
      } catch (err) {
        console.error("Failed to fetch featured places:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center bg-white">
        <Loader />
      </div>
    );
  }

  // If no places are marked "Featured", don't show the section at all
  if (places.length === 0) return null;

  return (
    <section className="bg-white px-3 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        
        {/* HEADER */}
        <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row sm:mb-12">
          <div className="text-center sm:text-left">
            <span className="inline-block rounded-full bg-teal-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 sm:text-sm">
              📍 Explore the Best
            </span>
            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Featured Places in Goa
            </h2>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Top-rated hotels, restaurants, and hidden gems.
            </p>
          </div>

          <Link
            to="/places"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-teal-600 bg-white px-5 py-2.5 text-sm font-bold text-teal-700 transition hover:bg-teal-50"
          >
            View All Places
            <FaArrowRight className="text-xs" />
          </Link>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {places.map((place) => (
            <PlaceCard key={place._id} place={place} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedPlaces;