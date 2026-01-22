"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const SearchInput = ({ placeholder = "Search Services" }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

  // Update search term when URL changes
  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearch = (value) => {
    const params = new URLSearchParams(searchParams);
    
    if (value.trim()) {
      params.set("search", value.trim());
    } else {
      params.delete("search");
    }
    
    // Reset to page 1 when searching
    params.delete("page");
    
    router.push(`/services?${params.toString()}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Optional: Debounced search (search as you type)
    // Uncomment the lines below if you want instant search
    // clearTimeout(window.searchTimeout);
    // window.searchTimeout = setTimeout(() => {
    //   handleSearch(value);
    // }, 300);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <label className="input input-bordered flex items-center gap-2">
        <svg
          className="h-4 w-4 opacity-70"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
        <input
          type="search"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          className="grow"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              handleSearch("");
            }}
            className="btn btn-ghost btn-sm btn-circle"
          >
            ✕
          </button>
        )}
      </label>
    </form>
  );
};

export default SearchInput;