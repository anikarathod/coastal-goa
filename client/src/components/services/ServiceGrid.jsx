import ServiceCard from "./ServiceCard";

const ServiceGrid = ({ services = [] }) => {
  if (!services.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>

        <h2 className="mt-4 text-lg font-bold text-slate-900 sm:text-xl">
          No Services Found
        </h2>

        <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
          Try adjusting your search or filters to see more results.
        </p>
      </div>
    );
  }

  return (
    <section className="py-2 sm:py-4">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          Services
        </h2>

        <p className="text-xs font-medium text-slate-500 sm:text-sm">
          {services.length} Service{services.length !== 1 && "s"} Found
        </p>
      </div>

      {/* Responsive grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-5">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </section>
  );
};

export default ServiceGrid;