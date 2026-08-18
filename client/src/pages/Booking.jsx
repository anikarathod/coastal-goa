import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import api from "../services/api";

import Loader from "../components/common/Loader";
import BookingForm from "../components/booking/BookingForm";
import SuccessModal from "../components/booking/SuccessModal";

const Booking = () => {
  const location = useLocation();

  const [loading, setLoading] = useState(true);

  const [packages, setPackages] = useState([]);
  const [services, setServices] = useState([]);

  // Multiple Package Selection
  const [selectedPackages, setSelectedPackages] = useState(
    location.state?.package
      ? [location.state.package]
      : []
  );

  // Multiple Service Selection
  const [selectedServices, setSelectedServices] = useState(
    location.state?.service
      ? [location.state.service]
      : []
  );

  const [showSuccess, setShowSuccess] =
    useState(false);

  useEffect(() => {
    loadBookingData();
  }, []);

  const loadBookingData = async () => {
    try {
      setLoading(true);

      const [packageRes, serviceRes] =
        await Promise.all([
          api.get("/packages"),
          api.get("/services"),
        ]);

      const packagesData =
        packageRes.data.packages ||
        packageRes.data.data ||
        packageRes.data ||
        [];

      const servicesData =
        serviceRes.data.services ||
        serviceRes.data.data ||
        serviceRes.data ||
        [];

      setPackages(
        Array.isArray(packagesData)
          ? packagesData
          : []
      );

      setServices(
        Array.isArray(servicesData)
          ? servicesData
          : []
      );
    } catch (error) {
      console.error(
        "Booking Data Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cyan-600 to-blue-700 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-5xl font-bold">
            Book Your Goa Trip
          </h1>

          <p className="mt-5 text-lg text-cyan-100">
            Select multiple packages and services
            for your perfect Goa holiday.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <BookingForm
            packages={packages}
            services={services}
            selectedPackages={selectedPackages}
            setSelectedPackages={
              setSelectedPackages
            }
            selectedServices={
              selectedServices
            }
            setSelectedServices={
              setSelectedServices
            }
            onSuccess={() =>
              setShowSuccess(true)
            }
          />
        </div>
      </section>

      {/* Success Modal */}
      <SuccessModal
        open={showSuccess}
        onClose={() =>
          setShowSuccess(false)
        }
      />
    </div>
  );
};

export default Booking;