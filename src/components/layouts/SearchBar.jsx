"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get current search from URL
  const currentSearch = searchParams.get("search") || "";
  const [searchValue, setSearchValue] = useState(currentSearch);

  // Simple debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      // Only update URL if search value is different from current URL
      if (searchValue !== currentSearch) {
        const params = new URLSearchParams(searchParams.toString());
        
        if (searchValue.trim()) {
          params.set("search", searchValue.trim());
          params.set("page", "1");
        } else {
          params.delete("search");
          if (params.get("page") === "1") {
            params.delete("page");
          }
        }

        router.push(`/services?${params.toString()}`);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchValue, currentSearch, searchParams, router]);

  // Keep input in sync with URL (for back/forward navigation)
  if (searchValue !== currentSearch) {
    setSearchValue(currentSearch);
  }

  return (
    <label className="input flex items-center gap-2">
      <svg
        className="h-[1em] opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2.5"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>

      <input
        type="search"
        placeholder="Search Services"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="grow"
      />
    </label>
  );
};

export default SearchBar;