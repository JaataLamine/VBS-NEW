import { useEffect, useState } from "react";

export const PendingPrestataire = () => {
  const [prestataires, setPrestataires] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(isValid);

  // Gerer la validation du prestataire
  const handleCheckbox = (e) => {
    // setPrestataires((prev) => ({ ...prev, isValid: !isValid }));
  };

  // Gerer la confirmation de la validation du prestataire
  const handleConfirm = async (e) => {
    e.preventDefault();
    await fetch(`/api/prestataire`);
  };

  // Gerer la suppression du prestataire
  const handleDelete = async () => {
    await fetch(`/api/prestataire/`);
  };

  useEffect(() => {
    const fetchPrestataires = async () => {
      setLoading(true);
      const res = await fetch("/api/prestataire/pending");
      const resData = await res.json();
      setPrestataires(resData);
      setLoading(false);
    };
    fetchPrestataires();
  }, []);
  console.log(prestataires);

  return (
    <div className="relative overflow-x-auto max-w-full mx-auto shadow-md sm:rounded-lg">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-gray-700">
          <caption className="caption-top text-3xl text-center font-semibold my-7">
            Prestataire en attente de validation
          </caption>
          <thead className="text-2xs text-center text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="text-lg px-6 py-3">
                NOM
              </th>
              <th scope="col" className="text-lg px-6 py-3">
                ADRESSE
              </th>
              <th scope="col" className="text-lg px-6 py-3">
                TELEPHONE
              </th>
              <th scope="col" className="text-lg px-6 py-3">
                SERVICE
              </th>
              <th scope="col" className="text-lg px-6 py-3">
                VALIDER
              </th>
              <th scope="col" className="text-lg px-6 py-3">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {prestataires.map((prestataire) => (
              <tr
                key={prestataire.id}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="text-base px-6 py-4">{prestataire.name}</td>
                <td className="text-base px-6 py-4">{prestataire.address}</td>
                <td className="text-base px-6 py-4">{prestataire.phone}</td>
                <td className="text-base px-6 py-4">
                  {prestataire.serviceName}
                </td>
                <td className="text-base px-6 py-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="validation"
                      value={isValid}
                      onChange={handleCheckbox}
                      className="w-4 h-4 mx-auto bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                  </div>
                </td>
                <td className="text-base mx-auto px-6 py-4">
                  <button
                    disabled={!isValid}
                    onClick={handleConfirm}
                    className="font-medium text-blue-600 hover:underline px-6 py-4 disabled:opacity-50 disabled:hover:none"
                  >
                    Confirmer
                  </button>
                  <button
                    onClick={handleDelete}
                    className="font-medium text-red-600 mx-auto hover:underline ms-3"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
