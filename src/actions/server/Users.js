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

export const updateUserProfile = async (email, updates) => {
  try {
    const collection = await dbConnect(collections.USERS);
    
    // Only allow updating NID and Number
    const allowedUpdates = {};
    if (updates.NID !== undefined) allowedUpdates.NID = updates.NID;
    if (updates.Number !== undefined) allowedUpdates.Number = updates.Number;
    
    const result = await collection.updateOne(
      { email },
      { $set: allowedUpdates }
    );

    if (result.modifiedCount === 0) {
      return { success: false, message: "No changes made or user not found" };
    }

    return { success: true, message: "Profile updated successfully" };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return { success: false, message: "Failed to update profile" };
  }
};

export const getUserByEmail = async (email) => {
  try {
    const collection = await dbConnect(collections.USERS);
    const user = await collection.findOne({ email });
    
    if (!user) {
      return null;
    }
    
    return {
      ...user,
      _id: user._id.toString()
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
