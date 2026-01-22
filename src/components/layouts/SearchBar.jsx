"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get current search from URL
  const currentSearch = searchParams.get("search") || "";
  const [searchValue, setSearchValue] = useState(currentSearch);
  const isTyping = useRef(false);

  // Simple debounced search
  useEffect(() => {
    if (isTyping.current) {
      const timer = setTimeout(() => {
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
        isTyping.current = false;
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [searchValue, searchParams, router]);

  // Keep input in sync with URL only when not typing
  useEffect(() => {
    if (!isTyping.current && searchValue !== currentSearch) {
      setSearchValue(currentSearch);
    }
  }, [currentSearch]);

  const handleInputChange = (e) => {
    isTyping.current = true;
    setSearchValue(e.target.value);
  };

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
        onChange={handleInputChange}
        className="grow"
      />
    </label>
  );
};

export default SearchBar;