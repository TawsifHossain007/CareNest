"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export const getUsers = async () => {
  try {
    const collection = await dbConnect(collections.USERS);
    const result = await collection.find().toArray();
    
    // Convert ObjectId to string for client components
    return result.map(user => ({
      ...user,
      _id: user._id.toString()
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const updateUserRole = async (userId, newRole) => {
  try {
    const collection = await dbConnect(collections.USERS);
    const result = await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { role: newRole } }
    );

    if (result.modifiedCount === 0) {
      return { success: false, message: "User not found or role unchanged" };
    }

    return { success: true, message: `User role updated to ${newRole}` };
  } catch (error) {
    console.error("Error updating user role:", error);
    return { success: false, message: "Failed to update user role" };
  }
}; 