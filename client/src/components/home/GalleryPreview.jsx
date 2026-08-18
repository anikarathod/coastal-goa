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
      const res = await api.get("/gallery/featured");

      console.log("Featured Gallery:", res.data);

      setGallery(res.data.gallery || []);
    } catch (err) {
      console.error("Error fetching gallery:", err);
      setGallery([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="bg-gray-100 py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold">
            Explore Goa Through Our Gallery
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            A glimpse of the unforgettable experiences waiting for you.
          </p>
        </div>

        {gallery.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            No gallery images available.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">

            {gallery.map((image) => (
              <div
                key={image._id}
                className="group overflow-hidden rounded-2xl shadow-lg"
              >
                <img
                  src={
                    image.image ||
                    image.coverImage ||
                    "https://placehold.co/600x400?text=No+Image"
                  }
                  alt={image.title}
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
            ))}

          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/gallery"
            className="rounded-lg bg-cyan-600 px-8 py-4 font-semibold text-white hover:bg-cyan-700"
          >
            View Full Gallery
          </Link>
        </div>

      </div>
    </section>
  );
};

export default GalleryPreview;