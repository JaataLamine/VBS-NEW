import { ServiceCard } from "./ServiceCard";

// eslint-disable-next-line react/prop-types
export const ServiceList = ({ services = [] }) => {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {services.map((service, idx) => (
        <ServiceCard key={idx} service={service} />
      ))}
    </div>
  );
};
