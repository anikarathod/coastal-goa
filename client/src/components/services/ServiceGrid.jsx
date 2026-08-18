import ServiceCard from "./ServiceCard";

const ServiceGrid = ({ services = [] }) => {
  if (!services.length) {
    return (
      <div className="text-center py-10">
        No services found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <ServiceCard
          key={service._id}
          service={service}
        />
      ))}
    </div>
  );
};

export default ServiceGrid;