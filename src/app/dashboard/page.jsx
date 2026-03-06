import React from "react";
import { getDashboardStats } from "@/actions/server/Dashboard";
import DashboardStats from "@/components/dashboard/DashboardStats";

const DashboardHome = async () => {
  const stats = await getDashboardStats();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your business today.
        </p>
      </div>

      <DashboardStats stats={stats} />
    </div>
  );
};

export default DashboardHome;
