"use client";

import React from "react";
import Link from "next/link";
import { FaCalendarCheck, FaDollarSign } from "react-icons/fa";
import { MdPending, MdCheckCircle } from "react-icons/md";

const UserDashboard = ({ bookings, payments }) => {
  const confirmedBookings = bookings.filter(b => b.status === "confirmed").length;
  const pendingBookings = bookings.filter(b => b.status === "pending").length;
  const totalSpent = payments.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);

  const statCards = [
    {
      title: "Total Bookings",
      value: bookings.length,
      icon: FaCalendarCheck,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      link: "/dashboard/my-bookings",
    },
    {
      title: "Confirmed Bookings",
      value: confirmedBookings,
      icon: MdCheckCircle,
      color: "bg-gradient-to-br from-green-500 to-green-600",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      link: "/dashboard/my-bookings",
    },
    {
      title: "Pending Bookings",
      value: pendingBookings,
      icon: MdPending,
      color: "bg-gradient-to-br from-yellow-500 to-yellow-600",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      link: "/dashboard/my-bookings",
    },
    {
      title: "Total Spent",
      value: `৳${totalSpent.toFixed(2)}`,
      icon: FaDollarSign,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      link: "/dashboard/my-payments",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <Link key={index} href={card.link}>
            <div
              className={`${card.color} rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-200 cursor-pointer`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium mb-1">
                    {card.title}
                  </p>
                  <h3 className="text-3xl font-bold">{card.value}</h3>
                </div>
                <div className={`${card.iconBg} p-4 rounded-full`}>
                  <card.icon className={`${card.iconColor} text-2xl`} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Recent Bookings</h3>
          <Link href="/dashboard/my-bookings" className="text-primary hover:underline text-sm">
            View All
          </Link>
        </div>
        
        {bookings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No bookings yet</p>
            <Link href="/services" className="btn btn-primary btn-sm mt-4">
              Browse Services
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 5).map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50">
                    <td className="font-medium">{booking.serviceName}</td>
                    <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                    <td>
                      <span
                        className={`badge ${
                          booking.status === "confirmed"
                            ? "badge-success"
                            : booking.status === "pending"
                              ? "badge-warning"
                              : "badge-error"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="font-semibold text-green-600">৳{booking.totalCost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent Payments */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Recent Payments</h3>
          <Link href="/dashboard/my-payments" className="text-primary hover:underline text-sm">
            View All
          </Link>
        </div>
        
        {payments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No payments yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Transaction ID</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {payments.slice(0, 5).map((payment, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="font-medium">{payment.serviceName}</td>
                    <td className="font-mono text-sm text-gray-600">{payment.transactionId}</td>
                    <td className="font-semibold text-green-600">${payment.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
