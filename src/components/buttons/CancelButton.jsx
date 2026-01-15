"use client";
import React from "react";

const CancelButton = () => {
  return (
    <div>
      <button
        type="button"
        className="w-full py-6 btn btn-primary btn-outline rounded-xl font-semibold transition"
        onClick={() => window.history.back()}
      >
        Cancel
      </button>
    </div>
  );
};

export default CancelButton;
