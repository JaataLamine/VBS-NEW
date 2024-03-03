import { useFetchPrestataires } from "../hooks/useFetchPrestataires";

export const Prestataires = () => {
  const { prestataires, loadPrestataire } =
    useFetchPrestataires("/api/prestataire");

  console.log(prestataires);

  return (
    <div className="relative max-w-full mx-auto overflow-x-auto shadow-md sm:rounded-lg">
      {loadPrestataire ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full text-sm text-left text-gray-700 rtl:text-right">
          <caption className="text-3xl font-semibold text-center caption-top my-7">
            Liste Des Prestataires
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
                DISPONIBLE
              </th>
            </tr>
          </thead>
          <tbody>
            {prestataires.map((prestataire, idx) => (
              <tr key={idx} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-base">{prestataire.name}</td>
                <td className="px-6 py-4 text-base">{prestataire.address}</td>
                <td className="px-6 py-4 text-base">{prestataire.phone}</td>
                <td className="px-6 py-4 text-base">
                  {prestataire.serviceName}
                </td>
                <td className="px-6 py-4 text-base">
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
