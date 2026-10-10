import { useEffect, useState } from "react";
import {
  FaMapMarkedAlt,
  FaDirections,
  FaPhone,
  FaClock,
  FaExclamationCircle,
} from "react-icons/fa";
import api from "../../services/api";

const Map = () => {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    let active = true;

    const fetchSettings = async () => {
      try {
        const res = await api.get("/settings");
        if (!active) return;
        setSettings(res.data?.settings || null);
      } catch (err) {
        console.error("Failed to load map settings:", err.message);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchSettings();
    return () => {
      active = false;
    };
  }, []);

  // ---- LOADING SKELETON ----
  if (loading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="h-24 animate-pulse bg-gray-100" />
        <div className="h-[450px] animate-pulse bg-gray-200" />
      </div>
    );
  }

  // ---- FALLBACK: No map URL configured ----
  if (!settings?.googleMaps) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-gray-100 bg-teal-50 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white">
              <FaMapMarkedAlt className="text-2xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Visit Our Office
              </h2>
              {settings?.address && (
                <p className="mt-1 text-sm text-gray-600 sm:text-base">
                  {settings.address}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Placeholder content */}
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-50">
            <FaExclamationCircle className="text-2xl text-yellow-500" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            Map not configured yet
          </h3>
          <p className="mt-2 max-w-md text-sm text-gray-500">
            Add your Google Maps Embed URL in the admin settings to display
            your location here.
          </p>

          {/* Contact chips as fallback */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {settings?.phone && (
              <a
                href={`tel:${settings.phone}`}
                className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
              >
                <FaPhone className="text-teal-600" />
                {settings.phone}
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ---- SUCCESS: Show map ----
  const directionsUrl =
    settings.latitude && settings.longitude
      ? `https://www.google.com/maps/dir/?api=1&destination=${settings.latitude},${settings.longitude}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          settings.address || "Candolim, Goa"
        )}`;

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

      {/* HEADER */}
      <div className="border-b border-gray-100 bg-gradient-to-r from-teal-600 to-teal-700 p-6 text-white sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
            <FaMapMarkedAlt className="text-2xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">
              Visit Our Office
            </h2>
            {settings.address && (
              <p className="mt-1 text-sm text-teal-50 sm:text-base">
                {settings.address}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* MAP */}
      <div className="relative h-72 w-full sm:h-96 lg:h-[450px]">
        <iframe
          title="Office Location"
          src={settings.googleMaps}
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="border-0"
        />
      </div>

      {/* FOOTER */}
      <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-100 bg-gray-50 p-5 sm:p-6 md:flex-row">
        <div className="text-center md:text-left">
          <h3 className="font-semibold text-gray-900">
            Planning to visit us?
          </h3>
          <p className="mt-0.5 text-sm text-gray-600">
            Get directions to reach our office easily.
          </p>
        </div>

        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"
        >
          <FaDirections />
          Get Directions
        </a>
      </div>
    </section>
  );
};

export default Map;