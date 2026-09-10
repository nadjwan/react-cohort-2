import { useState } from "react";

function ProductSearch({
  onSearch,
  categories = [],
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    onSearch(value);
  };

  const handleClear = () => {
    setInput("");
    onSearch("");
  };

  return (
    <div className="mb-8 flex flex-col md:flex-row items-center gap-3 w-full">
      {/* Search Input - Expands to take available space */}
      <div className="relative w-full md:flex-1">
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Search products..."
          className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-10 text-sm text-gray-900 shadow-sm transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
        {/* Search Icon */}
        <svg
          className="absolute left-3 top-3 h-4 w-4 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        {/* Clear (X) Button - Only visible when there is text */}
        {input && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-2.5 p-0.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Clear search"
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Category Dropdown */}
      <div className="w-full md:w-48 shrink-0">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-white py-2.5 px-3 text-sm text-gray-900 shadow-sm capitalize focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "All Categories" : cat}
            </option>
          ))}
        </select>
      </div>

      {/* Sort By Dropdown */}
      <div className="w-full md:w-48 shrink-0">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-white py-2.5 px-3 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        >
          <option value="default">Sort: Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="title-asc">Name: A to Z</option>
          <option value="title-desc">Name: Z to A</option>
        </select>
      </div>
    </div>
  );
}

export default ProductSearch;
