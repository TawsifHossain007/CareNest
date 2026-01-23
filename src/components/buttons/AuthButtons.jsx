"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import Swal from "sweetalert2";

const AuthButtons = () => {
  const { data: session, status } = useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await signOut();
    Swal.fire("Logged Out", "See you soon!", "success");
  };

  return (
    <div>
      {status === "authenticated" ? (
        <div className="flex items-center gap-3">


          {/* Avatar Dropdown */}
          {user && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user.image} alt="User Avatar" />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content z-[999] menu p-4 shadow-lg bg-base-100 rounded-xl w-72 
                backdrop-blur-lg border border-base-300"
              >
                <li className="text-center flex flex-col items-center">
                  <img
                    src={user.image}
                    className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-200 ring-offset-2 mb-2"
                    alt="User"
                  />

                  <h3 className="font-bold text-lg text-secondary">{user.name}</h3>
                  <p className="text-sm opacity-70">{user.email}</p>
                </li>

                <div className="divider"></div>

                <li>
                  <button onClick={handleLogout} className="btn btn-primary btn-outline w-full">
                    Logout
                  </button>
                </li>
              </ul>
              
            </div>
          )}
        </div>
      ) : (
        <Link href="/login" className="btn btn-primary btn-outline">
          Login
        </Link>
      )}
    </div>
  );
};

export default AuthButtons;
