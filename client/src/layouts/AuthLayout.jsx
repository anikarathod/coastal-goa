import { Outlet, Link } from "react-router-dom";
import { FaShip, FaArrowLeft } from "react-icons/fa";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-600 via-sky-500 to-blue-700">

      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-10">

        <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">

          {/* Left Side */}

          <div className="hidden flex-col justify-center bg-gradient-to-br from-cyan-600 to-blue-700 p-12 text-white lg:flex">

            <div className="mb-8 flex items-center gap-4">

              <div className="rounded-full bg-white/20 p-5">
                <FaShip className="text-4xl" />
              </div>

              <div>
                <h1 className="text-4xl font-bold">
                  Coastal Goa
                </h1>

                <p className="text-cyan-100">
                  Explore Goa. Create Memories.
                </p>
              </div>

            </div>

            <h2 className="mb-6 text-5xl font-bold leading-tight">
              Welcome Back!
            </h2>

            <p className="text-lg leading-8 text-cyan-100">
              Manage tour packages, bookings, services,
              customers, gallery, and reviews from one
              powerful admin dashboard.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-6">

              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                <h3 className="text-3xl font-bold">500+</h3>
                <p className="text-cyan-100">
                  Happy Travelers
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                <h3 className="text-3xl font-bold">100+</h3>
                <p className="text-cyan-100">
                  Tour Packages
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                <h3 className="text-3xl font-bold">24/7</h3>
                <p className="text-cyan-100">
                  Customer Support
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                <h3 className="text-3xl font-bold">⭐ 4.9</h3>
                <p className="text-cyan-100">
                  Customer Rating
                </p>
              </div>

            </div>

          </div>

          {/* Right Side */}

          <div className="relative flex items-center justify-center p-8 md:p-12">

            {/* Back to Website */}

            <Link
              to="/"
              className="absolute left-6 top-6 flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition hover:bg-cyan-600 hover:text-white"
            >
              <FaArrowLeft />
              Back to Website
            </Link>

            <div className="w-full max-w-md">

              {/* Logo for Mobile */}

              <div className="mb-10 text-center lg:hidden">

                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-600 text-white">
                  <FaShip className="text-3xl" />
                </div>

                <h1 className="text-3xl font-bold text-gray-800">
                  Coastal Goa
                </h1>

                <p className="mt-2 text-gray-500">
                  Discover the Beauty of Goa
                </p>

              </div>

              {/* Login/Register Pages */}

              <Outlet />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AuthLayout;