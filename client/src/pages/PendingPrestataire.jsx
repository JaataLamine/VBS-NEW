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
  const handleCheckbox = () => {
    // const prestataire = prestataires.find((prestataire) => {
    //   prestataire.id == e.id;
    // });
    // prestataire.isValid = !isValid;
    // setIsValid(prestataire.isValid);
    // console.log(prestataire);
    setIsValid(!isValid);
    setIsValid((prev) => ({ ...prev, isValid: !isValid }));
    setPrestataires((prev) => ({ ...prev, isValid: !isValid }));
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
    await fetch(`/api/prestataire/delete/${prestataire._id}`, {
      method: "DELETE",
    });
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
    <div className="relative max-w-full mx-auto overflow-x-auto shadow-md sm:rounded-lg">
      {loadPrestataire ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full text-sm text-left text-gray-700 rtl:text-right">
          <caption className="text-3xl font-semibold text-center caption-top my-7">
            Prestataire en attente de validation
          </caption>
          <thead className="text-center text-gray-700 uppercase text-2xs bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-lg">
                NOM
              </th>
              <th scope="col" className="px-6 py-3 text-lg">
                ADRESSE
              </th>
              <th scope="col" className="px-6 py-3 text-lg">
                TELEPHONE
              </th>
              <th scope="col" className="px-6 py-3 text-lg">
                SERVICE
              </th>
              <th scope="col" className="px-6 py-3 text-lg">
                VALIDER
              </th>
              <th scope="col" className="px-6 py-3 text-lg">
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
                <td className="px-6 py-4 text-base">{prestataire.name}</td>
                <td className="px-6 py-4 text-base">{prestataire.address}</td>
                <td className="px-6 py-4 text-base">{prestataire.phone}</td>
                <td className="px-6 py-4 text-base">
                  {prestataire.serviceName}
                </td>
                <td className="px-6 py-4 text-base">
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
                <td className="px-6 py-4 mx-auto text-base">
                  <button
                    disabled={!isValid || loading}
                    onClick={handleConfirm}
                    className="px-6 py-4 font-medium text-blue-600 hover:underline disabled:opacity-50 disabled:hover:none"
                  >
                    Confirmer
                  </button>
                  <button
                    onClick={handleDelete}
                    className="mx-auto font-medium text-red-600 hover:underline ms-3"
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
