"use server"
import { collections, dbConnect } from "@/lib/dbConnect"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import { ObjectId } from "mongodb"
import { cache } from "react"
import { revalidatePath } from "next/cache"



export const GetBookings = cache(async() => {
    try {
        const session = await getServerSession(authOptions)
        
        if (!session?.user) {
            // Redirect to login if not authenticated
            throw new Error('Unauthorized - Please login to view your bookings')
        }
        
        const user = session?.user
        const query = {customerEmail : user?.email}
        const collection = await dbConnect(collections.BOOKING);
        const result = await collection.find(query).toArray()
        return result
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return [];
    }
})

export const GetBookingById = async(id) => {
    try {
        // Validate ObjectId format
        if (!id || id.length !== 24) {
            console.log("Invalid ID format:", id);
            return null;
        }
        
        const query = {_id : new ObjectId(id)}
        const collection = await dbConnect(collections.BOOKING);
        const result = await collection.findOne(query)
        return result;
    } catch (error) {
        console.error("Error in GetBookingById:", error);
        return null;
    }
}

export const DeleteBookings = async(id) => {
    try {
        const query = {_id : new ObjectId(id)}
        const collection = await dbConnect(collections.BOOKING);
        const result = await collection.deleteOne(query)
        
        // Revalidate the my-bookings page to refresh the cache
        revalidatePath('/my-bookings')
        
        return result
    } catch (error) {
        console.error('Error deleting booking:', error);
        return { deletedCount: 0 };
    }
}