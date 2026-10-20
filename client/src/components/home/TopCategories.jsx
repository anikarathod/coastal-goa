import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const categories = [
  {
    title: "Sightseeing Tours",
    image: "/categories/sightseeing.jpg", // 👈 Local image
    link: "/packages?category=Sightseeing",
  },
  {
    title: "Water Sports",
    image: "/categories/watersports.jpg", // 👈 Local image
    link: "/packages?category=Water+Sports",
  },
  {
    title: "Dudhsagar Trip",
    image: "/categories/dudhsagar.jpg", // 👈 Local image
    link: "/packages?search=Dudhsagar",
  },
  {
    title: "Cruises & Yacht Rentals",
    image: "/categories/cruise.jpg", // 👈 Local image
    link: "/packages?category=Cruise",
  },
];

const TopCategories = () => {
  return (
    <section className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="mb-6 flex items-center justify-between sm:mb-8">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
            Our Top Categories
          </h2>
          <Link
            to="/packages"
            className="flex items-center gap-1 text-sm font-semibold text-teal-600 transition hover:text-teal-700"
          >
            View All <FaArrowRight className="text-xs" />
          </Link>
        </div>

        {/* Horizontal Scrollable Grid (Mobile) / Regular Grid (Desktop) */}
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
          {categories.map((cat, index) => (
            <Link
              key={index}
              to={cat.link}
              className="group relative flex w-[200px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-slate-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:w-auto"
            >
              {/* Image */}
              <div className="relative h-32 w-full overflow-hidden sm:h-40">
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Text & Arrow */}
              <div className="flex flex-1 items-center justify-between p-3">
                <h3 className="line-clamp-2 text-sm font-bold text-slate-800">
                  {cat.title}
                </h3>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white transition group-hover:bg-teal-700">
                  <FaArrowRight className="text-xs" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;