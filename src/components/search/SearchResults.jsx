"use client";

import { useSearchParams } from "next/navigation";

const SearchResults = ({ total, searchTerm, category }) => {
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search");
  const currentCategory = searchParams.get("category");

  if (!currentSearch && !currentCategory) return null;

  const getResultText = () => {
    let text = `Found ${total} service${total !== 1 ? 's' : ''}`;
    
    if (currentSearch && currentCategory) {
      text += ` for "${currentSearch}" in ${currentCategory}`;
    } else if (currentSearch) {
      text += ` for "${currentSearch}"`;
    } else if (currentCategory) {
      text += ` in ${currentCategory}`;
    }
    
    return text;
  };

  return (
    <div className="text-center mt-8 mb-4">
      {total > 0 ? (
        <p className="text-gray-600">{getResultText()}</p>
      ) : (
        <div className="text-gray-600">
          <p className="text-lg mb-2">No services found</p>
          <p className="text-sm">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;