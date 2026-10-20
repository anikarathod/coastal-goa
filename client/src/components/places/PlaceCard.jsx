import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaStar,
  FaArrowRight,
  FaTag,
} from "react-icons/fa";

const FALLBACK =
  "https://placehold.co/600x400/e2e8f0/475569?text=Place";

const PlaceCard = ({ place }) => {
  if (!place) return null;

  // 👇 1. Use slug for the URL, fallback to ID just in case
  const linkTarget = place.slug || place._id || place.id; 
  const title = place.title || place.name || "Goa Place";
  
  const image =
    place.coverImage ||
    place.image ||
    place.imageUrl ||
    place.thumbnail ||
    FALLBACK;

  const basePrice =
    place.startingPrice || place.price || place.pricePerNight || place.fromPrice || 0;
  const discountPrice =
    place.discountPrice && place.discountPrice > 0
      ? place.discountPrice
      : null;
  const finalPrice = discountPrice || basePrice;

  const discount =
    basePrice && discountPrice && basePrice > discountPrice
      ? Math.round(((basePrice - discountPrice) / basePrice) * 100)
      : 0;

  return (
    <Link
      to={`/places/${linkTarget}`} // 👈 2. Updated Link
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg"
    >
      {/* IMAGE */}
      <div className="relative h-40 w-full overflow-hidden bg-slate-100 sm:h-48 md:h-52">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            if (e.currentTarget.src === FALLBACK) return;
            e.currentTarget.src = FALLBACK;
          }}
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* 👇 3. Updated to use 'type' (Hotel, Shop, etc.) instead of 'category' */}
        {place.type && (
          <span className="absolute left-1.5 top-1.5 inline-flex max-w-[calc(100%-60px)] items-center gap-1 truncate rounded-full bg-teal-600 px-2 py-0.5 text-[9px] font-bold uppercase text-white shadow-md sm:left-3 sm:top-3 sm:max-w-[calc(100%-90px)] sm:px-2.5 sm:py-1 sm:text-xs">
            <FaTag className="shrink-0 text-[8px] sm:text-[10px]" />
            <span className="truncate">{place.type}</span>
          </span>
        )}

        {/* Discount badge */}
        {discount > 0 && (
          <span className="absolute right-1.5 top-1.5 rounded-full bg-rose-500 px-2 py-0.5 text-[9px] font-bold text-white shadow-md sm:right-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-xs">
            {discount}% OFF
          </span>
        )}

        {/* Location */}
        {place.location && (
          <span className="absolute bottom-1.5 left-1.5 right-1.5 inline-flex items-center gap-1 truncate rounded-full bg-black/60 px-2 py-0.5 text-[9px] font-medium text-white backdrop-blur-sm sm:bottom-3 sm:left-3 sm:right-auto sm:max-w-[calc(100%-24px)] sm:px-2.5 sm:py-1 sm:text-xs">
            <FaMapMarkerAlt className="shrink-0 text-[8px] sm:text-[10px]" />
            <span className="truncate">{place.location}</span>
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-2.5 sm:p-4">
        <h3 className="line-clamp-2 text-[13px] font-bold leading-tight text-slate-900 transition group-hover:text-teal-700 sm:text-base">
          {title}
        </h3>

        {place.rating > 0 && (
          <div className="mt-1 flex items-center gap-1">
            <FaStar className="text-[9px] text-amber-400 sm:text-xs" />
            <span className="text-[10px] font-semibold text-slate-900 sm:text-xs">
              {place.rating}
            </span>
            <span className="hidden text-[10px] text-slate-500 sm:inline sm:text-xs">
              Rating
            </span>
          </div>
        )}

        <div className="mt-1.5 flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
          {finalPrice > 0 ? (
            <>
              <span className="text-base font-extrabold text-teal-700 sm:text-xl">
                ₹{finalPrice.toLocaleString("en-IN")}
              </span>
              {discountPrice && (
                <span className="text-[10px] text-slate-400 line-through sm:text-sm">
                  ₹{basePrice.toLocaleString("en-IN")}
                </span>
              )}
            </>
          ) : (
            <span className="text-[10px] font-semibold text-slate-400 sm:text-xs">
              Contact for price
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center gap-1.5 pt-2.5 sm:pt-3">
          <span className="inline-flex min-h-8 flex-1 items-center justify-center gap-1 rounded-lg bg-teal-600 px-2 py-1.5 text-[11px] font-bold !text-white shadow-sm transition group-hover:bg-teal-700 sm:min-h-9 sm:py-2.5 sm:text-sm">
            View Details
            <FaArrowRight className="text-[9px] sm:text-[10px]" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCard;