import { useState } from "react";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export const FaireDemande = () => {
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    serviceName: "",
    username: user ? user.username : "",
    address: user ? user.address : "",
    phone: user ? user.phone : "",
    isComplete: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [demandeSuccess, setDemandeSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  console.log(formData);
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
      <div className="mb-10 p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">
          Create Demandes
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <select
            id="serviceName"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          >
            <option value="">-- SERVICE DEMANDE --</option>
            <option value="menagere">Menage</option>
            <option value="lingeriere">Lingerie</option>
            <option value="livreur">Livreur</option>
            <option value="professeur">Etude</option>
            <option value="traiteur">Traiteur</option>
            <option value="menuiserie">Menuiserie</option>
            <option value="plomberie">Plomberie</option>
            <option value="mecanique">Mecanique</option>
          </select>
          <input
            type="text"
            id="username"
            value={formData.username}
            placeholder="Renseigner votre nom et prenom"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="text"
            id="address"
            value={formData.address}
            placeholder="Renseigner votre adresse"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="number"
            id="phone"
            value={formData.phone}
            placeholder="Renseigner votre numero de telephone"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <input type="text" id="isComplete" hidden />
          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading" : "Valider"}
          </button>
        </form>
        {error && (
          <p className="text-red-500 mt-5 text-center font-semibold">{error}</p>
        )}
        {demandeSuccess && (
          <p className="text-red-500 mt-5 text-center font-semibold">
            Votre demande est en cours de traitement. Vous serrez appele
            ulterieurement pour une confirmation
          </p>
        )}
      </div>
      <Footer />
    </>
  );
};
