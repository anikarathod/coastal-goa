import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../services/api";

const SettingsContext = createContext(null);

/* Default fallbacks — shown while loading or if API fails */
const DEFAULT_SETTINGS = {
  websiteName: "Coastal Goa",
  email: "",
  phone: "",
  whatsapp: "",
  address: "",
  facebook: "",
  instagram: "",
  youtube: "",
  googleMaps: "",
  latitude: "",
  longitude: "",
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    const fetchSettings = async () => {
      try {
        const res = await api.get("/settings");
        const fetched = res.data?.settings;

        if (active && fetched) {
          setSettings({ ...DEFAULT_SETTINGS, ...fetched });
          setError(false);
        }
      } catch (err) {
        console.error("Settings fetch failed:", err.message);
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchSettings();
    return () => {
      active = false;
    };
  }, []);

  /* Manually refresh after admin saves settings */
  const refreshSettings = async () => {
    try {
      const res = await api.get("/settings");
      if (res.data?.settings) {
        setSettings({ ...DEFAULT_SETTINGS, ...res.data.settings });
        setError(false);
      }
    } catch (err) {
      console.error("Settings refresh failed:", err.message);
    }
  };

  return (
    <SettingsContext.Provider
      value={{ settings, loading, error, refreshSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return ctx;
};