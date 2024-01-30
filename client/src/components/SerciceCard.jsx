import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const ServiceCard = ({ id, name, imageUrl }) => {
  return (
    <>
      <Link to={`/service/${id}`} className="group">
        <div className="h-64 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 shadow-xl">
          <div className="z-10 h-full w-full overflow-hidden rounded-xl opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70">
            <img
              src={imageUrl}
              alt={name}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
          <div className="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
            <h3 className="mt-4 text-2xl font-medium text-white">{name}</h3>
          </div>
        </div>
      </Link>
    </>
  );
};
