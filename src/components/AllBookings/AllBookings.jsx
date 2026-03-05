import { GetBookings } from "@/actions/server/Booking";
import React from "react";
import StatusChange from "../buttons/StatusChange";

const AllBookings = async () => {
  const bookings = await GetBookings();
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">All Bookings</h1>
        <p className="text-sm text-gray-600">Manage and track all customer bookings</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gradient-to-r from-primary to-primary/80 text-white">
              <tr>
                <th className="text-white font-semibold py-4">SL No.</th>
                <th className="text-white font-semibold py-4">Service Name</th>
                <th className="text-white font-semibold py-4">Customer Name</th>
                <th className="text-white font-semibold py-4">Duration</th>
                <th className="text-white font-semibold py-4">Location</th>
                <th className="text-white font-semibold py-4">Status</th>
                <th className="text-white font-semibold py-4">Service Cost</th>
                <th className="text-white font-semibold py-4">Service Date</th>
                <th className="text-white font-semibold py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr 
                  key={booking._id}
                  className="hover:bg-primary/5 transition-colors duration-150 border-b border-gray-100"
                >
                  <th className="font-medium text-gray-700">{index + 1}</th>
                  <td className="text-gray-800 font-medium">{booking.serviceName}</td>
                  <td className="text-gray-700">{booking.customerName}</td>
                  <td className="text-gray-600">{booking.durationValue} - {booking.durationType}</td>
                  <td className="text-gray-600">{booking.location.division}</td>
                  <td>
                    <span className={`badge ${
                      booking.status === "confirmed" ? "badge-success" :
                      booking.status === "pending" ? "badge-warning" : "badge-error"
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="text-green-600 font-semibold">${booking.totalCost}</td>
                  <td className="text-gray-600">{new Date(booking.serviceDate).toLocaleDateString()}</td>
                  <td>
                    <StatusChange></StatusChange>
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

export default AllBookings;
