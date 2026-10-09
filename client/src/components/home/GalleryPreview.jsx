
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaImages } from "react-icons/fa";
import api from "../../services/api";
import Loader from "../common/Loader";

const FALLBACK_IMAGE =
  "https://placehold.co/800x600/e2e8f0/475569?text=Goa+Gallery";

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
        if (isMounted) {
          setGallery([]);
          setError(true);
        }
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
      item?.fileUrl ||
      item?.image ||
      item?.imageUrl ||
      item?.coverImage ||
      item?.url ||
      item?.secure_url ||
      item?.src ||
      item?.path ||
      item?.images?.[0];

    if (image && typeof image === "object") {
      image =
        image.fileUrl ||
        image.url ||
        image.imageUrl ||
        image.secure_url ||
        image.path ||
        image.src;
    }

    return typeof image === "string" && image.trim()
      ? image
      : FALLBACK_IMAGE;
  };

  if (loading) {
    return (
      <section className="flex min-h-64 items-center justify-center bg-slate-50 py-16">
        <Loader />
      </section>
    );
  }

  return (
    <section
      id="gallery"
      className="bg-slate-50 px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-teal-700">
            <FaImages />
            Goa in Pictures
          </span>

          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Explore Goa Through Our Gallery
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
            Discover beautiful beaches, breathtaking waterfalls,
            exciting adventures and unforgettable holiday moments.
          </p>

          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-teal-600" />
        </div>

        {/* Gallery error */}
        {error && (
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-8 text-center">
            <p className="font-semibold text-slate-800">
              Gallery images couldn't be loaded.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Please try again later.
            </p>
          </div>
        )}

        {/* Empty gallery */}
        {!error && gallery.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-12 text-center">
            <FaImages className="mx-auto text-3xl text-teal-700" />

            <h3 className="mt-4 text-lg font-bold text-slate-900">
              Our gallery is growing
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              Amazing Goa memories will appear here soon.
            </p>
          </div>
        )}

        {/* Gallery grid */}
        {!error && gallery.length > 0 && (
          <div className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] sm:gap-4 md:auto-rows-[200px] md:grid-cols-4 lg:auto-rows-[220px] lg:gap-5">
            {gallery.slice(0, 8).map((item, index) => (
              <Link
                to="/gallery"
                key={item._id ?? item.id ?? index}
                aria-label={`Explore ${item.title || "Goa gallery"}`}
                className={`group relative min-w-0 overflow-hidden rounded-2xl bg-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl ${
                  index === 0
                    ? "col-span-2 row-span-2"
                    : index === 5
                    ? "col-span-2 md:col-span-1"
                    : ""
                }`}
              >
                <img
                  src={getImageUrl(item)}
                  alt={item.title || "Goa travel experience"}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = FALLBACK_IMAGE;
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
                  <p className="translate-y-1 text-sm font-bold text-white transition-transform duration-300 group-hover:translate-y-0 sm:text-base">
                    {item.title || "Discover Goa"}
                  </p>

                  <span className="mt-1 inline-flex items-center gap-2 text-xs font-semibold text-teal-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Explore Gallery <FaArrowRight />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* View gallery */}
        <div className="mt-9 text-center sm:mt-12">
          <Link
            to="/gallery"
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-teal-700 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-teal-900/10 transition hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:px-8 sm:text-base"
          >
            Explore Full Gallery
            <FaArrowRight />
          </Link>

          <p className="mt-3 text-xs text-slate-500">
            Your next Goa adventure starts here
          </p>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
