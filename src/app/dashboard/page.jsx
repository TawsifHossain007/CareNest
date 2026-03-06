import React from "react";
import { getDashboardStats } from "@/actions/server/Dashboard";
import { GetBookings } from "@/actions/server/Booking";
import { getPaymentsByEmail } from "@/actions/server/Payments";
import DashboardStats from "@/components/dashboard/DashboardStats";
import UserDashboard from "@/components/dashboard/UserDashboard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

const DashboardHome = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  const userRole = session.user.role;
  const userEmail = session.user.email;

  // Fetch data based on role
  if (userRole === "admin") {
    const stats = await getDashboardStats();

    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back! Here&apos;s what&apos;s happening with your business
            today.
          </p>
        </div>
        <DashboardStats stats={stats} />
      </div>
    );
  } else {
    // Regular user dashboard
    const bookings = await GetBookings();
    const payments = await getPaymentsByEmail(userEmail);

    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            My Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back! Here&apos;s an overview of your bookings and payments.
          </p>
        </div>
        <UserDashboard bookings={bookings} payments={payments} />
      </div>
    );
  }
};

export default DashboardHome;
