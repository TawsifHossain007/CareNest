"use client";

import React from "react";
import { FaUserPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import { updateUserRole } from "@/actions/server/Users";
import { useRouter } from "next/navigation";

const MakeAdmin = ({ user }) => {
  const router = useRouter();

  const handleMakeAdmin = async () => {
    const result = await Swal.fire({
      title: `Make ${user.name} an admin?`,
      text: "Give admin privileges to this user.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00a2b9",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make them an admin!",
    });

    if (result.isConfirmed) {
      try {
        const response = await updateUserRole(user._id, "admin");

        if (response.success) {
          await Swal.fire({
            title: "Admin privileges granted!",
            text: `${user.name} is now an admin.`,
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
      <button onClick={handleMakeAdmin} className="btn btn-sm btn-success">
        <FaUserPlus />
      </button>
    </div>
  );
};

export default MakeAdmin;
