"use server"
import { collections, dbConnect } from "@/lib/dbConnect"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import { ObjectId } from "mongodb"



export const GetBookings = async() => {
    const session = await getServerSession(authOptions)
    const user = session?.user
    const query = {customerEmail : user?.email}
    const result = await dbConnect(collections.BOOKING).find(query).toArray()
    return result
}

export const DeleteBookings = async(id) => {
    const query = {_id : new ObjectId(id)}
    const result = await dbConnect(collections.BOOKING).deleteOne(query)
    return result
}