import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

  const [theme, setTheme] = useState("light");

  useEffect(() => {

    document.documentElement.className = theme;

    localStorage.setItem("theme", theme);

  }, [theme]);

  useEffect(() => {

    const savedTheme =
      localStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme);
    }

  }, []);

  const toggleTheme = () => {

    setTheme((prev) =>
      prev === "light"
        ? "dark"
        : "light"
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () =>
  useContext(ThemeContext);