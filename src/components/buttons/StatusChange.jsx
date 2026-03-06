"use client";
import { UpdateBookingStatus } from "@/actions/server/Booking";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import React from "react";

const StatusChange = ({ bookingId }) => {
  const router = useRouter();
  const handleStatusChange = async (newStatus) => {
    const result = await Swal.fire({
      title: `Change Status to ${newStatus}?`,
      text: "This will change the status of this booking.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00a2b9",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await UpdateBookingStatus(bookingId, newStatus);
        
        if (response.success) {
          await Swal.fire({
            title: `Status Updated to ${newStatus}!`,
            text: `The booking status has been changed to ${newStatus}.`,
            icon: "success",
            confirmButtonColor: "#00a2b9",
          });
          router.refresh();
        } else {
          await Swal.fire({
            title: "Error!",
            text: response.message,
            icon: "error",
            confirmButtonColor: "#d33",
          });
        }
      } catch (error) {
        await Swal.fire({
          title: "Error!",
          text: "Failed to update booking status",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    }
  };
  return (
    <div>
      <div className="dropdown dropdown-center">
        <div tabIndex={0} role="button" className="btn btn-primary text-white">
          Change Status
        </div>
        <ul
          tabIndex="-1"
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
        >
          <li
            onClick={() => handleStatusChange("pending")}
            className="btn btn-primary btn-outline"
          >
            Pending
          </li>
          <li
            onClick={() => handleStatusChange("confirmed")}
            className="btn btn-secondary"
          >
            Confirmed
          </li>
          <li
            onClick={() => handleStatusChange("cancelled")}
            className="btn btn-error text-white"
          >
            Cancelled
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StatusChange;
