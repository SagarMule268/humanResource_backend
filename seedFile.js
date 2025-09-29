import mongoose from "mongoose";
import User from "./models/User.js";
import bcrypt from 'bcrypt'
import connectDB from "./config/connectDB.js";
connectDB();
const user = async () =>{
    try{
        
        const newUser = new User({
            name:"admin",
            email:"admin@gmail.com",
            password: await bcrypt.hash("Admin",10),
            role:"admin"
        })
        await newUser.save();
    }catch(error){
        console.log(error)
    }
}

user();