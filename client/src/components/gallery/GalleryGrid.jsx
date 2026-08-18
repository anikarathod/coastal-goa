import { useState } from "react";
import GalleryCard from "./GalleryCard";
import Lightbox from "./Lightbox";
import Loader from "../common/Loader";

const GalleryGrid = ({
  images = [],
  loading = false,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader />
      </div>
    );
  }

  if (!images.length) {
    return (
      <div className="py-20 text-center">

        <img
          src="/images/empty-gallery.svg"
          alt="No Images"
          className="mx-auto mb-6 w-64"
        />

        <h2 className="text-3xl font-bold text-gray-700">
          No Gallery Images Found
        </h2>

        <p className="mt-3 text-gray-500">
          New travel memories will appear here soon.
        </p>

      </div>
    );
  }

  return (
    <>
      <section className="py-16">

        {/* Heading */}

        <div className="mb-10 text-center">

          <h2 className="text-4xl font-bold text-gray-900">
            Travel Gallery
          </h2>

          <p className="mt-3 text-gray-600">
            Explore unforgettable moments captured across Goa.
          </p>

        </div>

        {/* Gallery */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {images.map((image) => (
            <GalleryCard
              key={image._id}
              image={image}
              onClick={setSelectedImage}
            />
          ))}

        </div>

      </section>

      {/* Lightbox */}

      <Lightbox
        image={selectedImage}
        images={images}
        onClose={() => setSelectedImage(null)}
        onNext={() => {
          const currentIndex = images.findIndex(
            (img) => img._id === selectedImage?._id
          );

          if (currentIndex < images.length - 1) {
            setSelectedImage(images[currentIndex + 1]);
          }
        }}
        onPrev={() => {
          const currentIndex = images.findIndex(
            (img) => img._id === selectedImage?._id
          );

          if (currentIndex > 0) {
            setSelectedImage(images[currentIndex - 1]);
          }
        }}
      />
    </>
  );
};

export default GalleryGrid;