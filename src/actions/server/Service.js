"use server"

import { collections, dbConnect } from "@/lib/dbConnect"
import { ObjectId } from "mongodb";

export async function getService({
  search = "",
  page = 1,
  limit = 9,
}) {  
  const skip = (page - 1) * limit;

  const query = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  console.log("MongoDB query:", query); // Debug log

  const collection = dbConnect(collections.SERVICES);

  const services = await collection
    .find(query)
    .skip(skip)
    .limit(limit)
    .toArray();

  const total = await collection.countDocuments(query);

  console.log("Query results:", { servicesFound: services.length, total }); // Debug log

  return {
    services,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}



export const getSingleService = async (id) => {
  if (id.length != 24) {
    return {};
  }
  const query = { _id: new ObjectId(id) };

  const service = await dbConnect(collections.SERVICES).findOne(query);

  return { ...service, _id: service._id.toString() } || {};
};