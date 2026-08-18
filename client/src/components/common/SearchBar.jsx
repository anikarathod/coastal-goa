import { FaSearch, FaTimes } from "react-icons/fa";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search...",
  onClear,
}) => {
  return (
    <div className="relative w-full max-w-md">

      {/* Search Icon */}
      <FaSearch
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-11 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />

      {/* Clear Button */}
      {value && (
        <button
          onClick={onClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
        >
          <FaTimes />
        </button>
      )}

    </div>
  );
};

export default SearchBar;