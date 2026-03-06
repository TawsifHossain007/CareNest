"use server";

import { collections, dbConnect } from "@/lib/dbConnect";

export const getDashboardStats = async () => {
  try {
    const bookingCollection = await dbConnect(collections.BOOKING);
    const paymentCollection = await dbConnect(collections.PAYMENT);
    const userCollection = await dbConnect(collections.USERS);
    const serviceCollection = await dbConnect(collections.SERVICES);

    // Get total counts
    const totalBookings = await bookingCollection.countDocuments();
    const totalUsers = await userCollection.countDocuments();
    const totalServices = await serviceCollection.countDocuments();

    // Get booking status breakdown
    const bookingsByStatus = await bookingCollection
      .aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();

    // Get total revenue
    const revenueData = await paymentCollection
      .aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: { $toDouble: "$amount" } },
          },
        },
      ])
      .toArray();

    const totalRevenue = revenueData[0]?.total || 0;

    // Get all bookings for trend analysis (using bookingDate)
    const allBookings = await bookingCollection
      .find({})
      .project({ bookingDate: 1 })
      .toArray();

    // Process bookings by date
    const bookingsByDate = {};
    allBookings.forEach((booking) => {
      if (booking.bookingDate) {
        const date = new Date(booking.bookingDate).toISOString().split("T")[0];
        bookingsByDate[date] = (bookingsByDate[date] || 0) + 1;
      }
    });

    // Get last 7 days
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      last7Days.push({
        date: dateStr,
        bookings: bookingsByDate[dateStr] || 0,
      });
    }

    // Get all payments for revenue analysis (using paymentDate)
    const allPayments = await paymentCollection
      .find({})
      .project({ amount: 1, paymentDate: 1 })
      .toArray();

    // Process revenue by month
    const revenueByMonthMap = {};
    allPayments.forEach((payment) => {
      if (payment.paymentDate) {
        const month = new Date(payment.paymentDate)
          .toISOString()
          .substring(0, 7);
        const amount = parseFloat(payment.amount) || 0;
        revenueByMonthMap[month] = (revenueByMonthMap[month] || 0) + amount;
      }
    });

    // Get last 6 months
    const last6Months = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthStr = date.toISOString().substring(0, 7);
      last6Months.push({
        month: monthStr,
        revenue: parseFloat((revenueByMonthMap[monthStr] || 0).toFixed(2)),
      });
    }

    // Get top services by bookings
    const topServices = await bookingCollection
      .aggregate([
        {
          $group: {
            _id: "$serviceName",
            bookings: { $sum: 1 },
          },
        },
        {
          $sort: { bookings: -1 },
        },
        {
          $limit: 5,
        },
      ])
      .toArray();

    return {
      totalBookings,
      totalUsers,
      totalServices,
      totalRevenue: totalRevenue.toFixed(2),
      bookingsByStatus: bookingsByStatus.map((item) => ({
        status: item._id || "unknown",
        count: item.count,
      })),
      bookingsTrend: last7Days,
      revenueByMonth: last6Months,
      topServices: topServices.map((item) => ({
        name: item._id || "Unknown Service",
        bookings: item.bookings,
      })),
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    
    // Return default data with last 7 days and 6 months structure
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      last7Days.push({
        date: date.toISOString().split("T")[0],
        bookings: 0,
      });
    }

    const last6Months = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      last6Months.push({
        month: date.toISOString().substring(0, 7),
        revenue: 0,
      });
    }

    return {
      totalBookings: 0,
      totalUsers: 0,
      totalServices: 0,
      totalRevenue: "0.00",
      bookingsByStatus: [],
      bookingsTrend: last7Days,
      revenueByMonth: last6Months,
      topServices: [],
    };
  }
};
