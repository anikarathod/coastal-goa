// Capitalize First Letter
export const capitalize = (text = "") =>
  text.charAt(0).toUpperCase() + text.slice(1);

// Generate Booking ID
export const generateBookingId = () => {
  return `CB-${Date.now().toString().slice(-6)}`;
};

// Get Initials
export const getInitials = (name = "") => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

// Truncate Text
export const truncateText = (text = "", length = 100) => {
  if (text.length <= length) return text;

  return text.substring(0, length) + "...";
};

// Format Phone
export const formatPhone = (phone = "") => {
  return phone.replace(/(\d{5})(\d{5})/, "$1 $2");
};