import { useEffect } from "react";
import { FaExclamationTriangle, FaTimes } from "react-icons/fa";

const DeleteModal = ({
  open,
  title = "Delete Item",
  message = "Are you sure you want to delete this item?",
  onConfirm,
  onCancel,
}) => {
  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onCancel?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full max-w-md rounded-t-2xl bg-white shadow-2xl
          sm:rounded-2xl
          animate-slide-up sm:animate-fade-in
        "
      >
        {/* Header */}
        <div className="flex items-start gap-4 p-5 sm:p-6">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <FaExclamationTriangle />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-base font-bold text-slate-900 sm:text-lg">
              {title}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
              {message}
            </p>
          </div>

          {/* Close X — mobile only */}
          <button
            onClick={onCancel}
            aria-label="Close"
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 sm:hidden"
          >
            <FaTimes />
          </button>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-2 border-t border-slate-100 p-4 sm:flex-row sm:justify-end sm:gap-3 sm:p-5">
          <button
            onClick={onCancel}
            className="min-h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:bg-slate-100 sm:w-auto sm:min-h-10"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="min-h-11 w-full rounded-xl bg-rose-600 px-4 text-sm font-semibold text-white transition hover:bg-rose-700 active:bg-rose-800 sm:w-auto sm:min-h-10"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Animation keyframes — scoped */}
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(24px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
        .animate-slide-up { animation: slide-up 0.25s ease-out; }
        .animate-fade-in  { animation: fade-in 0.2s ease-out; }

        @media (prefers-reduced-motion: reduce) {
          .animate-slide-up,
          .animate-fade-in { animation: none; }
        }
      `}</style>
    </div>
  );
};

export default DeleteModal;