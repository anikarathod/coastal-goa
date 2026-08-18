import { useState } from "react";

import CustomerDetails from "./CustomerDetails";
import TravelDetails from "./TravelDetails";
import PackageSelector from "./PackageSelector";
import ServiceSelector from "./ServiceSelector";
import SuccessModal from "./SuccessModal";
import BookingSummary from "./BookingSummary";
const BookingForm = ({
  packages = [],
  services = [],
}) => {
  const initialState = {
    customer: {
      fullName: "",
      email: "",
      phone: "",
    },

    travel: {
      travelDate: "",
      adults: 1,
      children: 0,
      specialRequests: "",
    },

    selectedPackages: [],
    selectedServices: [],
  };

  const [bookingData, setBookingData] =
    useState(initialState);

  const [loading, setLoading] =
    useState(false);

  const [showSuccess, setShowSuccess] =
    useState(false);

  /* CUSTOMER */

  const updateCustomer = (field, value) => {
    setBookingData((prev) => ({
      ...prev,
      customer: {
        ...prev.customer,
        [field]: value,
      },
    }));
  };

  /* TRAVEL */

  const updateTravel = (field, value) => {
    setBookingData((prev) => ({
      ...prev,
      travel: {
        ...prev.travel,
        [field]: value,
      },
    }));
  };

  /* MULTIPLE PACKAGES */

  const setSelectedPackages = (
    selectedPackages
  ) => {
    setBookingData((prev) => ({
      ...prev,
      selectedPackages,
    }));
  };

  /* MULTIPLE SERVICES */

  const toggleService = (service) => {
    setBookingData((prev) => {
      const exists =
        prev.selectedServices.find(
          (item) =>
            item._id === service._id
        );

      if (exists) {
        return {
          ...prev,
          selectedServices:
            prev.selectedServices.filter(
              (item) =>
                item._id !== service._id
            ),
        };
      }

      return {
        ...prev,
        selectedServices: [
          ...prev.selectedServices,
          service,
        ],
      };
    });
  };

  /* VALIDATION */

  const validateBooking = () => {
    const { customer, travel } =
      bookingData;

    if (!customer.fullName.trim()) {
      alert("Please enter your name");
      return false;
    }

    if (
      !customer.phone ||
      customer.phone.length !== 10
    ) {
      alert(
        "Please enter a valid 10 digit phone number"
      );
      return false;
    }

    if (!travel.travelDate) {
      alert("Please select travel date");
      return false;
    }

    if (
      bookingData.selectedPackages
        .length === 0
    ) {
      alert(
        "Please select at least one package"
      );
      return false;
    }

    return true;
  };

  /* WHATSAPP BOOKING */

  const handleBooking = () => {
    if (!validateBooking()) return;

    setLoading(true);

    try {
      const packageList =
        bookingData.selectedPackages
          .map(
            (pkg) => `• ${pkg.title}`
          )
          .join("\n");

      const serviceList =
        bookingData.selectedServices
          .length > 0
          ? bookingData.selectedServices
              .map(
                (service) =>
                  `• ${service.title}`
              )
              .join("\n")
          : "None";

      const whatsappMessage = `
🌊 *COASTAL GOA BOOKING*

👤 Name:
${bookingData.customer.fullName}

📞 Phone:
${bookingData.customer.phone}

📧 Email:
${bookingData.customer.email || "Not Provided"}

📅 Travel Date:
${bookingData.travel.travelDate}

👨 Adults:
${bookingData.travel.adults}

🧒 Children:
${bookingData.travel.children}

📍 Selected Packages:
${packageList}

🛎️ Selected Services:
${serviceList}

📝 Special Requests:
${
  bookingData.travel
    .specialRequests || "None"
}
`;

      window.open(
        `https://wa.me/919175884119?text=${encodeURIComponent(
          whatsappMessage
        )}`,
        "_blank"
      );

      setShowSuccess(true);

      setBookingData(initialState);
    } catch (error) {
      console.error(error);
      alert("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
  <>
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      {/* Heading */}

      <div className="mb-12 text-center">
       <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          BOOK YOUR GOA TRIP
        </h1>
       <p className="mt-3 text-sm md:text-base text-gray-600">
          Select packages and services and book directly on WhatsApp.
        </p>
      </div>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* LEFT SIDE */}

        <div className="space-y-8 lg:col-span-2">

          {/* Customer Details */}

<div className="rounded-xl bg-white p-4 md:p-6 shadow">
  <h2 className="mb-4 text-xl md:text-2xl font-bold">
    Customer Details
  </h2>

  <CustomerDetails
    customer={bookingData.customer}
    updateCustomer={updateCustomer}
  />
</div>
          <div className="rounded-xl bg-white p-4 md:p-6 shadow">
  <h2 className="mb-4 text-xl md:text-2xl font-bold">
    Travel Details
  </h2>

  <TravelDetails
    travel={bookingData.travel}
    updateTravel={updateTravel}
  />
</div>

          <div className="rounded-xl bg-white p-4 md:p-6 shadow">
  <h2 className="mb-4 text-xl md:text-2xl font-bold">
    Packages
  </h2>

  <PackageSelector
    packages={packages}
    selectedPackages={bookingData.selectedPackages}
    onChange={setSelectedPackages}
  />
</div>
          <div className="rounded-xl bg-white p-4 md:p-6 shadow">
  <h2 className="mb-4 text-xl md:text-2xl font-bold">
    Services
  </h2>

  <ServiceSelector
    services={services}
    selectedServices={bookingData.selectedServices}
    toggleService={toggleService}
  />
</div>

        </div>

        
       

{/* RIGHT SIDE */}

<div className="h-fit lg:sticky lg:top-24">

  <BookingSummary
    bookingData={bookingData}
    onBook={handleBooking}
    loading={loading}
  />

</div>
        

      </div>

    </div>

    <SuccessModal
      open={showSuccess}
      onClose={() => setShowSuccess(false)}
    />
  </>
);
};

export default BookingForm;