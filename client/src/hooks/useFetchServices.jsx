import { useEffect, useState } from "react";

export const useFetchServices = (url) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        const jsonData = await res.json();
        setServices(jsonData);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };
    fetchServices();
  }, [url]);

  const reFetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const jsonData = await res.json();
      setServices(jsonData);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };

  return { services, setServices, loading, setLoading, reFetchServices };
};
