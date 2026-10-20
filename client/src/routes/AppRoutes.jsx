import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

// Public Pages
import Home from "../pages/Home";
import Packages from "../pages/Packages";
import PackageDetails from "../pages/PackageDetails";
import Services from "../pages/Services";
import ServiceDetails from "../pages/ServiceDetails";
import Gallery from "../pages/Gallery";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Booking from "../pages/Booking";
import BookingSuccess from "../pages/BookingSuccess";
import MyBookings from "../pages/MyBookings";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

// Place detail pages
import PlaceDetails from "../pages/PlaceDetails";
// 👇 1. Import the main Places page
import Places from "../pages/Places"; 

const AppRoutes = () => {
  return (
    <Routes>

      {/* =====================================
          PUBLIC WEBSITE
      ====================================== */}

      <Route element={<MainLayout />}>

        {/* HOME */}
        <Route index element={<Home />} />

        {/* PACKAGES */}
        <Route path="packages" element={<Packages />} />
        <Route path="packages/:slug" element={<PackageDetails />} />

        {/* SERVICES */}
        <Route path="services" element={<Services />} />
        <Route path="services/:id" element={<ServiceDetails />} />

        {/* 👇 2. Add the central PLACES route here */}
        <Route path="places" element={<Places />} />

        {/* PLACES — Hotels */}
        <Route path="hotels" element={<Services />} />
        <Route path="hotels/:slug" element={<PlaceDetails />} />

        {/* PLACES — Guest Houses */}
        <Route path="guesthouses" element={<Services />} />
        <Route path="guesthouses/:slug" element={<PlaceDetails />} />

        {/* PLACES — Restaurants */}
        <Route path="restaurants" element={<Services />} />
        <Route path="restaurants/:slug" element={<PlaceDetails />} />

        {/* PLACES — Shops */}
        <Route path="shops" element={<Services />} />
        <Route path="shops/:slug" element={<PlaceDetails />} />

        {/* GALLERY */}
        <Route path="gallery" element={<Gallery />} />

        {/* ABOUT */}
        <Route path="about" element={<About />} />

        {/* CONTACT */}
        <Route path="contact" element={<Contact />} />

        {/* BOOKING */}
        <Route path="booking" element={<Booking />} />
        <Route path="booking-success" element={<BookingSuccess />} />

        {/* =====================================
            PROTECTED USER ROUTES
        ====================================== */}
        <Route element={<ProtectedRoute />}>
          <Route path="my-bookings" element={<MyBookings />} />
        </Route>

      </Route>

      {/* =====================================
          AUTHENTICATION
      ====================================== */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      {/* =====================================
          PUBLIC 404
      ====================================== */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default AppRoutes;