"use server";
import { collections, dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { ObjectId } from "mongodb";
import { cache } from "react";
import { revalidatePath } from "next/cache";

export const GetBookings = cache(async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      throw new Error("Unauthorized - Please login to view your bookings");
    }

    const user = session?.user;
    const query = { customerEmail: user?.email };
    const collection = await dbConnect(collections.BOOKING);
    const result = await collection.find(query).toArray();

    // Convert ObjectId to string for client components
    return result.map((booking) => ({
      ...booking,
      _id: booking._id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
});

export const GetAllBookings = cache(async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      throw new Error("Unauthorized - Please login to view bookings");
    }

    // Check if user is admin
    if (session.user.role !== "admin") {
      throw new Error("Unauthorized - Admin access required");
    }

    const collection = await dbConnect(collections.BOOKING);
    const result = await collection.find({}).toArray();

    // Convert ObjectId to string for client components
    return result.map((booking) => ({
      ...booking,
      _id: booking._id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    return [];
  }
});

export const GetBookingById = async (id) => {
  try {
    // Validate ObjectId format
    if (!id || id.length !== 24) {
      return null;
    }

    const query = { _id: new ObjectId(id) };
    const collection = await dbConnect(collections.BOOKING);
    const result = await collection.findOne(query);

    // Convert ObjectId to string for client components
    if (result) {
      return {
        ...result,
        _id: result._id.toString(),
      };
    }

    return null;
  } catch (error) {
    console.error("Error in GetBookingById:", error);
    return null;
  }
};

export const DeleteBookings = async (id) => {
  try {
    const query = { _id: new ObjectId(id) };
    const collection = await dbConnect(collections.BOOKING);
    const result = await collection.deleteOne(query);

    // Revalidate the my-bookings page to refresh the cache
    revalidatePath("/dashboard/my-bookings");

    return result;
  } catch (error) {
    console.error("Error deleting booking:", error);
    return { deletedCount: 0 };
  }
};

export const UpdateBookingStatus = async (id, newStatus) => {
  try {
    const query = { _id: new ObjectId(id) };
    const update = { $set: { status: newStatus } };
    const collection = await dbConnect(collections.BOOKING);
    const result = await collection.updateOne(query, update);
    
    if (result.modifiedCount === 0) {
      return { success: false, message: "Booking not found or status unchanged" };
    }
    
    // Revalidate the all-bookings page to refresh the cache
    revalidatePath('/dashboard/all-bookings');
    
    return { success: true, message: `Booking status updated to ${newStatus}` };
  } catch (error) {
    console.error("Error updating booking status:", error);
    return { success: false, message: "Failed to update booking status" };
  }
};
