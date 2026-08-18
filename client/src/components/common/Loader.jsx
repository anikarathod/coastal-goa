const Loader = ({
  size = "h-12 w-12",
  color = "border-blue-600",
  text = "Loading...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div
        className={`${size} border-4 ${color} border-t-transparent rounded-full animate-spin`}
      ></div>

      <p className="mt-4 text-gray-600 text-sm font-medium">
        {text}
      </p>
    </div>
  );
};

export default Loader;