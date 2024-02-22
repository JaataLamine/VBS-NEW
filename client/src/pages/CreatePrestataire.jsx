import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Footer } from "../components/Footer";

export const CreatePrestataire = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    serviceName: "",
    isValid: false,
  });
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [prestataireSuccess, setPrestataireSuccess] = useState(false);
  const navigate = useNavigate();

  // Gere l'etat de la formulaire
  const handleChange = (e) => {
    if (
      e.target.id === "name" ||
      e.target.id === "address" ||
      e.target.id === "phone"
    ) {
      setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }

    if (e.target.id === "serviceName") {
      const index = e.target.selectedIndex;
      const el = e.target.childNodes[index];
      const option = el.getAttribute("id");
      setFormData((prev) => ({ ...prev, [e.target.id]: option }));
    }
  };

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
            <option value="autre">Autre</option>
          </select>
          <input type="text" id="isValid" hidden />
          <button
            disabled={loading}
            className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Valider"}
          </button>
        </form>
        {error ? (
          <p className="mt-5 font-semibold text-center text-red-500">{error}</p>
        ) : (
          ""
        )}
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
