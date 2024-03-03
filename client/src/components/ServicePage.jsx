import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchServices } from "../hooks/useFetchServices";
import { Button } from "./Button";

export const ServicePage = () => {
  // const [isValid, setIsValid] = useState(false);
  const [, setDemande] = useState(null);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const { services } = useFetchServices(`/api/service/${id}`);

  const handleDemande = async () => {
    if (!user) {
      navigate("/FaireDemande");
    } else {
      try {
        const res = await fetch(`/api/demande/${id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...services.name, userRef: user._id }),
        });
        const data = await res.json();
        setDemande(data);
        setMessage("Votre demande est en cours de traitement.");
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (!services) return "";

  return (
    <article className="px-4 py-24 mx-auto max-w-7xl">
      <div className="w-full mx-auto mb-12 text-left md:w-3/4 lg:w-1/2">
        <p>{message}</p>
        <div className="flex justify-between pb-3">
          <h1 className="mb-3 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            {services.name}
          </h1>
          <Button onClick={handleDemande} text="Faire la demande" />
        </div>
        <img
          src={
            services.imageUrl
              ? services.imageUrl
              : `http://localhost:5000/${services.imageUpload}`
          }
          alt={services.name}
          className="object-cover w-full h-64 bg-center rounded-lg"
        />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: services.description }}
        className="w-full mx-auto prose md:w-3/4 lg:w-1/2"
      />
    </article>
  );
};
