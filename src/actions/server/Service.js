"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function getService({
  search = "",
  category = "",
  minPrice,
  maxPrice,
  sort = "",
  page = 1,
  limit = 12,
}) {
  const skip = (page - 1) * limit;

  let query = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
    ];
  }

  if (category) {
    query.category = category;
  }

  if (minPrice || maxPrice) {
    query.pricePerHour = {};
    if (minPrice) query.pricePerHour.$gte = Number(minPrice);
    if (maxPrice) query.pricePerHour.$lte = Number(maxPrice);
  }

  let sortQuery = {};
  if (sort === "price_asc") sortQuery.pricePerHour = 1;
  if (sort === "price_desc") sortQuery.pricePerHour = -1;

  const collection = dbConnect(collections.SERVICES);

  const services = await collection
    .find(query)
    .sort(sortQuery)
    .skip(skip)
    .limit(limit)
    .toArray();

  const total = await collection.countDocuments(query);

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
