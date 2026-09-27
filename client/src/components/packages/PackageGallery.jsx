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
    <div className="space-y-4 sm:space-y-6">

      {/* Main Image */}
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-xl">

        <img
          src={selectedImage || PLACEHOLDER}
          alt="Package"
          className="h-[250px] sm:h-[400px] md:h-[500px] lg:h-[650px] w-full object-cover"
          onError={(e) => {
            e.target.src = PLACEHOLDER;
          }}
        />

        {validImages.length > 1 && (
          <>
            <button
              onClick={previousImage}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 sm:p-3 text-white transition hover:bg-cyan-600"
            >
              <FaChevronLeft className="text-sm sm:text-base" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 sm:p-3 text-white transition hover:bg-cyan-600"
            >
              <FaChevronRight className="text-sm sm:text-base" />
            </button>
          </>
        )}

      </div>

      {/* Thumbnails */}
      {validImages.length > 1 && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 sm:gap-4">

          {validImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={`overflow-hidden rounded-lg sm:rounded-xl border-2 sm:border-4 transition ${
                selectedImage === image
                  ? "border-cyan-600"
                  : "border-transparent"
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="h-16 sm:h-20 md:h-24 w-full object-cover"
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