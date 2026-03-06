"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineAttachMoney } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import { CiFileOn } from "react-icons/ci";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex min-h-full flex-col items-start bg-white is-drawer-close:w-14 is-drawer-open:w-64">
      <ul className="menu w-full grow">
        <li>
          <Link
            href="/"
            className="flex items-center gap-3 is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="Homepage"
          >
            <FaArrowLeft />
            <span className="is-drawer-close:hidden">HomePage</span>
          </Link>

          <Link
            href="/dashboard"
            className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${
              pathname === "/dashboard" ? "bg-primary text-primary-content" : ""
            }`}
            data-tip="Dashboard Home"
          >
            <IoHomeOutline
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            />
            <span className="is-drawer-close:hidden">Dashboard Home</span>
          </Link>

          <Link
            href="/dashboard/payments"
            className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${
              pathname === "/dashboard/payments"
                ? "bg-primary text-primary-content"
                : ""
            }`}
            data-tip="Payments"
          >
            <MdOutlineAttachMoney
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            />
            <span className="is-drawer-close:hidden">All Payments</span>
          </Link>

          <Link
            className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${
              pathname === "/dashboard/users"
                ? "bg-primary text-primary-content"
                : ""
            }`}
            data-tip="User Management"
            href={"/dashboard/users"}
          >
            <HiOutlineUserGroup
              stroke="currentColor"
              className="my-1.5 inline-block
                        size-4"
            />

            <span className="is-drawer-close:hidden">User Management</span>
          </Link>

          <Link
            className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${
              pathname === "/dashboard/all-bookings"
                ? "bg-primary text-primary-content"
                : ""
            }`}
            data-tip="All Bookings"
            href={"/dashboard/all-bookings"}
          >
            <CiFileOn
              stroke="currentColor"
              className="my-1.5 inline-block
                        size-4"
            ></CiFileOn>
            <span className="is-drawer-close:hidden">All Bookings</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
