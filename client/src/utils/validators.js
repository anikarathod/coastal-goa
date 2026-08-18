// Email
export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Phone (India)
export const validatePhone = (phone) => {
  return /^[6-9]\d{9}$/.test(phone);
};

// Password
export const validatePassword = (password) => {
  return password.length >= 6;
};

// Required Field
export const isRequired = (value) => {
  return value !== undefined &&
    value !== null &&
    value.toString().trim() !== "";
};

// Booking Form Validation
export const validateBooking = (booking) => {
  const errors = {};

  if (!isRequired(booking.name))
    errors.name = "Name is required";

  if (!validateEmail(booking.email))
    errors.email = "Invalid email";

  if (!validatePhone(booking.phone))
    errors.phone = "Invalid phone number";

  if (!booking.travelDate)
    errors.travelDate = "Travel date required";

  return errors;
};