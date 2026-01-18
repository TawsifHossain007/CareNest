import { GetBookings } from "@/actions/server/Booking";
import React from "react";
import { MdOutlineInfo } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import DeleteBooking from "@/components/buttons/DeleteBooking";

const MyBookings = async () => {
 
  const bookings = await GetBookings();
  return (
    <div>
      <h1 className="font-bold text-4xl pt-2">My-Bookings</h1>
      <div className="overflow-x-auto mt-10">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Service</th>
              <th>Duration</th>
              <th>Location</th>
              <th>Status</th>

              <th>Total Cost</th>
              <th>Transaction Id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <th>{index + 1}</th>
                <td>{booking.serviceName}</td>
                <td>
                  {booking.durationType === "hour"
                    ? `${booking.durationValue} Hours`
                    : `${booking.durationValue} Days`}
                </td>
                <td>{booking.location.division}</td>
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
                <td>৳{booking.totalCost}</td>
                <td>{booking.transactionId}</td>

                <td className="space-x-2 flex items-center">
                  <button className="btn btn-primary">
                    <MdOutlineInfo></MdOutlineInfo>
                  </button>
                 <DeleteBooking bookingId={booking._id.toString()}></DeleteBooking>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
