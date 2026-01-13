import React from "react";

import Link from "next/link";

import { CiBookmarkCheck } from "react-icons/ci";
import AuthButtons from "../buttons/AuthButtons";
import Logo from "./Logo";
import NavLink from "../buttons/Navlink";

const Navbar = () => {
  const nav = (
    <>
      <li>
        <NavLink href={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink href={"/services"}>Services</NavLink>
      </li>
      <li>
        <NavLink href={"/blogs"}>Blogs</NavLink>
      </li>
      <li>
        <NavLink href={"/contact"}>Contact Us</NavLink>
      </li>
    </>
  );

  return (
      <div className="navbar bg-base-200 p-3 rounded-2xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {nav}
            </ul>
          </div>
          <Logo></Logo>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{nav}</ul>
        </div>
        <div className="navbar-end space-x-4">
          <Link href={"/cart"} className="btn btn-primary">
            {" "}
            <CiBookmarkCheck size={25} className="font-black"></CiBookmarkCheck>{" "}
          </Link>
          <AuthButtons></AuthButtons>
        </div>
      </div>

  );
};

export default Navbar;
