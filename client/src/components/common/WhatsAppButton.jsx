import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "919175884119";

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
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex items-center gap-2 rounded-full bg-green-500 px-3 py-3 md:px-5 md:py-3 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-green-600"
    >
      <FaWhatsapp className="text-2xl md:text-3xl" />

      <span className="hidden lg:block font-medium">
        Chat with us
      </span>
    </button>
  );
};

export default WhatsAppButton;