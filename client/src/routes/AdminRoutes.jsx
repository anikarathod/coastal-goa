import { Routes, Route } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

// Dashboard
import Dashboard from "../pages/admin/Dashboard";

// Packages
import Packages from "../pages/admin/Packages";
import AddPackage from "../pages/admin/AddPackage";
import EditPackage from "../pages/admin/EditPackage";

// Services
import Services from "../pages/admin/Services";
import AddService from "../pages/admin/AddService";
import EditService from "../pages/admin/EditService";

// Gallery
import Gallery from "../pages/admin/Gallery";
import AddGallery from "../pages/admin/AddGallery";
import EditGallery from "../pages/admin/EditGallery";

// Bookings
import Bookings from "../pages/admin/Bookings";
import BookingDetails from "../pages/admin/BookingDetails";

// Other
import Customers from "../pages/admin/Customers";
import Contacts from "../pages/admin/Contacts";
import Settings from "../pages/admin/Settings";

const AdminRoutes = () => {
  return (
    <Routes>

      {/* Admin authentication */}
      <Route element={<ProtectedRoute adminOnly />}>

        {/* Admin Layout */}
        <Route element={<AdminLayout />}>

          {/* =========================
              DASHBOARD
          ========================== */}

          <Route
            index
            element={<Dashboard />}
          />


          {/* =========================
              PACKAGES
          ========================== */}

          <Route
            path="packages"
            element={<Packages />}
          />

          <Route
            path="packages/new"
            element={<AddPackage />}
          />

          <Route
            path="packages/edit/:id"
            element={<EditPackage />}
          />


          {/* =========================
              SERVICES
          ========================== */}

          <Route
            path="services"
            element={<Services />}
          />

          <Route
            path="services/new"
            element={<AddService />}
          />

          <Route
            path="services/edit/:id"
            element={<EditService />}
          />


          {/* =========================
              GALLERY
          ========================== */}

          <Route
            path="gallery"
            element={<Gallery />}
          />

          <Route
            path="gallery/new"
            element={<AddGallery />}
          />

          <Route
            path="gallery/edit/:id"
            element={<EditGallery />}
          />


          {/* =========================
              BOOKINGS
          ========================== */}

          <Route
            path="bookings"
            element={<Bookings />}
          />

          <Route
            path="bookings/:id"
            element={<BookingDetails />}
          />


          {/* =========================
              CUSTOMERS
          ========================== */}

          <Route
            path="customers"
            element={<Customers />}
          />


          {/* =========================
              CONTACTS
          ========================== */}

          <Route
            path="contacts"
            element={<Contacts />}
          />


          {/* =========================
              SETTINGS
          ========================== */}

          <Route
            path="settings"
            element={<Settings />}
          />

        </Route>

      </Route>

    </Routes>
  );
};

export default AdminRoutes;