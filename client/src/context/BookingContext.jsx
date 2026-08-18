import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

const initialBooking = {
  package: null,
  services: [],
  travelDate: "",
  adults: 1,
  children: 0,
  specialRequests: "",
  total: 0,
};

export const BookingProvider = ({ children }) => {
  const [booking, setBooking] = useState(initialBooking);

  // Select Package
  const selectPackage = (pkg) => {
    setBooking((prev) => ({
      ...prev,
      package: pkg,
    }));
  };

  // Add Service
  const addService = (service) => {
    const exists = booking.services.find(
      (item) => item._id === service._id
    );

    if (exists) return;

    setBooking((prev) => ({
      ...prev,
      services: [...prev.services, service],
    }));
  };

  // Remove Service
  const removeService = (id) => {
    setBooking((prev) => ({
      ...prev,
      services: prev.services.filter(
        (service) => service._id !== id
      ),
    }));
  };

  // Update Travel Details
  const updateBooking = (data) => {
    setBooking((prev) => ({
      ...prev,
      ...data,
    }));
  };

  // Calculate Total Price
  const calculateTotal = () => {
    let total = 0;

    if (booking.package) {
      total += Number(booking.package.price);
    }

    booking.services.forEach((service) => {
      total += Number(service.price);
    });

    total *= booking.adults;

    return total;
  };

  // Clear Booking
  const clearBooking = () => {
    setBooking(initialBooking);
  };

  return (
    <BookingContext.Provider
      value={{
        booking,
        setBooking,

        selectPackage,
        addService,
        removeService,
        updateBooking,
        calculateTotal,
        clearBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;

export const useBooking = () => useContext(BookingContext);