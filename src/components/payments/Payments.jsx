import { getPayments } from "@/actions/server/Payments";
import React from "react";

const Payments = async () => {
  const Payments = await getPayments();
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">All Payments</h1>
        <p className="text-sm text-gray-600">View and manage all payment transactions</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-linear-to-r from-primary to-primary/80 text-white">
              <tr>
                <th className="text-white font-semibold py-4">Sl No.</th>
                <th className="text-white font-semibold py-4">Service Name</th>
                <th className="text-white font-semibold py-4">Customer Name</th>
                <th className="text-white font-semibold py-4">Amount</th>
                <th className="text-white font-semibold py-4">Transaction Id</th>
              </tr>
            </thead>
            <tbody>
              {Payments.map((payment, index) => (
                <tr 
                  key={index} 
                  className="hover:bg-primary/5 transition-colors duration-150 border-b border-gray-100"
                >
                  <th className="font-medium text-gray-700">{index + 1}</th>
                  <td className="text-gray-800 font-medium">{payment.serviceName}</td>
                  <td className="text-gray-700">{payment.customerName}</td>
                  <td className="text-green-600 font-semibold">${payment.amount}</td>
                  <td className="text-gray-600 font-mono text-sm">{payment.transactionId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payments;
