import { useEffect, useMemo, useState } from "react";
import api from "../services/api";

import Loader from "../components/common/Loader";
import SearchBar from "../components/common/SearchBar";
import GalleryGrid from "../components/gallery/GalleryGrid";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);

      const res = await api.get("/gallery");

      const galleryData =
        res.data?.gallery ||
        res.data?.images ||
        res.data?.data ||
        [];

      setImages(Array.isArray(galleryData) ? galleryData : []);
    } catch (err) {
      console.error("Gallery Error:", err);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(() => {
    const unique = [
      ...new Set(
        images
          .filter((img) => img.category)
          .map((img) => img.category)
      ),
    ];

    return ["All", ...unique];
  }, [images]);

  const filteredImages = useMemo(() => {
    return images.filter((image) => {
      const matchesSearch =
        (image.title || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (image.location || "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        image.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [images, search, category]);

  return (
    <section className="min-h-screen bg-gray-50 py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-8 text-center sm:mb-10 lg:mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Gallery
          </h1>

          <p className="mt-3 text-sm text-gray-600 sm:text-base">
            Explore beautiful memories captured during our Goa tours.
          </p>
        </div>

        {/* Search */}
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search gallery..."
        />

        {/* Categories */}
        <div className="my-6 flex flex-wrap justify-center gap-2 sm:gap-3">

          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-4 py-2 text-sm transition sm:px-5 ${
                category === item
                  ? "bg-cyan-600 text-white"
                  : "bg-white text-gray-700 shadow hover:bg-cyan-100"
              }`}
            >
              {item}
            </button>
          ))}

        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        ) : (
          <GalleryGrid images={filteredImages} />
        )}

      </div>
    </section>
  );
};

export default Gallery;