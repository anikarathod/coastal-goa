import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext();

/* Helper: get initial theme
   Priority: localStorage → system preference → light */
const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";

  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // localStorage unavailable (private mode, etc.)
  }

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }

  return "light";
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  // Apply theme to <html> element
  useEffect(() => {
    const root = document.documentElement;

    // Tailwind dark mode class
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    // Also set data attribute (useful for CSS selectors)
    root.setAttribute("data-theme", theme);

    // Set color-scheme for native browser UI (scrollbars, form controls)
    root.style.colorScheme = theme;

    // Persist
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // ignore quota/private mode errors
    }
  }, [theme]);

  // Listen for system preference changes (when user hasn't set a preference)
  useEffect(() => {
    if (!window.matchMedia) return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      // Only auto-switch if user hasn't manually chosen
      const saved = localStorage.getItem("theme");
      if (!saved) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    // Modern API
    if (media.addEventListener) {
      media.addEventListener("change", handleChange);
      return () => media.removeEventListener("change", handleChange);
    }

    // Fallback for old browsers
    media.addListener(handleChange);
    return () => media.removeListener(handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setThemeExplicit = (newTheme) => {
    if (newTheme === "light" || newTheme === "dark") {
      setTheme(newTheme);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme: setThemeExplicit,
        isDark: theme === "dark",
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
};