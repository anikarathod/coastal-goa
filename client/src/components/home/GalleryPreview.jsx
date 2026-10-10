import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaImages } from "react-icons/fa";
import api from "../../services/api";
import Loader from "../common/Loader";

// Self-contained SVG fallback — no external request needed
const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='600' height='400' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='20' fill='%23475569' text-anchor='middle' dominant-baseline='middle'%3EGoa Gallery%3C/text%3E%3C/svg%3E";

const GalleryPreview = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchGallery = async () => {
      try {
        const res = await api.get("/gallery");
        const data = res.data;

        const galleryData =
          data?.gallery ??
          data?.images ??
          data?.data?.gallery ??
          data?.data?.images ??
          data?.data ??
          [];

        if (isMounted) {
          setGallery(Array.isArray(galleryData) ? galleryData : []);
        }
      } catch (err) {
        console.error("Error fetching gallery:", err);
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchGallery();

    return () => {
      isMounted = false;
    };
  }, []);

  const getImageUrl = (item) => {
    let image =
      item?.fileUrl ??
      item?.image ??
      item?.imageUrl ??
      item?.coverImage ??
      item?.url ??
      item?.secure_url ??
      item?.src ??
      item?.path ??
      item?.images?.[0];

    if (image && typeof image === "object") {
      image =
        image.fileUrl ??
        image.url ??
        image.imageUrl ??
        image.secure_url ??
        image.path ??
        image.src;
    }

    return typeof image === "string" && image.trim()
      ? image
      : FALLBACK_IMAGE;
  };

  if (loading) {
    return (
      <section className="flex min-h-64 items-center justify-center bg-slate-50 py-10">
        <Loader />
      </section>
    );
  }

  const previewItems = gallery.slice(0, 8);

  return (
    <section
      id="gallery"
      className="bg-slate-50 px-3 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-6 text-center sm:mb-10">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-teal-700 sm:text-sm">
            <FaImages />
            Goa in Pictures
          </p>

          <h2 className="mt-2 text-xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl">
            Explore Our Gallery
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500 sm:text-base">
            Real moments from real trips — captured on our tours across Goa.
          </p>
        </div>

        {/* Error state */}
        {error && (
          <p className="py-8 text-center text-sm text-slate-500">
            Gallery images couldn't be loaded. Please try again later.
          </p>
        )}

        {/* Empty state */}
        {!error && gallery.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-10 text-center">
            <FaImages className="mx-auto text-3xl text-teal-700" />
            <p className="mt-3 text-sm text-slate-600">
              Gallery images will appear here soon.
            </p>
          </div>
        )}

        {/* Auto-fit grid — looks intentional with 2, 4, 6 or 8 images */}
        {!error && previewItems.length > 0 && (
          <div
            className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5"
            style={{
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
              maxWidth: previewItems.length < 4 ? "820px" : undefined,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {previewItems.map((item, index) => (
              <Link
                key={item._id ?? item.id ?? index}
                to="/gallery"
                aria-label={`View ${item.title || "Goa gallery"}`}
                className="group relative aspect-[4/3] min-w-0 overflow-hidden rounded-xl bg-slate-200 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-2xl"
              >
                <img
                  src={getImageUrl(item)}
                  alt={item.title || "Goa travel experience"}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = FALLBACK_IMAGE;
                  }}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 transition group-hover:opacity-100" />

                <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-4">
                  <h3 className="line-clamp-2 text-xs font-bold capitalize text-white sm:text-sm">
                    {item.title || "Discover Goa"}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* View all */}
        <div className="mt-7 text-center sm:mt-10">
          <Link
            to="/gallery"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-800 sm:min-h-12 sm:px-8 sm:text-base"
          >
            View Full Gallery
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;