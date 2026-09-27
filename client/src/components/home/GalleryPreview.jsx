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
    <section className="bg-gray-100 py-10 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-8 sm:mb-10 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
            Explore Goa Through Our Gallery
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 sm:text-base">
            A glimpse of unforgettable experiences across Goa.
          </p>
        </div>

        {/* Gallery Grid */}
        {gallery.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            No gallery images available.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {gallery.slice(0, 8).map((item, index) => (
              <div
                key={item._id || index}
                className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
              >
                <img
                  src={getImageUrl(item)}
                  alt={item.title || "Gallery"}
                  className="h-40 w-full object-cover transition duration-500 group-hover:scale-110 sm:h-52 md:h-56 lg:h-64"
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/600x400?text=No+Image";
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Button */}
        <div className="mt-8 sm:mt-10 text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center justify-center rounded-xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-cyan-700 hover:shadow-xl"
          >
            View Full Gallery
          </Link>
        </div>

      </div>
    </section>
  );
};

export default GalleryPreview;