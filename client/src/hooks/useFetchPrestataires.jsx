import { useEffect, useState } from "react";

export const useFetchPrestataires = (url) => {
  const [prestataires, setPrestataires] = useState([]);
  const [loadPrestataire, setLoadPrestataire] = useState(false);

  useEffect(() => {
    const fetchPrestataires = async () => {
      setLoadPrestataire(false);
      const res = await fetch(url);
      const resData = await res.json();
      setPrestataires(resData);
      setLoadPrestataire(false);
    };
    fetchPrestataires();
  }, []);

  return { prestataires, setPrestataires, loadPrestataire };
};
