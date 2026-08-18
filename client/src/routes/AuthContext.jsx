import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // Restore Login When Page Refreshes
  // ==========================================

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
        const parsedUser = JSON.parse(storedUser);

        setUser(parsedUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error(
        "Failed to restore authentication:",
        error
      );

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================================
  // Login
  // ==========================================

  const login = (userData, token) => {
    if (!userData || !token) {
      console.error(
        "Login failed: user data or token missing."
      );

      return false;
    }

    localStorage.setItem(
      "token",
      token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setUser(userData);

    return true;
  };

  // ==========================================
  // Logout
  // ==========================================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };

  // ==========================================
  // Authentication Status
  // ==========================================

  const isAuthenticated =
    !!user && !!localStorage.getItem("token");

  // ==========================================
  // Context
  // ==========================================

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ==========================================
// useAuth Hook
// ==========================================

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};