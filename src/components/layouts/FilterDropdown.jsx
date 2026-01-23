"use client";

import { useRouter, useSearchParams } from "next/navigation";

const CATEGORIES = ["Baby Care", "Elderly Care", "Sick Care"];

const FilterDropdown = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category");

  const handleCategoryChange = (category) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    params.set("page", "1"); // reset pagination
    router.push(`/services?${params.toString()}`);
  };

  return (
    <div className="dropdown dropdown-center">
      <div 
        tabIndex={0} 
        role="button" 
        className={`btn ${selectedCategory ? "btn-primary" : "btn-outline"}`}
      >
        <span>{selectedCategory ? selectedCategory : "Filter By"}</span>
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-10 w-56 p-2 shadow"
      >
        {/* All */}
        <li>
          <button
            onClick={() => handleCategoryChange("")}
            className={`justify-between ${
              !selectedCategory ? "text-primary font-semibold" : ""
            }`}
          >
            All Services
          </button>
        </li>

        {CATEGORIES.map((cat) => (
          <li key={cat}>
            <button
              onClick={() => handleCategoryChange(cat)}
              className={`justify-between ${
                selectedCategory === cat
                  ? "text-primary font-semibold"
                  : ""
              }`}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterDropdown;
