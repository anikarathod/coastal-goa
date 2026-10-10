import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Packages from "../pages/Packages";
import PackageDetails from "../pages/PackageDetails";
import Contact from "../pages/Contact";
import Booking from "../pages/Booking";  // ← ADD THIS IMPORT

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/packages" element={<Packages />} />
      <Route path="/packages/:slug" element={<PackageDetails />} />
      <Route path="/booking" element={<Booking />} />  {/* ← ADD THIS ROUTE */}
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default AppRoutes;