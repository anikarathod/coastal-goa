import { FaSearch, FaTimes } from "react-icons/fa";

const SearchBar = ({
  value = "",
  onChange,
  placeholder = "Search...",
  onClear,
}) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange("");
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-11 focus:border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-200"
      />

      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
};

export default SearchBar;