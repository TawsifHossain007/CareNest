import { collections, dbConnect } from "@/lib/dbConnect"
import { ObjectId } from "mongodb";

export const getBlogs = async() => {
    const result = await dbConnect(collections.BLOGS).find().toArray()
    return result
}

export const getSingleBlog = async (id) => {
  if (id.length != 24) {
    return {};
  }
  const query = { _id: new ObjectId(id) };

  const blog = await dbConnect(collections.BLOGS).findOne(query);

  return { ...blog, _id: blog._id.toString() } || {};
};