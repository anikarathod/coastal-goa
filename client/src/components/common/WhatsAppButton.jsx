import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  // Replace with your WhatsApp number
  const phoneNumber = "919175884119";

  // Default message
  const message =
    "Hello Coastal Goa! I would like to know more about your tour packages.";

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-green-500 px-5 py-3 text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-green-600"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={28} />

      <span className="hidden md:block font-medium">
        Chat with us
      </span>
    </button>
  );
};

export default WhatsAppButton;