"use server"
import { collections, dbConnect } from "@/lib/dbConnect"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import { ObjectId } from "mongodb"
import { cache } from "react"
import { revalidatePath } from "next/cache"



export const GetBookings = cache(async() => {
    const session = await getServerSession(authOptions)
    const user = session?.user
    const query = {customerEmail : user?.email}
    const result = await dbConnect(collections.BOOKING).find(query).toArray()
    return result
})

export const GetBookingById = async(id) => {
    try {
        // Validate ObjectId format
        if (!id || id.length !== 24) {
            console.log("Invalid ID format:", id);
            return null;
        }
        
        const query = {_id : new ObjectId(id)}
        const result = await dbConnect(collections.BOOKING).findOne(query)
        return result;
    } catch (error) {
        console.error("Error in GetBookingById:", error);
        return null;
    }
}

export const DeleteBookings = async(id) => {
    const query = {_id : new ObjectId(id)}
    const result = await dbConnect(collections.BOOKING).deleteOne(query)
    
    // Revalidate the my-bookings page to refresh the cache
    revalidatePath('/my-bookings')
    
    return result
}