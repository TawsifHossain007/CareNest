"use client";
import React from "react";

const CancelButton = () => {
  return (
    <div>
      <button
        type="button"
        className="px-8 py-4 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
        onClick={() => window.history.back()}
      >
        Cancel
      </button>
    </div>
  );
};

export default CancelButton;
