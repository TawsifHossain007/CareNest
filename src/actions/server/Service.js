"use server"

import { collections, dbConnect } from "@/lib/dbConnect"
import { ObjectId } from "mongodb";


export const getService = async()=> {
    const result = await dbConnect(collections.SERVICES).find().toArray()
    return result;
}

export const getSingleService = async (id) => {
  if (id.length != 24) {
    return {};
  }
  const query = { _id: new ObjectId(id) };

  const service = await dbConnect(collections.SERVICES).findOne(query);

  return { ...service, _id: service._id.toString() } || {};
};