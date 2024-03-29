import { useState } from "react";
import { useNavigate } from "react-router";
import { Footer } from "../components/Footer";
import { Button } from "../components/Button";
import { useFetchServices } from "../hooks/useFetchServices";
import { ErrorDisplay } from "../components/ErrorDisplay";

export const CreatePrestataire = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    serviceName: "",
    autreServiceName: "",
    isValid: false,
  });
  const [error, setError] = useState(null);
  const [prestataireSuccess, setPrestataireSuccess] = useState(false);
  const [autre, setAutre] = useState(false);
  const navigate = useNavigate();

  // Gere l'etat de la formulaire
  const handleChange = (e) => {
    if (
      e.target.id === "name" ||
      e.target.id === "address" ||
      e.target.id === "phone" ||
      e.target.id === "autreServiceName"
    ) {
      setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }

    console.log(formData);

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

  const { services, loading, setLoading } = useFetchServices("/api/service");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/prestataire/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        setPrestataireSuccess(false);
        return;
      }
      setFormData(data);
      setLoading(false);
      setPrestataireSuccess(true);
      navigate("/");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-lg p-3 mx-auto mb-10">
        <h1 className="text-3xl font-semibold text-center my-7">
          Faites une demande pour etre prestataire
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            id="name"
            value={formData.name}
            placeholder="Nom et Prénom du prestataire"
            className="p-3 border rounded-lg"
            onChange={handleChange}
          />
          <input
            type="text"
            id="address"
            value={formData.address}
            placeholder="Adresse"
            className="p-3 border rounded-lg"
            onChange={handleChange}
          />
          <input
            type="number"
            id="phone"
            value={formData.phone}
            placeholder="Numero de telephone"
            className="p-3 border rounded-lg"
            onChange={handleChange}
          />
          {autre ? (
            <input
              id="autreServiceName"
              value={formData.autreServiceName}
              placeholder="Renseigner une autre profession"
              className="p-3 border rounded-lg"
              onChange={handleChange}
            />
          ) : (
            ""
          )}
          {/* Afficher les services en tanque profession */}
          <select
            id="serviceName"
            className="p-3 border rounded-lg cursor-pointer"
            onChange={handleChange}
          >
            <option value="">--CHOISIR UNE PROFESSION--</option>
            {services.map((service, idx) => (
              <option key={idx} id={service.name} value={service.name}>
                {service.name}
              </option>
            ))}
            <option id="autre" value="autre">
              Autre
            </option>
          </select>
          <input type="text" id="isValid" hidden />
          <Button text="Valider" loading={loading} />
        </form>
        {error ? <ErrorDisplay error={error} /> : ""}
        {prestataireSuccess && (
          <p className="mt-5 font-semibold text-center text-green-700">
            Votre demande de prestation est en cours de traitement...
            <br />
            Nous vous contacterons ulterieurement.
          </p>
        )}
      </div>
      <Footer />
    </>
  );
};
