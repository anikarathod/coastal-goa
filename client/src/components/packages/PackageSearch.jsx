import { FaSearch, FaTimes } from "react-icons/fa";

const PackageSearch = ({
  value,
  onChange,
  onSearch,
  onClear,
  placeholder = "Search packages...",
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="relative w-full">

      {/* Search Icon */}
      <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-300 bg-white py-4 pl-12 pr-12 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-200"
      />

      {/* Clear Button */}
      {value && (
        <button
          onClick={onClear}
          className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
        >
          <FaTimes />
        </button>
      )}

      {/* Search Button */}
      <button
        onClick={onSearch}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-cyan-600 px-4 py-2 text-white transition hover:bg-cyan-700"
      >
        Search
      </button>

    </div>
  );
};

export default PackageSearch;