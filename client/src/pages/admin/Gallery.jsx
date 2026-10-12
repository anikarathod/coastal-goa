import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaImage,
  FaVideo,
  FaFileAlt,
  FaSpinner,
  FaExclamationTriangle,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";

import api from "../../services/api";
import Loader from "../../components/common/Loader";

const Gallery = () => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");

  // delete modal state
  const [deleteItem, setDeleteItem] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // toast
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await api.get("/gallery");
      setImages(res.data.gallery || []);
    } catch (err) {
      console.error("Failed to load gallery:", err);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const confirmDelete = async () => {
    if (!deleteItem) return;

    try {
      setDeleting(true);
      await api.delete(`/gallery/${deleteItem._id}`);

      setImages((prev) => prev.filter((i) => i._id !== deleteItem._id));
      showToast("Image deleted");
      setDeleteItem(null);
    } catch (err) {
      console.error(err);
      showToast(
        err.response?.data?.message || "Failed to delete",
        "error"
      );
    } finally {
      setDeleting(false);
    }
  };

  const filteredImages = useMemo(
    () =>
      images.filter((image) =>
        (image.title || "").toLowerCase().includes(search.toLowerCase())
      ),
    [images, search]
  );

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">
            Gallery
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage website gallery images
          </p>
        </div>

        <Link
          to="/pearlrathod/gallery/new"
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold !text-white shadow-sm transition hover:bg-teal-700 sm:w-auto"
        >
          <FaPlus />
          Upload Images
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400" />
        <input
          type="text"
          placeholder="Search gallery by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-base text-slate-900 placeholder:text-slate-400 transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
        />
      </div>

      {/* Empty state */}
      {filteredImages.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center sm:p-16">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-400">
            <FaImage />
          </div>
          <h2 className="mt-5 text-lg font-bold text-slate-900 sm:text-xl">
            {search ? "No matches found" : "No images yet"}
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
            {search
              ? `Nothing matches "${search}". Try a different search.`
              : "Upload your first gallery image to get started."}
          </p>
          {!search && (
            <Link
              to="/pearlrathod/gallery/new"
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold !text-white transition hover:bg-teal-700"
            >
              <FaPlus />
              Upload First Image
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {filteredImages.map((item) => (
            <GalleryCard
              key={item._id}
              item={item}
              onDelete={() => setDeleteItem(item)}
            />
          ))}
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteItem && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={() => !deleting && setDeleteItem(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
          >
            <div className="flex items-start gap-4 p-5 sm:p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                <FaExclamationTriangle />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                  Delete this image?
                </h3>
                <p className="mt-1.5 text-sm text-slate-600">
                  <span className="font-semibold">{deleteItem.title}</span>{" "}
                  will be permanently removed. This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-slate-100 p-4 sm:flex-row sm:justify-end sm:gap-3 sm:p-5">
              <button
                onClick={() => setDeleteItem(null)}
                disabled={deleting}
                className="min-h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60 sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:opacity-60 sm:w-auto"
              >
                {deleting ? (
                  <>
                    <FaSpinner className="animate-spin" /> Deleting...
                  </>
                ) : (
                  <>
                    <FaTrash /> Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-4 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-lg ${
            toast.type === "error" ? "bg-rose-600" : "bg-emerald-600"
          }`}
        >
          {toast.type === "error" ? <FaTimes /> : <FaCheckCircle />}
          {toast.message}
        </div>
      )}
    </div>
  );
};

/* ===============================================
   GALLERY CARD
   Handles every field-name variation defensively
   =============================================== */
const GalleryCard = ({ item, onDelete }) => {
  // Try multiple possible image URL field names
  const mediaUrl =
    item.fileUrl ||
    item.url ||
    item.imageUrl ||
    item.image ||
    item.path ||
    item.file?.url ||
    item.media?.url ||
    null;

  // Try multiple possible media type field names
  const rawType =
    item.mediaType ||
    item.type ||
    item.fileType ||
    item.file?.type ||
    "";

  // Normalize the type
  const mediaType = rawType.startsWith("video")
    ? "video"
    : rawType.startsWith("image") || !rawType
    ? "image"
    : rawType === "application/pdf"
    ? "pdf"
    : "image";

  const hasValidMedia = !!mediaUrl;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

      {/* MEDIA AREA — always fixed aspect ratio */}
      <div
        className="relative w-full overflow-hidden bg-slate-100"
        style={{ aspectRatio: "4 / 3" }}
      >
        {hasValidMedia && mediaType === "image" && (
          <img
            src={mediaUrl}
            alt={item.title || "Gallery item"}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}

        {hasValidMedia && mediaType === "video" && (
          <video
            src={mediaUrl}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            playsInline
            preload="metadata"
          />
        )}

        {hasValidMedia && mediaType === "pdf" && (
          <div className="flex h-full flex-col items-center justify-center text-slate-400">
            <FaFileAlt className="text-4xl" />
            <p className="mt-2 text-xs font-semibold">PDF Document</p>
          </div>
        )}

        {/* Fallback placeholder — no media at all */}
        {!hasValidMedia && (
          <div className="flex h-full flex-col items-center justify-center text-slate-400">
            <FaImage className="text-4xl" />
            <p className="mt-2 text-xs font-semibold">No preview</p>
          </div>
        )}

        {/* Media type badge (top-left) */}
        <span className="absolute left-2 top-2 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm sm:text-xs">
          {mediaType === "video" && <FaVideo className="text-[9px]" />}
          {mediaType === "image" && <FaImage className="text-[9px]" />}
          {mediaType === "pdf" && <FaFileAlt className="text-[9px]" />}
          {mediaType}
        </span>
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="truncate text-sm font-bold text-slate-900 sm:text-base">
          {item.title || "Untitled"}
        </h3>

        {(item.category || item.location) && (
          <p className="mt-1 truncate text-xs text-slate-500 sm:text-sm">
            {item.category}
            {item.category && item.location && " · "}
            {item.location}
          </p>
        )}

        {/* Action buttons */}
        <div className="mt-auto flex items-center gap-2 pt-4">
          <Link
            to={`/pearlrathod/gallery/edit/${item._id}`}
            className="inline-flex min-h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 transition hover:border-teal-500 hover:bg-teal-50 hover:text-teal-700 sm:text-sm"
          >
            <FaEdit className="text-xs" />
            Edit
          </Link>

          <button
            onClick={onDelete}
            aria-label={`Delete ${item.title}`}
            className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 transition hover:border-rose-500 hover:bg-rose-50 hover:text-rose-600 sm:text-sm"
          >
            <FaTrash className="text-xs" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default Gallery;