"use server"
import { collections, dbConnect } from "@/lib/dbConnect"
import { ObjectId } from "mongodb";

export const getPayments = async() => {
    try{
        const collection = await dbConnect(collections.PAYMENT);
        const result = await collection.find().toArray();
        
        // Convert ObjectId to string for client components
        return result.map(payment => ({
            ...payment,
            _id: payment._id.toString()
        }));
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
        
        // Convert ObjectId to string for client components
        if (result) {
            return {
                ...result,
                _id: result._id.toString()
            };
        }
        
        return {};
    }
    catch(error){
        console.error('Error fetching single payment:', error);
        return {};
    }
}

export const getPaymentsByEmail = async (email) => {
    try {
        if (!email) {
            return [];
        }
        
        const query = { customerEmail: email };
        const collection = await dbConnect(collections.PAYMENT);
        const result = await collection.find(query).toArray();
        
        // Convert ObjectId to string for client components
        return result.map(payment => ({
            ...payment,
            _id: payment._id.toString()
        }));
    }
    catch(error){
        console.error('Error fetching payments by email:', error);
        return [];
    }
}
