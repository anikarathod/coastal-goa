import { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  FaHome,
  FaChevronRight,
  FaArrowUp,
  FaArrowLeft,
  FaShareAlt,
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaLink,
  FaCheck,
  FaRedo,
  FaBoxOpen,
} from "react-icons/fa";

import api from "../services/api";

import PackageGallery from "../components/packages/PackageGallery";
import PackageInfo from "../components/packages/PackageInfo";
import PackageMap from "../components/packages/PackageMap";
import RelatedPackages from "../components/packages/RelatedPackages";

const PackageDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [packageData, setPackageData] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Fetch package on slug change
  useEffect(() => {
    fetchPackage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // Scroll to top when slug changes (e.g., clicking related package)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  // Show "Back to Top" button after scrolling
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close share popover on outside click
  useEffect(() => {
    if (!shareOpen) return;
    const close = () => setShareOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [shareOpen]);

  const fetchPackage = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const res = await api.get(`/packages/${slug}`);
      setPackageData(res.data.package);
    } catch (err) {
      console.error("Failed to fetch package:", err.message);
      setError(true);
      setPackageData(null);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  // ---- SHARE HANDLERS ----
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Failed to copy link");
    }
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = packageData
    ? `Check out ${packageData.title} on Coastal Goa!`
    : "";

  // ---- LOADING SKELETON ----
  if (loading) {
    return (
      <section className="min-h-screen bg-gray-50 pb-16">
        {/* Gallery skeleton */}
        <div className="h-64 w-full animate-pulse bg-gray-200 sm:h-80 md:h-96" />

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          {/* Breadcrumb skeleton */}
          <div className="mb-6 h-4 w-64 animate-pulse rounded bg-gray-200" />

          {/* Main card skeleton */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
            <div className="h-8 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="mt-3 h-4 w-1/3 animate-pulse rounded bg-gray-200" />
            <div className="mt-8 space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
            </div>

            {/* Stats skeleton */}
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-20 animate-pulse rounded-xl bg-gray-100"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ---- ERROR / NOT FOUND ----
  if (error || !packageData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
          <FaBoxOpen className="text-3xl text-red-400" />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl">
          Package Not Found
        </h1>

        <p className="mt-3 max-w-md text-sm text-gray-500 sm:text-base">
          The package you're looking for may have been removed or is
          temporarily unavailable.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={fetchPackage}
            className="inline-flex items-center gap-2 rounded-xl bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
          >
            <FaRedo className="text-xs" />
            Try Again
          </button>
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            Browse All Packages
          </Link>
        </div>
      </div>
    );
  }

  // ---- SUCCESS ----
  return (
    <>
      {/* DYNAMIC SEO */}
      <Helmet>
        <title>{packageData.title} | Coastal Goa</title>
        <meta
          name="description"
          content={
            packageData.description?.slice(0, 160) ||
            `Book ${packageData.title} tour in Goa with Coastal Goa.`
          }
        />
        <meta property="og:title" content={packageData.title} />
        <meta
          property="og:description"
          content={packageData.description?.slice(0, 160)}
        />
        {packageData.coverImage && (
          <meta property="og:image" content={packageData.coverImage} />
        )}
        <meta property="og:type" content="website" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: packageData.title,
            image: packageData.coverImage,
            description: packageData.description,
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              price: packageData.discountPrice || packageData.price,
              availability: "https://schema.org/InStock",
            },
            ...(packageData.rating && {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: packageData.rating,
                reviewCount: 10,
              },
            }),
          })}
        </script>
      </Helmet>

      <section className="min-h-screen bg-gray-50 pb-16">
        {/* GALLERY */}
        <PackageGallery
          images={[
            packageData.coverImage,
            ...(packageData.images || []),
          ].filter(Boolean)}
        />

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">

          {/* BREADCRUMBS + ACTIONS */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500 sm:text-sm"
            >
              <Link
                to="/"
                className="flex items-center gap-1 transition hover:text-teal-600"
              >
                <FaHome className="text-[10px]" />
                Home
              </Link>
              <FaChevronRight className="text-[8px] text-gray-400" />
              <Link
                to="/packages"
                className="transition hover:text-teal-600"
              >
                Packages
              </Link>
              <FaChevronRight className="text-[8px] text-gray-400" />
              <span className="truncate font-semibold text-gray-900">
                {packageData.title}
              </span>
            </nav>

            <div className="flex items-center gap-2">
              {/* BACK */}
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm transition hover:border-teal-300 hover:text-teal-600 sm:text-sm"
              >
                <FaArrowLeft className="text-xs" />
                <span className="hidden sm:inline">Back</span>
              </button>

              {/* SHARE */}
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShareOpen((p) => !p);
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm transition hover:border-teal-300 hover:text-teal-600 sm:text-sm"
                  aria-label="Share"
                >
                  <FaShareAlt className="text-teal-600" />
                  <span className="hidden sm:inline">Share</span>
                </button>

                {shareOpen && (
                  <div
                    className="absolute right-0 top-full z-30 mt-2 w-52 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(
                        `${shareText} ${shareUrl}`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
                    >
                      <FaWhatsapp className="text-green-600" />
                      WhatsApp
                    </a>

                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        shareUrl
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
                    >
                      <FaFacebook className="text-blue-600" />
                      Facebook
                    </a>

                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        shareText
                      )}&url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
                    >
                      <FaTwitter className="text-sky-500" />
                      Twitter
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="flex w-full items-center gap-3 border-t border-gray-100 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
                    >
                      {copied ? (
                        <>
                          <FaCheck className="text-green-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <FaLink className="text-gray-500" />
                          Copy Link
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* PACKAGE INFO */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
            <PackageInfo packageData={packageData} />

            {/* QUICK STATS */}
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
              <StatBox
                label="Location"
                value={packageData.location || "South Goa"}
              />
              <StatBox
                label="Duration"
                value={packageData.duration || "Full Day (6-8 Hours)"}
              />
              <StatBox
                label="Category"
                value={packageData.category || "Tour"}
              />
              <StatBox
                label="Rating"
                value={
                  <span className="flex items-center gap-1.5">
                    <span className="text-yellow-500">★</span>
                    {packageData.rating || "4.8"}
                  </span>
                }
              />
            </div>
          </div>

          {/* MAP */}
          {packageData.latitude && packageData.longitude ? (
            <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:mt-10 sm:p-8 lg:mt-12">
              <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-900 sm:text-2xl">
                <span className="text-teal-600">📍</span> Tour Location
              </h2>

              <PackageMap
                latitude={packageData.latitude}
                longitude={packageData.longitude}
                address={packageData.location}
              />
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-gray-200 bg-white p-6 text-center sm:mt-10">
              <p className="text-sm text-gray-500">
                Location details will be shared after booking confirmation.
              </p>
            </div>
          )}

          {/* RELATED PACKAGES */}
          <section className="mt-12 sm:mt-16 lg:mt-20">
            <RelatedPackages packageId={packageData._id} />
          </section>

          {/* BOTTOM NAVIGATION */}
          <div className="mt-12 flex justify-center sm:mt-16">
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-teal-300 hover:text-teal-600"
            >
              <FaArrowLeft className="text-xs" />
              Browse All Packages
            </Link>
          </div>
        </div>

        {/* BACK TO TOP */}
        {showScrollTop && (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="fixed bottom-24 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-teal-600 text-white shadow-lg transition hover:-translate-y-1 hover:bg-teal-700 sm:bottom-28 sm:right-8"
          >
            <FaArrowUp />
          </button>
        )}
      </section>
    </>
  );
};

/* ============= STAT BOX ============= */
const StatBox = ({ label, value }) => (
  <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 transition-colors duration-200 hover:border-teal-200 hover:bg-teal-50/30">
    <p className="text-xs font-medium uppercase tracking-wider text-gray-500 sm:text-sm">
      {label}
    </p>
    <p className="mt-1.5 text-sm font-semibold text-gray-900 sm:text-base">
      {value}
    </p>
  </div>
);

export default PackageDetails;