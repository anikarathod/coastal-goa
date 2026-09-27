import ServiceCard from "./ServiceCard";

const ServiceGrid = ({ services = [] }) => {
  if (!services.length) {
    return (
      <div className="py-20 text-center">

        <h2 className="text-xl font-bold text-gray-700">
          No Services Found
        </h2>

        <p className="mt-2 text-gray-500">
          Try adjusting your search or filters.
        </p>

      </div>
    );
  }

  return (
    <section className="py-4">

      {/* Header */}
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

        <h2 className="text-2xl font-bold text-gray-900">
          Services
        </h2>

        <p className="text-sm text-gray-500">
          {services.length} Service
          {services.length !== 1 && "s"} Found
        </p>

      </div>

      {/* Responsive Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        {services.map((service) => (
          <ServiceCard
            key={service._id}
            service={service}
          />
        ))}

      </div>

    </section>
  );
};

export default ServiceGrid;