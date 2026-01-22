"use client";

import Link from "next/link";

const Pagination = ({ page, totalPages, search }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-12">
      <div className="join">
        {/* Previous */}
        <Link
          href={`?search=${search}&page=${page - 1}`}
          className={`join-item btn border-0 ${page === 1 ? "btn-disabled" : ""}`}
        >
          Prev
        </Link>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, i) => {
          const pageNumber = i + 1;
          return (
            <Link
              key={pageNumber}
              href={`?search=${search}&page=${pageNumber}`}
              className={`join-item btn border-0 ${
                page === pageNumber ? "btn-primary" : "btn-outline"
              }`}
            >
              {pageNumber}
            </Link>
          );
        })}

        {/* Next */}
        <Link
          href={`?search=${search}&page=${page + 1}`}
          className={`join-item btn border-0 ${
            page === totalPages ? "btn-disabled" : ""
          }`}
        >
          Next
        </Link>
      </div>
    </div>
  );
};

export default Pagination;
