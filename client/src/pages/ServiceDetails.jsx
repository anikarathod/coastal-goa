import { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  FaHome,
  FaChevronRight,
  FaArrowLeft,
  FaRedo,
  FaTools,
} from "react-icons/fa";

import api from "../services/api";

import Loader from "../components/common/Loader";
import ServiceDetailsComponent from "../components/services/ServiceDetails";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  // Fetch service on ID change
  useEffect(() => {
    fetchService();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Scroll to top when service changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const fetchService = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const serviceRes = await api.get(`/services/${id}`);
      const fetchedService =
        serviceRes.data.service || serviceRes.data;

      setService(fetchedService);

      // Fetch reviews for this service (non-blocking)
      if (fetchedService?._id) {
        fetchReviews(fetchedService._id);
      }
    } catch (err) {
      console.error("Service Fetch Error:", err.message);
      setError(true);
      setService(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchReviews = async (serviceId) => {
    try {
      setReviewsLoading(true);
      const res = await api.get(`/services/${serviceId}/reviews`);
      setReviews(res.data?.reviews || []);
    } catch (err) {
      // Reviews endpoint may not exist yet — silently fail
      setReviews([]);
    } finally {
      setReviewsLoading(false);
    }
  };

  // ---- LOADING ----
  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-gray-50">
        <Loader />
      </div>
    );
  }

  // ---- ERROR / NOT FOUND ----
  if (error || !service) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
          <FaTools className="text-3xl text-red-400" />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Service Not Found
        </h1>

        <p className="mt-3 max-w-md text-gray-500">
          The service you're looking for may have been removed or is
          temporarily unavailable.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={fetchService}
            className="inline-flex items-center gap-2 rounded-xl bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
          >
            <FaRedo className="text-xs" />
            Try Again
          </button>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            Browse All Services
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
        <title>{service.title} | Coastal Goa</title>
        <meta
          name="description"
          content={
            service.description?.slice(0, 160) ||
            `Book ${service.title} in Goa with Coastal Goa.`
          }
        />
        <meta property="og:title" content={service.title} />
        <meta
          property="og:description"
          content={service.description?.slice(0, 160)}
        />
        {service.image && <meta property="og:image" content={service.image} />}
        <meta property="og:type" content="website" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Service",
            name: service.title,
            description: service.description,
            provider: {
              "@type": "LocalBusiness",
              name: "Coastal Goa",
            },
            areaServed: service.location || "Goa",
            ...(service.price && {
              offers: {
                "@type": "Offer",
                priceCurrency: "INR",
                price: service.discountPrice || service.price,
              },
            }),
          })}
        </script>
      </Helmet>

      <section className="min-h-screen bg-gray-50 py-6 sm:py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* BREADCRUMBS + BACK */}
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
                to="/services"
                className="transition hover:text-teal-600"
              >
                Services
              </Link>
              <FaChevronRight className="text-[8px] text-gray-400" />
              <span className="truncate font-semibold text-gray-900">
                {service.title}
              </span>
            </nav>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm transition hover:border-teal-300 hover:text-teal-600 sm:text-sm"
            >
              <FaArrowLeft className="text-xs" />
              Back
            </button>
          </div>

          {/* Service Details Component */}
          <ServiceDetailsComponent
            service={service}
            reviews={reviews}
            reviewsLoading={reviewsLoading}
          />

        </div>
      </section>
    </>
  );
};

export default ServiceDetails;