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

      console.log("Gallery Response:", res.data);

      const galleryData =
        res.data.gallery ||
        res.data.images ||
        res.data.data ||
        [];

      console.log("Gallery Data:", galleryData);

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
    return <Loader />;
  }

  return (
    <section className="bg-gray-100 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Explore Goa Through Our Gallery
          </h2>

          <p className="mt-3 text-gray-600">
            A glimpse of unforgettable experiences.
          </p>
        </div>

        {gallery.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            No gallery images available.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {gallery.slice(0, 8).map((item, index) => (
              <div
                key={item._id || index}
                className="overflow-hidden rounded-xl shadow-md"
              >
                <img
                  src={getImageUrl(item)}
                  alt={item.title || "Gallery"}
                  className="h-40 w-full object-cover transition duration-500 hover:scale-110"
                  onError={(e) => {
                    console.log("Failed Image:", item);
                    e.target.src =
                      "https://placehold.co/600x400?text=No+Image";
                  }}
                />
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            to="/gallery"
            className="rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white hover:bg-cyan-700"
          >
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;