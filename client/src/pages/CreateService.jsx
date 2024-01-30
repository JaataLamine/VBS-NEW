import { useState } from "react";
import { Footer } from "../components/Footer";

// Page de creation de service
export const CreateService = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/service/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.error);
        return;
      }
      setFormData(data);
      setLoading(false);
      setError("Service created successfully");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="mb-10 p-3 max-w-lg mx-auto">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <h1 className="text-3xl text-center font-semibold my-7">
            Creer un nouveau service
          </h1>
          <input
            id="name"
            type="text"
            placeholder="Nom du service"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <textarea
            id="description"
            rows={5}
            placeholder="Description du service"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          ></textarea>
          <input
            id="imageUrl"
            type="text"
            placeholder="Inserer une image"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Ajouter Service"}
          </button>
        </form>
        {error && (
          <p className="text-red-500 mt-5 text-center font-semibold">{error}</p>
        )}
      </div>
      <Footer />
    </>
  );
};
