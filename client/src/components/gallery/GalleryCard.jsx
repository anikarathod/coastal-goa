import { useState } from "react";
import {
  FaSearchPlus,
  FaMapMarkerAlt,
  FaCamera,
  FaVideo,
} from "react-icons/fa";

const GalleryCard = ({ image, onClick }) => {
  const [loaded, setLoaded] = useState(false);

  if (!image) return null;

  const fileUrl = image.fileUrl || image.image;
  const fileType = image.fileType || "image";

  return (
    <div
      onClick={() => onClick(image)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gray-200 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-300" />
      )}

 {/* IMAGE */}
{image.fileType === "image" && (
  <img
    src={image.fileUrl || image.image}
    alt={image.title}
    onLoad={() => setLoaded(true)}
    className={`h-72 w-full object-cover transition duration-500 group-hover:scale-110 ${
      loaded ? "opacity-100" : "opacity-0"
    }`}
  />
)}

{/* VIDEO */}
{image.fileType === "video" && (
  <video
    className="h-72 w-full object-cover"
    muted
  >
    <source src={image.fileUrl} />
  </video>
)}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute bottom-0 w-full p-6 text-white">

          <span className="rounded-full bg-cyan-600 px-3 py-1 text-xs font-semibold">
            {image.category || "Gallery"}
          </span>

          <h3 className="mt-3 text-2xl font-bold">
            {image.title}
          </h3>

          <div className="mt-3 flex items-center gap-2 text-sm">
            <FaMapMarkerAlt />
            {image.location || "Goa"}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              {fileType === "video" ? (
  <>
    <FaVideo />
    Video
  </>
) : (
  <>
    <FaCamera />
    Image
  </>
)}
            </div>

            <div className="rounded-full bg-white/20 p-3 backdrop-blur">
              <FaSearchPlus className="text-xl" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GalleryCard;