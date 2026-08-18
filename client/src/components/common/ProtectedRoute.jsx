import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Get admin data from localStorage
  const admin = JSON.parse(localStorage.getItem("admin"));

  // If not logged in, redirect to login page
  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, show requested page
  return <Outlet />;
};

export default ProtectedRoute;