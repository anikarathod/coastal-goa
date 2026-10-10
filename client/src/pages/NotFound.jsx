import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  FaHome,
  FaArrowLeft,
  FaBoxOpen,
  FaSuitcase,
  FaEnvelope,
  FaCompass,
} from "react-icons/fa";

const NotFound = () => {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const quickLinks = [
    {
      label: "Packages",
      to: "/packages",
      icon: <FaBoxOpen />,
      color: "bg-teal-50 text-teal-700 hover:bg-teal-100",
    },
    {
      label: "Services",
      to: "/services",
      icon: <FaSuitcase />,
      color: "bg-blue-50 text-blue-700 hover:bg-blue-100",
    },
    {
      label: "Contact",
      to: "/contact",
      icon: <FaEnvelope />,
      color: "bg-purple-50 text-purple-700 hover:bg-purple-100",
    },
  ];

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>Page Not Found | Coastal Goa</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-teal-50 via-gray-50 to-blue-50 px-4 py-12 sm:px-6 sm:py-16">

        {/* Decorative background circles */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-teal-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-2xl text-center">

          {/* BIG 404 */}
          <div className="relative inline-block">
            <h1 className="bg-gradient-to-br from-teal-500 to-teal-700 bg-clip-text text-8xl font-extrabold leading-none text-transparent sm:text-9xl">
              404
            </h1>
            <div className="mt-2 mx-auto h-1 w-16 rounded-full bg-teal-500/40" />
          </div>

          {/* HEADING */}
          <h2 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
            Oops! Page Not Found
          </h2>

          {/* MESSAGE */}
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-600 sm:text-base">
            Looks like the page you're looking for has sailed away. The URL
            might be incorrect, or the page may have been moved or deleted.
          </p>

          {/* ILLUSTRATION (with graceful fallback) */}
          <div className="my-10 flex justify-center">
            {!imgError ? (
              <img
                src="/images/404.svg"
                alt="Page not found"
                onError={() => setImgError(true)}
                className="w-full max-w-xs sm:max-w-sm"
              />
            ) : (
              <div className="flex h-40 w-40 items-center justify-center rounded-full bg-teal-50 shadow-inner sm:h-48 sm:w-48">
                <FaCompass className="text-6xl text-teal-400 sm:text-7xl" />
              </div>
            )}
          </div>

          {/* PRIMARY ACTIONS */}
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-md sm:text-base"
            >
              <FaHome />
              Back to Home
            </Link>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-teal-300 hover:text-teal-600 sm:text-base"
            >
              <FaArrowLeft />
              Go Back
            </button>
          </div>

          {/* QUICK LINKS */}
          <div className="mt-10 border-t border-gray-200 pt-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Popular Destinations
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {quickLinks.map(({ label, to, icon, color }) => (
                <Link
                  key={to}
                  to={to}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${color}`}
                >
                  {icon}
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* SUPPORT LINE */}
          <p className="mt-8 text-xs text-gray-500 sm:text-sm">
            Still stuck?{" "}
            <Link
              to="/contact"
              className="font-semibold text-teal-600 hover:underline"
            >
              Contact our support team
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default NotFound;