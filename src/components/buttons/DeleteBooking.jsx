"use client"
import { DeleteBookings } from "@/actions/server/Booking";
import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const DeleteBooking = ({ bookingId }) => {
  const handleDelete = async (bookingId) => {
    Swal.fire({
      title: "Cancel Booking?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "oklch(62% 0.14 230)",
      cancelButtonColor: "oklch(62% 0.22 25)",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await DeleteBookings(bookingId);
          Swal.fire({
            title: "Cancelled!",
            text: "Your booking has been cancelled.",
            icon: "success",
            confirmButtonColor: "oklch(62% 0.14 230)",
          });
          // revalidatePath() in the server action handles the cache invalidation
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Failed to cancel booking. Please try again.",
            icon: "error",
            confirmButtonColor: "oklch(62% 0.14 230)",
          });
        }
      }
    });
  };
  return (
    <div>
      <button
        onClick={() => handleDelete(bookingId)}
        className="btn btn-error text-white"
      >
        <FaRegTrashCan></FaRegTrashCan>
      </button>
    </div>
  );
};

export default DeleteBooking;
