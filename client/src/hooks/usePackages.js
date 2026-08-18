import { useEffect, useState } from "react";
import api from "../services/api";

const usePackages = (params = {}) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPackages = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/packages", {
        params,
      });

      setPackages(data.packages || []);
      setError("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load packages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, [JSON.stringify(params)]);

  return {
    packages,
    loading,
    error,
    refetch: fetchPackages,
  };
};

export default usePackages;