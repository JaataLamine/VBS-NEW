import { useState } from "react";
import { Footer } from "../components/Footer";

// Page de creation de service
export const CreateService = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [files, setFiles] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);

  // Disable the inputs and the button if selected
  // let inputUrl = document.querySelector("#imageUrl");
  // let inputUpload = document.querySelector("#imageUpload");

  // inputUrl.addEventListener("change", () => {
  //   if (inputUrl.value.length > 0) {
  //     inputUpload.disable = true;
  //   } else {
  //     inputUpload.disable = false;
  //   }
  // });

  // inputUpload.addEventListener("change", () => {
  //   if (inputUpload.value.length > 0) {
  //     inputUrl.disable = true;
  //   } else {
  //     inputUrl.disable = false;
  //   }
  // });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (files) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.set("name", name);
        formData.set("description", description);
        formData.set("file", files[0]);
        const res = await fetch("/api/service/create", {
          method: "POST",
          body: formData,
          credentials: "include",
        });
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          return;
        }
        setLoading(false);
        setIsSuccess("Service cree avec succes");
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    } else if (imageUrl.length > 0) {
      try {
        setLoading(true);
        const res = await fetch("/api/service/create", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ name, description, imageUrl }),
        });
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          return;
        }
        setName(data.name);
        setDescription(data.description);
        setImageUrl(data.imageUrl);
        setLoading(false);
        setIsSuccess("Service cree avec succes");
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    }
  };

  return (
    <>
      <div className="max-w-lg p-3 mx-auto mb-10">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold text-center my-7">
            Creer un nouveau service
          </h1>
          <input
            id="name"
            type="text"
            value={name}
            placeholder="Nom du service"
            className="p-3 border rounded-lg"
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            id="description"
            value={description}
            rows={5}
            placeholder="Description du service"
            className="p-3 border rounded-lg"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input
            id="imageUrl"
            type="text"
            value={imageUrl}
            placeholder="Inserer un lien d'image"
            className="p-3 border rounded-lg"
            onChange={(e) => setImageUrl(e.target.value)}
            disabled={loading}
          />
          <p>ou</p>
          <input
            type="file"
            id="imageUpload"
            onChange={(e) => setFiles(e.target.files)}
            multiple={false}
            disabled={loading}
            accept="image/*"
          />
          <button
            // disabled={loading}
            className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95 disabled:opacity-80"
          >
            Ajouter Service
          </button>
        </form>
        {error ? (
          <p className="mt-5 font-semibold text-center text-red-500">{error}</p>
        ) : (
          <p className="mt-5 font-semibold text-center text-green-700">
            {isSuccess}
          </p>
        )}
      </div>
      <Footer />
    </>
  );
};
