"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const PostUser = async (payload) => {
  try {
    const { email, password, name, NID, Number, image } = payload;
    
    //check payload
    if (!email || !password) {
      return { message: "empty payload" };
    }
    
    //check user
    const usersCollection = await dbConnect(collections.USERS);
    const isExist = await usersCollection.findOne({ email });
    if (isExist) {
      return { message: "user exists" };
    }

    //upload image on imgbbb
    let photoURL = null;
    if (image) {
      try {
        // Extract base64 data (remove data:image/...;base64, prefix)
        const base64Data = image.includes(',') ? image.split(',')[1] : image;
        
        const formData = new FormData();
        formData.append("image", base64Data);

        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.IMAGE_HOST_KEY}`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        
        if (data.success) {
          photoURL = data.data.url;
        }
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }

    //create user
    const newUser = {
      provider: "credentials",
      name,
      email,
      password: await bcrypt.hash(password, 14),
      NID,
      Photo: photoURL,
      Number,
      role: "user",
      createdAt: new Date(),
    };

    //insert user
    const result = await usersCollection.insertOne(newUser);
    if (result.acknowledged) {
      return {
        ...result,
        insertedId: result.insertedId?.toString(),
      };
    }
    
    return { message: "failed to create user" };
  } catch (error) {
    console.error('Error creating user:', error);
    return { message: "database connection failed" };
  }
};

export const LoginUser = async (payload) => {
  try {
    const { email, password } = payload;

    //check payload
    if (!email || !password) {
      return null;
    }

    //check db for user
    const usersCollection = await dbConnect(collections.USERS);
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return null;
    }

    //check if user has a password (credentials provider)
    if (!user.password) {
      return null;
    }
    
    const isMatched = await bcrypt.compare(password, user?.password);
    if (isMatched) {
      return user;
    }
    
    return null;
  } catch (error) {
    console.error('Error logging in user:', error);
    return null;
  }
};