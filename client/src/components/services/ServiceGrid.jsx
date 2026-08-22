import ServiceCard from "./ServiceCard";

const ServiceGrid = ({ services = [] }) => {
  if (!services.length) {
    return (
      <div className="py-10 text-center text-gray-500">
        No services found.
      </div>
    );
  }

  return (
    <section className="py-4">

      {/* Heading */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          Services
        </h2>

        <p className="text-sm text-gray-500">
          {services.length} Service
          {services.length !== 1 && "s"} Found
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
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