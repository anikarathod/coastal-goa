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

      console.log("Gallery Response:", res.data);

      setImages(
        Array.isArray(res.data.gallery)
          ? res.data.gallery
          : []
      );
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
    <section className="bg-gray-50 py-16">

      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mb-12 text-center">

          <h1 className="text-4xl font-bold text-gray-900">
            Gallery
          </h1>

          <p className="mt-4 text-gray-600">
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

        <div className="my-8 flex flex-wrap justify-center gap-3">

          {categories.map((item) => (

            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-5 py-2 transition ${
                category === item
                  ? "bg-cyan-600 text-white"
                  : "bg-white text-gray-700 shadow hover:bg-cyan-100"
              }`}
            >
              {item}
            </button>

          ))}

        </div>

        {/* Gallery */}

        {loading ? (

          <div className="flex justify-center py-24">
            <Loader />
          </div>

        ) : (

          <GalleryGrid
            images={filteredImages}
          />

        )}

      </div>

    </section>
  );
};

export default Gallery;