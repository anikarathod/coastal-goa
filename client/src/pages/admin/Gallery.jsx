import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaImage,
} from "react-icons/fa";

import api from "../../services/api";
import Loader from "../../components/common/Loader";

const Gallery = () => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);

      const res = await api.get("/gallery");

      console.log("Gallery:", res.data);

      setImages(res.data.gallery || []);
    } catch (err) {
      console.error("Failed to load gallery:", err);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      await api.delete(`/gallery/${id}`);

      setImages((prev) =>
        prev.filter((image) => image._id !== id)
      );

      alert("Image deleted successfully.");
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Failed to delete image."
      );
    }
  };

  const filteredImages = images.filter((image) =>
    image.title?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Gallery
          </h1>

          <p className="text-gray-500">
            Manage website gallery images
          </p>
        </div>

        <Link
          to="/admin/gallery/new"
          className="flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-3 text-white transition hover:bg-cyan-700"
        >
          <FaPlus />
          Upload Images
        </Link>

      </div>

      {/* Search */}

      <div className="relative">

        <FaSearch className="absolute left-4 top-4 text-gray-400" />

        <input
          type="text"
          placeholder="Search gallery..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border py-3 pl-12 pr-4"
        />

      </div>

      {/* Empty State */}

      {filteredImages.length === 0 ? (

        <div className="rounded-xl bg-white p-16 text-center shadow">

          <FaImage className="mx-auto text-6xl text-gray-300" />

          <h2 className="mt-6 text-2xl font-bold">
            No Images Found
          </h2>

          <p className="mt-2 text-gray-500">
            Upload your first gallery image.
          </p>

        </div>

      ) : (

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {filteredImages.map((item) => (
    <div
      key={item._id}
      className="overflow-hidden rounded-xl bg-white shadow"
    >
      {/* IMAGE */}
      {item.mediaType === "image" && (
        <img
          src={item.fileUrl}
          alt={item.title}
          className="h-56 w-full object-cover"
        />
      )}

      {/* VIDEO */}
      {item.mediaType === "video" && (
        <video
          src={item.fileUrl}
          controls
          className="h-56 w-full object-cover"
        />
      )}

      <div className="space-y-2 p-5">
        <h3 className="font-semibold">
          {item.title}
        </h3>

        <p className="text-sm text-gray-500">
          {item.category}
        </p>

        <p className="text-sm text-gray-400">
          {item.location}
        </p>

        <div className="flex items-center justify-between pt-3">
          <span
  className={`rounded-full px-3 py-1 text-xs font-medium ${
    item.mediaType === "image"
      ? "bg-blue-100 text-blue-600"
      : "bg-green-100 text-green-600"
  }`}
>
  {item.mediaType?.toUpperCase()}
</span>
          <div className="flex gap-2">
            <Link
              to={`/admin/gallery/edit/${item._id}`}
              className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
            >
              <FaEdit />
            </Link>

            <button
              onClick={() => deleteImage(item._id)}
              className="rounded bg-red-500 p-2 text-white hover:bg-red-600"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

      )}

    </div>
  );
};

export default Gallery;