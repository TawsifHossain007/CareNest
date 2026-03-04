import { getUsers } from "@/actions/server/Users";
import React from "react";
import { FaUserPlus, FaUserSlash } from "react-icons/fa";

const User = async () => {
  const users = await getUsers();
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold text-primary">User Management</h1>
      <div className="overflow-x-auto mt-8">
        <table className="table">
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.Photo} alt={user.name} />
                      </div>
                    </div>

                    <div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </div>
                </td>

                <td className="font-semibold">{user.email}</td>

                <td className="font-bold capitalize">{user.role}</td>
                <td className="flex gap-2">
                  {user.role !== "admin" ? (
                    <div className="tooltip" data-tip="Make Admin">
                      <button
                        // onClick={() => handleMakeAdmin(user)}
                        className="btn btn-sm btn-success"
                      >
                        <FaUserPlus />
                      </button>
                    </div>
                  ) : (
                    <div className="tooltip" data-tip="Remove Admin">
                      <button
                        // onClick={() => handleRemoveAdmin(user)}
                        className="btn btn-sm btn-warning"
                      >
                        <FaUserSlash />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
