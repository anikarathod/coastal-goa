import { useEffect } from "react";
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaMapMarkerAlt,
  FaTag,
} from "react-icons/fa";

const Lightbox = ({
  image,
  images = [],
  onClose,
  onNext,
  onPrev,
}) => {

  console.log("LIGHTBOX DATA:", image);

  if (!image) return null;
  const currentIndex = images.findIndex(
    (img) => img._id === image._id
  );

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  // Keyboard Controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;

        case "ArrowRight":
          if (hasNext) onNext();
          break;

        case "ArrowLeft":
          if (hasPrevious) onPrev();
          break;

        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow = "auto";
    };
  }, [hasNext, hasPrevious, onClose, onNext, onPrev]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">

      {/* Close */}

      <button
        onClick={onClose}
        className="absolute right-6 top-6 z-50 rounded-full bg-white/20 p-3 text-2xl text-white transition hover:bg-red-500"
      >
        <FaTimes />
      </button>

      {/* Previous */}

      {hasPrevious && (
        <button
          onClick={onPrev}
          className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-4 text-2xl text-white transition hover:bg-cyan-600"
        >
          <FaChevronLeft />
        </button>
      )}

      {/* Next */}

      {hasNext && (
        <button
          onClick={onNext}
          className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-4 text-2xl text-white transition hover:bg-cyan-600"
        >
          <FaChevronRight />
        </button>
      )}

      {/* Content */}

      <div className="max-w-6xl">

      {/* IMAGE */}
{image.fileType === "image" && (
  <img
    src={image.fileUrl || image.image}
    alt={image.title}
    className="max-h-[75vh] w-full rounded-2xl object-contain shadow-2xl"
  />
)}

{/* VIDEO */}
{image.fileType === "video" && (
  <video
    controls
    autoPlay
    className="max-h-[75vh] w-full rounded-2xl shadow-2xl"
  >
    <source src={image.fileUrl} />
  </video>
)}



        {/* Details */}

        <div className="mt-6 rounded-2xl bg-white p-6 shadow-xl">

          <div className="flex flex-wrap items-center justify-between gap-4">

            <div>

              <h2 className="text-3xl font-bold text-gray-800">
                {image.title}
              </h2>

              <div className="mt-4 flex flex-wrap gap-5 text-gray-600">

                <div className="flex items-center gap-2">

                  <FaMapMarkerAlt className="text-cyan-600" />

                  {image.location}

                </div>

                <div className="flex items-center gap-2">

                  <FaTag className="text-cyan-600" />

                  {image.category}

                </div>

              </div>

            </div>

            <div className="rounded-full bg-cyan-600 px-5 py-3 text-white font-semibold">

              {currentIndex + 1} / {images.length}

            </div>

          </div>

          {image.description && (

            <p className="mt-6 leading-8 text-gray-600">
              {image.description}
            </p>

          )}

        </div>

      </div>

    </div>
  );
};

export default Lightbox;