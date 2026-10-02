import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Loader from "../common/Loader";

const GalleryPreview = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await api.get("/gallery");

      const galleryData =
        res.data.gallery ||
        res.data.images ||
        res.data.data ||
        [];

      setGallery(galleryData);
    } catch (err) {
      console.error("Error fetching gallery:", err);
      setGallery([]);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (item) => {
    let image =
      item.fileUrl ||
      item.image ||
      item.imageUrl ||
      item.coverImage ||
      item.url ||
      item.secure_url ||
      item.src ||
      item.path ||
      (item.images && item.images[0]);

    if (!image) {
      return "https://placehold.co/600x400?text=No+Image";
    }

    if (typeof image === "object") {
      image =
        image.fileUrl ||
        image.url ||
        image.imageUrl ||
        image.secure_url ||
        image.path ||
        image.src;
    }

    return image || "https://placehold.co/600x400?text=No+Image";
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader />
      </div>
    );
  }

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-10 text-center">

          <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
            Explore Goa Through Our Gallery
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Beaches, cruises, waterfalls, adventures and unforgettable memories.
          </p>

        </div>

        {/* Gallery */}
        {gallery.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            No gallery images available.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

            {gallery.slice(0, 8).map((item, index) => (
              <div
                key={item._id || index}
                className={`group relative overflow-hidden rounded-3xl shadow-lg
                ${
                  index === 0
                    ? "md:col-span-2 md:row-span-2"
                    : ""
                }`}
              >
                <img
                  src={getImageUrl(item)}
                  alt={item.title || "Gallery"}
                  className="h-44 w-full object-cover transition duration-700 group-hover:scale-110 md:h-64"
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/600x400?text=No+Image";
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

                <div className="absolute bottom-4 left-4 translate-y-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">

                  <h3 className="font-semibold text-white">
                    {item.title || "Goa Experience"}
                  </h3>

                </div>
              </div>
            ))}

          </div>
        )}

        {/* Button */}
        <div className="mt-10 text-center">

          <Link
            to="/gallery"
            className="inline-flex items-center rounded-xl bg-cyan-600 px-7 py-3 font-semibold text-white shadow-lg transition hover:bg-cyan-700"
          >
            Explore Full Gallery →
          </Link>

        </div>

      </div>
    </section>
  );
};

export default GalleryPreview;