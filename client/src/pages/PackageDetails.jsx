import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaHome, FaChevronRight, FaArrowUp, FaShareAlt, FaWhatsapp } from "react-icons/fa";

import api from "../services/api";

import Loader from "../components/common/Loader";

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

  // Fetch package
  useEffect(() => {
    fetchPackage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // Scroll to top on slug change (when clicking related packages)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  // Show "Back to Top" button after scrolling
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchPackage = async () => {
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
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: packageData?.title,
          text: packageData?.description?.slice(0, 100),
          url,
        });
      } catch (err) {
        // user cancelled - do nothing
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  // ---- LOADING ----
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Loader />
      </div>
    );
  }

  // ---- ERROR / NOT FOUND ----
  if (error || !packageData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
          <span className="text-4xl">😕</span>
        </div>
        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Package Not Found
        </h1>
        <p className="mt-3 max-w-md text-gray-500">
          The package you're looking for may have been removed or is
          temporarily unavailable.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={fetchPackage}
            className="rounded-xl bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
          >
            Try Again
          </button>
          <Link
            to="/packages"
            className="rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
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
        <meta property="og:image" content={packageData.coverImage} />
        <meta property="og:type" content="website" />

        {/* JSON-LD Structured Data for Google Rich Results */}
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
        {/* Gallery */}
        <PackageGallery
          images={[
            packageData.coverImage,
            ...(packageData.images || []),
          ].filter(Boolean)}
        />

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">

          {/* BREADCRUMBS + SHARE */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500 sm:text-sm">
              <Link to="/" className="flex items-center gap-1 transition hover:text-teal-600">
                <FaHome className="text-[10px]" />
                Home
              </Link>
              <FaChevronRight className="text-[8px] text-gray-400" />
              <Link to="/packages" className="transition hover:text-teal-600">
                Packages
              </Link>
              <FaChevronRight className="text-[8px] text-gray-400" />
              <span className="truncate font-semibold text-gray-900">
                {packageData.title}
              </span>
            </nav>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm transition hover:border-teal-300 hover:text-teal-600 sm:text-sm"
            >
              <FaShareAlt className="text-teal-600" />
              Share
            </button>
          </div>

          {/* Package Info */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
            <PackageInfo packageData={packageData} />

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
              <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 transition-colors duration-200 hover:border-teal-200 hover:bg-teal-50/30">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500 sm:text-sm">
                  Location
                </p>
                <p className="mt-1.5 text-sm font-semibold text-gray-900 sm:text-base">
                  {packageData.location || "South Goa"}
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 transition-colors duration-200 hover:border-teal-200 hover:bg-teal-50/30">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500 sm:text-sm">
                  Duration
                </p>
                <p className="mt-1.5 text-sm font-semibold text-gray-900 sm:text-base">
                  {packageData.duration || "Full Day (6-8 Hours)"}
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 transition-colors duration-200 hover:border-teal-200 hover:bg-teal-50/30">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500 sm:text-sm">
                  Category
                </p>
                <p className="mt-1.5 text-sm font-semibold text-gray-900 sm:text-base">
                  {packageData.category || "Tour"}
                </p>
              </div>

              <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 transition-colors duration-200 hover:border-teal-200 hover:bg-teal-50/30">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500 sm:text-sm">
                  Rating
                </p>
                <p className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-gray-900 sm:text-base">
                  <span className="text-yellow-500">★</span>
                  {packageData.rating || "4.8"}
                </p>
              </div>
            </div>
          </div>

          {/* Map Section */}
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

          {/* Related Packages */}
          <section className="mt-12 sm:mt-16 lg:mt-20">
            <RelatedPackages packageId={packageData._id} />
          </section>
        </div>

        {/* BACK TO TOP BUTTON */}
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

export default PackageDetails;