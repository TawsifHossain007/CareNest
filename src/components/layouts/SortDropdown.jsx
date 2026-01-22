"use client";

import { useRouter, useSearchParams } from "next/navigation";

const SortDropdown = ({ currentSort }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sortOptions = [
    { value: "", label: "Default" },
    { value: "price_asc", label: "Price: Low → High" },
    { value: "price_desc", label: "Price: High → Low" },
  ];

  const handleSortChange = (sortValue) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (sortValue) {
      params.set("sort", sortValue);
    } else {
      params.delete("sort");
    }
    
    // Reset to first page when sorting changes
    params.set("page", "1");
    
    router.push(`/services?${params.toString()}`);
  };

  const getCurrentSortLabel = () => {
    const option = sortOptions.find(opt => opt.value === currentSort);
    return option ? option.label : "Filter By:";
  };

  return (
    <div className="dropdown dropdown-center">
      <div
        tabIndex={0}
        role="button"
        className={`btn m-1 ${currentSort ? 'btn-primary' : 'btn-primary btn-outline'}`}
      >
        {getCurrentSortLabel()}
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <ul className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-lg border">
        {sortOptions.map((option) => (
          <li key={option.value}>
            <button
              onClick={() => handleSortChange(option.value)}
              className={`w-full text-left ${
                currentSort === option.value 
                  ? 'bg-primary text-primary-content font-semibold' 
                  : 'hover:bg-base-200'
              }`}
            >
              {option.label}
              {currentSort === option.value && (
                <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortDropdown;