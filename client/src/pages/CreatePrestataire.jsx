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
      setError(false);
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
      <div className="mb-10 p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">
          Faites une demande pour etre prestataire
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            id="name"
            value={formData.name}
            placeholder="Nom du prestataire"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="text"
            id="address"
            value={formData.address}
            placeholder="Adresse"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="number"
            id="phone"
            value={formData.phone}
            placeholder="Numero de telephone"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          {/* Afficher les services en tanque profession */}
          <select
            id="serviceName"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          >
            <option value="">--Choisir une profession--</option>
            {services.map((service, idx) => (
              <option key={idx} id={service.name} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
          <input type="text" id="isValid" hidden />
          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Valider"}
          </button>
        </form>
        {error ? (
          <p className="text-red-500 mt-5 text-center font-semibold">{error}</p>
        ) : (
          ""
        )}
        {prestataireSuccess && (
          <p className="text-green-700 mt-5 text-center font-semibold">
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
