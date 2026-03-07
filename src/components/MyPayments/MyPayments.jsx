"use client";
import React from "react";

const MyPayments = ({ payments = [] }) => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">My Payments</h1>
        <p className="text-sm text-gray-600">
          View and manage your payment transactions
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        {payments.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No payments found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-linear-to-r from-primary to-primary/80 text-white">
                <tr>
                  <th className="text-white font-semibold py-4">Sl No.</th>
                  <th className="text-white font-semibold py-4">
                    Service Name
                  </th>

                  <th className="text-white font-semibold py-4">Amount</th>
                  <th className="text-white font-semibold py-4">Booking Id</th>
                  <th className="text-white font-semibold py-4">
                    Transaction Id
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr
                    key={payment._id}
                    className="hover:bg-primary/5 transition-colors duration-150 border-b border-gray-100"
                  >
                    <th className="font-medium text-gray-700">{index + 1}</th>
                    <td className="text-gray-800 font-medium">
                      {payment.serviceName}
                    </td>

                    <td className="text-green-600 font-semibold">
                      ${payment.amount}
                    </td>
                    <td className="text-gray-600 font-mono text-sm">
                      {payment.transactionId}
                    </td>
                    <td className="text-gray-600 font-mono text-sm">{payment.bookingId}</td>
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

export default MyPayments;
