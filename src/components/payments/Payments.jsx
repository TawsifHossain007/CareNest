import { getPayments } from "@/actions/server/Payments";
import React from "react";

const Payments = async () => {
  const Payments = await getPayments();
  return (
    <div className="p-5">
        <h1 className="text-2xl font-bold text-primary">All Payments</h1>
      <div className="overflow-x-auto mt-8">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Service Name</th>
              <th>Customer Name</th>
              <th>Amount</th>
              <th>Transaction Id</th>
            </tr>
          </thead>
          <tbody>
            {Payments.map((payment, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{payment.serviceName}</td>
                <td>{payment.customerName}</td>
                <td>{payment.amount}</td>
                <td>{payment.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
