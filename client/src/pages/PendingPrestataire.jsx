import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  prestataireAccepted,
  prestataireDeny,
  prestataireSubscribe,
} from "../redux/prestataire/prestataireSlice";

export const PendingPrestataire = () => {
  const [prestataires, setPrestataires] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [loadPrestataire, setLoadPrestataire] = useState(false);
  const { prestataire, loading } = useSelector((state) => state.prestataire);
  const dispatch = useDispatch();

  console.log(isValid);

  // Gerer la validation du prestataire
  const handleCheckbox = (e) => {
    const prestataire = prestataires.find(
      (prestataire) => prestataire.id == e.id
    );
    prestataire.isValid = !isValid;
    setIsValid(prestataire.isValid); // TODO:
    console.log(prestataire);
    // setIsValid(!isValid);
    // setIsValid((prev) => ({ ...prev, isValid: !isValid }));
    // setPrestataires((prev) => ({ ...prev, isValid: !isValid }));
  };

  // Gerer la confirmation de la validation du prestataire
  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      dispatch(prestataireSubscribe());
      const res = await fetch(`/api/prestataire/validate/${prestataire._id}`, {
        method: "PUT",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify(isValid),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(prestataireDeny(data.message));
        return;
      }
      dispatch(prestataireAccepted(data));
    } catch (error) {
      dispatch(prestataireDeny(error.message));
    }
  };

  // Gerer la suppression du prestataire
  const handleDelete = async () => {
    await fetch(`/api/prestataire/`);
  };

  useEffect(() => {
    const fetchPrestataires = async () => {
      dispatch(prestataireSubscribe());
      const res = await fetch("/api/prestataire/pending");
      const resData = await res.json();
      setPrestataires(resData);
      setLoadPrestataire(false);
    };
    fetchPrestataires();
  }, []);

  console.log(prestataires);

  return (
    <div className="relative overflow-x-auto max-w-full mx-auto shadow-md sm:rounded-lg">
      {loadPrestataire ? (
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
                      id={prestataire.id}
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
                    disabled={!isValid || loading}
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
