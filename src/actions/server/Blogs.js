"use server"

import { collections, dbConnect } from "@/lib/dbConnect"
import { ObjectId } from "mongodb";

export const getBlogs = async() => {
    try {
        const collection = await dbConnect(collections.BLOGS);
        const result = await collection.find().toArray();
        return result;
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return [];
    }
}

export const getSingleBlog = async (id) => {
    try {
        if (id.length != 24) {
            return {};
        }
        const query = { _id: new ObjectId(id) };

        const collection = await dbConnect(collections.BLOGS);
        const blog = await collection.findOne(query);

        return blog ? { ...blog, _id: blog._id.toString() } : {};
    } catch (error) {
        console.error('Error fetching single blog:', error);
        return {};
    }
};