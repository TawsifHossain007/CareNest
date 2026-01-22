"use client";

import { useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ currentPage, totalPages, total, limit = 12 }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`/services?${params.toString()}`);
  };

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();
  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, total);

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      {/* Results info */}
      <div className="text-sm text-gray-600">
        Showing {startItem} to {endItem} of {total} services
      </div>

      {/* Pagination buttons */}
      <div className="join">
        <button
          className="join-item btn"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          «
        </button>

        {visiblePages.map((page, index) => (
          <button
            key={index}
            className={`join-item btn ${
              page === currentPage ? "btn-active" : ""
            }`}
            onClick={() => typeof page === "number" && handlePageChange(page)}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}

        <button
          className="join-item btn"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Pagination;