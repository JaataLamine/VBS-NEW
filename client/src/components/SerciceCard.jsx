import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const ServiceCard = ({ id, name, imageUrl, imageUpload }) => {
  return (
    <>
      <Link to={`/service/${id}`} className="group">
        <div className="w-full h-64 overflow-hidden bg-gray-200 rounded-lg shadow-xl aspect-w-1 xl:aspect-h-8 xl:aspect-w-7">
          <div className="z-10 w-full h-full overflow-hidden transition duration-300 ease-in-out rounded-xl">
            <img
              src={imageUrl ? imageUrl : `http://localhost:5000/${imageUpload}`}
              alt={name}
              className="object-cover object-center w-full h-full"
            />
          </div>
          <div className="absolute bottom-0 z-20 pb-4 m-0 transition duration-300 ease-in-out ps-4 group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
            <h3 className="mt-4 text-2xl font-medium text-white">{name}</h3>
          </div>
        </div>
      </Link>
    </>
  );
};
