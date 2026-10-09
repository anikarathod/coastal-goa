import { Link } from "react-router-dom";
import {
  FaStar,
  FaWhatsapp,
  FaPhoneAlt,
  FaCheck,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";

const WHATSAPP_NUMBER = "919175884119";
const PHONE_NUMBER = "+919175884119";

const packages = [
  {
    id: 1,
    name: "Dinner Cruise",
    description: "2 hrs · Live music",
    price: "₹1,499",
    rating: "4.8",
    color: "bg-cyan-100",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Water Sports",
    description: "Combo · Beach pickup",
    price: "₹1,999",
    rating: "4.7",
    color: "bg-amber-100",
    image:
      "https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "North Goa Tour",
    description: "Full day · AC car",
    price: "₹999",
    rating: "4.8",
    color: "bg-green-100",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Airport Transfer",
    description: "Private taxi · Easy pickup",
    price: "Contact us",
    rating: "4.9",
    color: "bg-indigo-100",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80",
  },
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#0c4e5c] text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-[#073b49]/95 via-[#0c4e5c]/85 to-[#0c4e5c]/35" />

      <div className="relative mx-auto grid min-h-[570px] max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:px-10">
        <div className="max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/40 bg-black/15 px-5 py-3 text-sm">
            <FaStar className="text-amber-400" />
            Rated 4.8 by 1,000+ guests
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Goa cruises, water sports and tours
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-white/85 sm:text-xl">
            Book online in minutes and get your confirmation
            on WhatsApp.
          </p>

          <div className="mt-7 flex flex-wrap gap-x-7 gap-y-4 text-sm sm:text-base">
            {[
              "Hotel pickup",
              "Instant confirmation",
              "Free cancellation",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <FaCheck className="text-cyan-300" />
                {item}
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/packages"
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-cyan-700 px-7 py-4 font-bold transition hover:bg-cyan-600"
            >
              View packages and prices
              <FaArrowRight />
            </Link>

            <a
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center justify-center gap-3 rounded-2xl border-2 border-white/60 px-7 py-4 font-bold transition hover:bg-white/10"
            >
              <FaPhoneAlt />
              Call {PHONE_NUMBER}
            </a>
          </div>
        </div>

        <div className="relative hidden h-[420px] overflow-hidden rounded-3xl border border-white/20 shadow-2xl lg:block">
          <img
            src="/images/goa-hero.jpg"
            alt="Goa coastline and tropical beach"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />

          <div className="absolute bottom-6 left-6">
            <p className="text-sm font-medium text-white/80">
              Your next holiday starts here
            </p>
            <h2 className="mt-1 text-2xl font-bold">
              Discover Coastal Goa
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};

const PopularPackages = () => {
  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Popular Goa packages
          </h2>
          <p className="mt-2 text-base text-slate-600 sm:text-lg">
            Cruises, water sports and tours our guests book most.
          </p>
        </div>

        <Link
          to="/packages"
          className="inline-flex items-center gap-2 font-semibold text-cyan-700 hover:text-cyan-900"
        >
          View all packages
          <FaArrowRight />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {packages.map((item) => (
          <Link
            key={item.id}
            to="/packages"
            className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className={`h-40 ${item.color}`}>
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>

            <div className="p-5">
              <h3 className="text-xl font-semibold text-slate-900">
                {item.name}
              </h3>

              <p className="mt-1 min-h-12 text-slate-600">
                {item.description}
              </p>

              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="font-bold text-slate-900">
                  {item.price === "Contact us"
                    ? item.price
                    : `From ${item.price}`}
                </span>

                <span className="flex items-center gap-1 text-sm font-semibold text-amber-700">
                  {item.rating}
                  <FaStar />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

const WhatsAppButton = () => {
  const message = encodeURIComponent(
    "Hello Coastal Goa! I want to know more about your Goa tour packages."
  );

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Coastal Goa on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-green-600 px-6 py-4 font-bold text-white shadow-xl transition hover:bg-green-700"
    >
      <FaWhatsapp className="text-2xl" />
      <span>Chat with us</span>
    </a>
  );
};

const Home = () => {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="sticky top-0 z-40 bg-white">
        <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-5 sm:px-8 lg:px-10">
          <Link
            to="/"
            className="flex items-center gap-3 text-2xl font-bold text-cyan-700"
          >
            <FaMapMarkerAlt />
            <span>
              Coastal
              <br />
              Goa
            </span>
          </Link>

          <div className="flex flex-wrap items-center gap-5 text-sm font-medium text-slate-700 sm:gap-7 sm:text-base">
            <Link to="/" className="hover:text-cyan-700">
              Home
            </Link>
            <Link to="/packages" className="hover:text-cyan-700">
              Packages
            </Link>
            <Link to="/services" className="hover:text-cyan-700">
              Services
            </Link>
            <Link to="/gallery" className="hover:text-cyan-700">
              Gallery
            </Link>
            <Link to="/contact" className="hover:text-cyan-700">
              Contact
            </Link>
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-cyan-700 px-6 py-4 font-bold text-white transition hover:bg-cyan-800"
          >
            Book now
          </a>
        </nav>
      </header>

      {/* Hero */}
      <Hero />

      {/* Popular packages */}
      <PopularPackages />

      {/* Footer */}
      <footer className="bg-slate-950 px-5 py-8 text-center text-sm text-white/70">
        © {new Date().getFullYear()} Coastal Goa. All rights reserved.
      </footer>

      {/* Floating WhatsApp */}
      <WhatsAppButton />
    </main>
  );
};

export default Home;