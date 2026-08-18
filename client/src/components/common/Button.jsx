const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
  className = "",
}) => {
  // Button Variants
  const variants = {
    primary:
      "bg-blue-700 text-white hover:bg-blue-800",

    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300",

    success:
      "bg-green-600 text-white hover:bg-green-700",

    danger:
      "bg-red-600 text-white hover:bg-red-700",

    outline:
      "border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white",
  };

  // Button Sizes
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-7 py-3 text-lg",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        rounded-lg
        font-medium
        transition
        duration-300
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${
          disabled || loading
            ? "opacity-60 cursor-not-allowed"
            : "cursor-pointer"
        }
        ${className}
      `}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;