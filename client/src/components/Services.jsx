import { ServiceList } from "./ServiceList";
import { useFetchServices } from "../hooks/useFetchServices";

export const Services = () => {
  const { services, loading } = useFetchServices("/api/service");

  return (
    <div className="bg-white">
      <h1 className="pt-10 text-2xl font-bold tracking-tight text-center text-gray-900 lg:px-8">
        VOS BESOINS SONT NOS MISSIONS
      </h1>
      <div className="max-w-2xl px-4 py-10 mx-auto sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        {loading && <p>Loading...</p>}
        {services && <ServiceList services={services} />}
      </div>
    </div>
  );
};
