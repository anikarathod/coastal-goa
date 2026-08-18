import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PLACEHOLDER =
  "https://placehold.co/1200x600?text=Coastal+Goa";

const PackageGallery = ({ images = [] }) => {
  const validImages = images.filter(
    (img) => img && img.trim() !== ""
  );

  const [selectedImage, setSelectedImage] =
    useState(PLACEHOLDER);

  useEffect(() => {
    if (validImages.length > 0) {
      setSelectedImage(validImages[0]);
    } else {
      setSelectedImage(PLACEHOLDER);
    }
  }, [images]);

  const currentIndex =
    validImages.indexOf(selectedImage);

  const previousImage = () => {
    const index =
      currentIndex === 0
        ? validImages.length - 1
        : currentIndex - 1;

    setSelectedImage(validImages[index]);
  };

  const nextImage = () => {
    const index =
      currentIndex === validImages.length - 1
        ? 0
        : currentIndex + 1;

    setSelectedImage(validImages[index]);
  };

  return (
    <div className="space-y-6">

      {/* Main Image */}
      <div className="relative overflow-hidden rounded-2xl shadow-xl">

        <img
          src={selectedImage || PLACEHOLDER}
          alt="Package"
          className="h-[500px] w-full object-cover"
          onError={(e) => {
            e.target.src = PLACEHOLDER;
          }}
        />

        {validImages.length > 1 && (
          <>
            <button
              onClick={previousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white hover:bg-cyan-600"
            >
              <FaChevronLeft />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white hover:bg-cyan-600"
            >
              <FaChevronRight />
            </button>
          </>
        )}

      </div>

      {/* Thumbnails */}
      {validImages.length > 1 && (
        <div className="grid grid-cols-4 gap-4 md:grid-cols-6">

          {validImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={`overflow-hidden rounded-xl border-4 transition ${
                selectedImage === image
                  ? "border-cyan-600"
                  : "border-transparent"
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="h-24 w-full object-cover"
                onError={(e) => {
                  e.target.src = PLACEHOLDER;
                }}
              />
            </button>
          ))}

        </div>
      )}

    </div>
  );
};

export default PackageGallery;