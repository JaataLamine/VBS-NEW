import { useEffect, useState } from "react";

export const Prestataires = () => {
  const [prestataires, setPrestataires] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPrestataires = async () => {
      setLoading(true);
      const res = await fetch("/api/prestataire");
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
            Liste Des Prestataires
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
                DISPONIBLE
              </th>
            </tr>
          </thead>
          <tbody>
            {prestataires.map((prestataire, idx) => (
              <tr key={idx} className="bg-white border-b hover:bg-gray-50">
                <td className="text-base px-6 py-4">{prestataire.name}</td>
                <td className="text-base px-6 py-4">{prestataire.address}</td>
                <td className="text-base px-6 py-4">{prestataire.phone}</td>
                <td className="text-base px-6 py-4">
                  {prestataire.serviceName}
                </td>
                <td className="text-base px-6 py-4">
                  {prestataire.isAvalaible}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
