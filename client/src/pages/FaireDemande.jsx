import { useState } from "react";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { ErrorDisplay } from "../components/ErrorDisplay";
import { Button } from "../components/Button";
import { useFetchServices } from "../hooks/useFetchServices";

export const FaireDemande = () => {
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    serviceName: "",
    username: user ? user.username : "",
    address: user ? user.address : "",
    phone: user ? user.phone : "",
    isComplete: false,
    autreServiceName: "",
  });
  const [error, setError] = useState(null);
  const [demandeSuccess, setDemandeSuccess] = useState(false);
  const [autre, setAutre] = useState(false);
  const navigate = useNavigate();

  // Gere l'etat de la formulaire
  const handleChange = (e) => {
    if (
      e.target.id === "address" ||
      e.target.id === "phone" ||
      e.target.id === "autreServiceName"
    ) {
      setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }

    if (e.target.id === "serviceName") {
      const index = e.target.selectedIndex;
      const el = e.target.childNodes[index];
      const option = el.getAttribute("id");
      if (option === "autre") {
        setAutre(!autre);
        setFormData((prev) => ({ ...prev, [e.target.id]: option }));
      } else if (option !== "autre") {
        setAutre(false);
      }
      setFormData((prev) => ({ ...prev, [e.target.id]: option }));
    }
  };

  console.log(formData);

  const { services, loading, setLoading } = useFetchServices("/api/service");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/demande`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      setFormData(data);
      setDemandeSuccess(true);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <>
      <div className="max-w-lg p-3 mx-auto mb-10">
        <h1 className="text-3xl font-semibold text-center my-7">
          Creer une Demande
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <select
            id="serviceName"
            className="p-3 border rounded-lg cursor-pointer"
            onChange={handleChange}
          >
            <option value="">-- CHOISISSEZ UN SERVICE --</option>
            {services.map((service, idx) => (
              <option key={idx} id={service.name} value={service.name}>
                {service.name}
              </option>
            ))}
            <option id="autre" value="autre">
              Autre
            </option>
          </select>
          {autre ? (
            <input
              id="autreServiceName"
              value={formData.autreServiceName}
              placeholder="Renseigner un autre service"
              className="p-3 border rounded-lg"
              onChange={handleChange}
            />
          ) : (
            ""
          )}
          <input
            type="text"
            id="address"
            value={formData.address}
            placeholder="Renseigner votre adresse"
            className="p-3 border rounded-lg"
            onChange={handleChange}
          />
          <input
            type="number"
            id="phone"
            value={formData.phone}
            placeholder="Renseigner votre numero de telephone"
            className="p-3 border rounded-lg"
            onChange={handleChange}
          />
          <input type="text" id="isComplete" hidden />
          <Button text="Valider" loading={loading} />
        </form>
        {error && <ErrorDisplay error={error} />}
        {demandeSuccess && (
          <p className="mt-5 font-semibold text-center text-red-500">
            Votre demande est en cours de traitement. Vous serrez appele
            ulterieurement pour une confirmation
          </p>
        )}
      </div>
      <Footer />
    </>
  );
};
