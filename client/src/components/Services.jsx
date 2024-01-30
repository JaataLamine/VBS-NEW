import { useEffect, useState } from "react";
import { ServiceCard } from "./SerciceCard";

export const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/service");
        const jsonData = await res.json();
        setServices(jsonData);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      }
      return services;
    };
    fetchServices();
  }, []);

  return (
    <div className="bg-white">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 lg:px-8 pt-10">
        VOS BESOINS SONT NOS MISSIONS
      </h1>
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {services.map((service, idx) => (
              <ServiceCard
                key={idx}
                id={service._id}
                imageUrl={service.imageUrl}
                name={service.name}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
