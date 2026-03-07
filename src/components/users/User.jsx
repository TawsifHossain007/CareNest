import { getUsers } from "@/actions/server/Users";
import React from "react";
import { FaUserPlus, FaUserSlash } from "react-icons/fa";
import MakeAdmin from "../buttons/MakeAdmin";
import RemoveAdmin from "../buttons/RemoveAdmin";
import Image from "next/image";

const User = async () => {
  const users = await getUsers();
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">User Management</h1>
        <p className="text-sm text-gray-600">Manage user roles and permissions</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-linear-to-r from-primary to-primary/80 text-white">
              <tr>
                <th className="text-white font-semibold py-4">Sl No.</th>
                <th className="text-white font-semibold py-4">User</th>
                <th className="text-white font-semibold py-4">Email</th>
                <th className="text-white font-semibold py-4">Role</th>
                <th className="text-white font-semibold py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr 
                  key={user._id}
                  className="hover:bg-primary/5 transition-colors duration-150 border-b border-gray-100"
                >
                  <th className="font-medium text-gray-700">{index + 1}</th>

                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12 ring-2 ring-primary/20">
                          <Image src={user.Photo} alt={user.name} width={48} height={48} />
                        </div>
                      </div>

                      <div>
                        <div className="font-bold text-gray-800">{user.name}</div>
                      </div>
                    </div>
                  </td>

                  <td className="font-medium text-gray-700">{user.email}</td>

                  <td>
                    <span className={`badge ${
                      user.role === "admin" ? "badge-primary" : 
                      user.role === "user" ? "badge-ghost" : "badge-info"
                    } font-semibold capitalize`}>
                      {user.role}
                    </span>
                  </td>
                  
                  <td className="flex gap-2">
                    {user.role !== "admin" ? (
                      <div className="tooltip" data-tip="Make Admin">
                       <MakeAdmin user={user}></MakeAdmin>
                      </div>
                    ) : (
                      <div className="tooltip" data-tip="Remove Admin">
                        <RemoveAdmin user={user}></RemoveAdmin>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default User;
