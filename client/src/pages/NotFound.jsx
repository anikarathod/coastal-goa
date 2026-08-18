import { Link } from "react-router-dom";
import {
  FaHome,
  FaArrowLeft,
  FaSearch,
} from "react-icons/fa";

const NotFound = () => {
  return (
    <section className="flex min-h-screen items-center bg-gradient-to-br from-cyan-50 to-blue-100 px-6">

      <div className="mx-auto max-w-3xl text-center">

        {/* 404 */}

        <h1 className="text-8xl font-extrabold text-cyan-600 md:text-9xl">
          404
        </h1>

        <h2 className="mt-6 text-4xl font-bold text-gray-800">
          Oops! Page Not Found
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          Looks like the page you're looking for has sailed away.
          The page may have been moved, deleted, or the URL might be incorrect.
        </p>

        {/* Illustration */}

        <img
          src="/images/404.svg"
          alt="404 Illustration"
          className="mx-auto my-10 w-full max-w-md"
        />

        {/* Buttons */}

        <div className="flex flex-wrap justify-center gap-4">

          <Link
            to="/"
            className="flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700"
          >
            <FaHome />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 rounded-xl border border-cyan-600 px-6 py-3 font-semibold text-cyan-600 transition hover:bg-cyan-50"
          >
            <FaArrowLeft />
            Go Back
          </button>

          <Link
            to="/packages"
            className="flex items-center gap-2 rounded-xl bg-gray-800 px-6 py-3 font-semibold text-white transition hover:bg-gray-900"
          >
            <FaSearch />
            Browse Packages
          </Link>

        </div>

      </div>

    </section>
  );
};

export default NotFound;