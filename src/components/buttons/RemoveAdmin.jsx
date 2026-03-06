"use client";

import React from "react";
import { FaUserSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { updateUserRole } from "@/actions/server/Users";
import { useRouter } from "next/navigation";

const RemoveAdmin = ({ user }) => {
  const router = useRouter();

  const handleRemoveAdmin = async () => {
    const result = await Swal.fire({
      title: `Remove ${user.name} as an admin?`,
      text: "This will remove admin privileges from this user.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00a2b9",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove them as an admin!",
    });

    if (result.isConfirmed) {
      try {
        const response = await updateUserRole(user._id, "user");
        
        if (response.success) {
          await Swal.fire({
            title: "Admin privileges removed!",
            text: `${user.name} is no longer an admin.`,
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
          text: "Failed to update user role",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    }
  };
  return (
    <div>
      <button onClick={handleRemoveAdmin} className="btn btn-sm btn-warning">
        <FaUserSlash />
      </button>
    </div>
  );
};

export default RemoveAdmin;
