"use client";

import { useRouter, useSearchParams } from "next/navigation";

const FilterDropdown = ({ filters = [] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("category") || "";

  const handleFilterChange = (filterValue) => {
    const params = new URLSearchParams(searchParams);
    
    if (filterValue && filterValue !== "all") {
      params.set("category", filterValue);
    } else {
      params.delete("category");
    }
    
    // Reset to page 1 when filtering
    params.delete("page");
    
    router.push(`/services?${params.toString()}`);
  };

  // Default filters - you can pass custom ones or fetch from API
  const defaultFilters = [
    { label: "All Categories", value: "all" },
    { label: "Web Development", value: "web-development" },
    { label: "Mobile Development", value: "mobile-development" },
    { label: "Design", value: "design" },
    { label: "Consulting", value: "consulting" },
  ];

  const filterOptions = filters.length > 0 ? filters : defaultFilters;

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-primary btn-outline m-1"
      >
        Filter By: {currentFilter ? filterOptions.find(f => f.value === currentFilter)?.label || currentFilter : "All"}
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-lg border"
      >
        {filterOptions.map((filter) => (
          <li key={filter.value}>
            <button
              onClick={() => handleFilterChange(filter.value)}
              className={`w-full text-left ${
                (filter.value === "all" && !currentFilter) || 
                filter.value === currentFilter 
                  ? "active" 
                  : ""
              }`}
            >
              {filter.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterDropdown;