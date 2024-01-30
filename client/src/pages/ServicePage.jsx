import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
// import { useNavigate, useParams } from "react-router-dom";

export const ServicePage = () => {
  const [serviceDetails, setServiceDetails] = useState(null);
  const [demande, setDemande] = useState(null);
  const [message, setMessage] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleDemande = async () => {
    try {
      if (user) {
        const res = await fetch(`/api/demande/${id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setDemande(data);
        setMessage("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`/api/service/${id}`);
        const resData = await res.json();
        setServiceDetails(resData);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchService();
  }, [id]);

  if (!serviceDetails) return "";

  return (
    <article className="px-4 py-24 mx-auto max-w-7xl">
      <div className="w-full mx-auto mb-12 text-left md:w-3/4 lg:w-1/2">
        <div className="flex justify-between pb-3">
          <h1 className="mb-3 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            {serviceDetails.name}
          </h1>
          <button
            onClick={handleDemande}
            className="bg-cblue rounded-md shadow-lg font-semibold text-2xl p-2 hover:bg-blue-300"
          >
            Faire la demande
          </button>
        </div>
        <img
          src={`http://localhost:5000/${serviceDetails.imageUrl}`}
          alt="detail service"
          className="object-cover w-full h-64 bg-center rounded-lg"
        />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: serviceDetails.description }}
        className="w-full mx-auto prose md:w-3/4 lg:w-1/2"
      />
    </article>
  );
};
