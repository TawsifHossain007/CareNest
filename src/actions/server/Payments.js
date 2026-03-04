"use server"
import { collections, dbConnect } from "@/lib/dbConnect"
import { ObjectId } from "mongodb";

export const getPayments = async() => {
    try{
        const collection = await dbConnect(collections.PAYMENT);
        const result = await collection.find().toArray();
        return result;
    }
    catch(error){
        console.error('Error fetching payments:', error);
        return [];
    }
}

export const getSinglePayment = async (id) => {
    try {
        if (id.length != 24) {
            return {};
        }
        const query = { _id: new ObjectId(id) };
        const collection = await dbConnect(collections.PAYMENT);
        const result = await collection.findOne(query);
        return result;
    }
    catch(error){
        console.error('Error fetching single payment:', error);
        return {};
    }
}