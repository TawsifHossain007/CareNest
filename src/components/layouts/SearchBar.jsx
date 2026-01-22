"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("search") || "");

  // Update URL when user types (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value.trim()) {
        params.set("search", value.trim());
        params.set("page", "1");
      } else {
        params.delete("search");
        params.delete("page");
      }

      const newURL = `/services?${params.toString()}`;
      if (window.location.pathname + window.location.search !== newURL) {
        router.push(newURL);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [value]);

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
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="grow"
      />
    </label>
  );
};

export default SearchBar;