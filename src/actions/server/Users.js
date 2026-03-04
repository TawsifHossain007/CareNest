"use server";

import { collections, dbConnect } from "@/lib/dbConnect";

export const getUsers = async () => {
  try {
    const collection = await dbConnect(collections.USERS);
    const result = await collection.find().toArray();
    return result;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
