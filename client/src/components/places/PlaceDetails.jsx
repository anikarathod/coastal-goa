import {
  FaMapMarkerAlt,
  FaWhatsapp,
  FaPhone,
  FaCheck,
  FaStar,
  FaArrowLeft,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const PlaceDetails = ({ place }) => {
  if (!place) return null;

  const basePrice = place.startingPrice || place.price || 0;
  const discountPrice =
    place.discountPrice && place.discountPrice > 0 ? place.discountPrice : null;
  const finalPrice = discountPrice || basePrice;

  const included = [
    ...(place.highlights || []),
    ...(place.features || []),
    ...(place.amenities || []),
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <Link
        to="/places"
        className="mb-4 inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-teal-600"
      >
        <FaArrowLeft className="text-xs" />
        Back to Places
      </Link>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* COVER */}
        <div className="relative h-64 w-full overflow-hidden bg-slate-100 sm:h-80 md:h-[420px]">
          <img
            src={place.coverImage || place.image || "/placeholder.jpg"}
            alt={place.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-8">
            {place.category && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white sm:text-xs">
                {place.category}
              </span>
            )}

            <h1 className="mt-2 text-xl font-extrabold leading-tight text-white drop-shadow-lg sm:text-3xl md:text-4xl">
              {place.title}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/90 sm:text-sm">
              <span className="inline-flex items-center gap-1.5">
                <FaMapMarkerAlt />
                {place.location || "Goa"}
              </span>

              {place.rating > 0 && (
                <span className="inline-flex items-center gap-1.5">
                  <FaStar className="text-amber-300" />
                  <span className="font-semibold">{place.rating}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8">
          {place.shortDescription && (
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg">
              {place.shortDescription}
            </p>
          )}

          {/* PRICE */}
          <div className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4">
            <div className="rounded-xl border border-teal-100 bg-teal-50 p-4 sm:p-5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-teal-700 sm:text-xs">
                Starting from
              </p>
              <div className="mt-1 flex flex-wrap items-baseline gap-2">
                <span className="text-2xl font-extrabold text-teal-700 sm:text-3xl">
                  {finalPrice > 0
                    ? `₹${finalPrice.toLocaleString("en-IN")}`
                    : "Contact Us"}
                </span>
                {discountPrice && basePrice > discountPrice && (
                  <span className="text-sm text-slate-400 line-through sm:text-base">
                    ₹{basePrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 sm:text-xs">
                Location
              </p>
              <div className="mt-1 flex items-center gap-2">
                <FaMapMarkerAlt className="text-teal-600" />
                <span className="text-base font-bold text-slate-900 sm:text-lg">
                  {place.location || "Goa"}
                </span>
              </div>
            </div>
          </div>

          {place.description && (
            <div className="mt-8">
              <h2 className="mb-3 text-lg font-bold text-slate-900 sm:text-xl md:text-2xl">
                About this place
              </h2>
              <div className="whitespace-pre-line rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-700 sm:p-5 sm:text-base">
                {place.description}
              </div>
            </div>
          )}

          {included.length > 0 && (
            <div className="mt-8">
              <h2 className="mb-3 text-lg font-bold text-slate-900 sm:text-xl md:text-2xl">
                What's included
              </h2>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
                {included.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:p-4"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-[10px] text-teal-700 sm:h-6 sm:w-6 sm:text-xs">
                      <FaCheck />
                    </span>
                    <span className="text-sm text-slate-700 sm:text-base">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 sm:p-6">
            <h3 className="text-base font-bold text-slate-900 sm:text-lg">
              Ready to book?
            </h3>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">
              Contact us on WhatsApp or call — we'll reply within 15 minutes.
            </p>

            <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
              {place.whatsappNumber && (
                <a
                  href={`https://wa.me/${place.whatsappNumber.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 text-sm font-bold !text-white shadow-md shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:bg-emerald-600 sm:flex-initial sm:px-8"
                >
                  <FaWhatsapp className="text-base" />
                  WhatsApp Booking
                </a>
              )}

              {place.contactNumber && (
                <a
                  href={`tel:${place.contactNumber}`}
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 text-sm font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-teal-500 hover:text-teal-600 sm:flex-initial sm:px-8"
                >
                  <FaPhone className="text-sm" />
                  Call Now
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;