import mongoose from "mongoose";

const connectDB = ()=>{
    try{
         const conn = mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected successfully`);
    }
    catch(err){
        console.log("MongoDB connection error",err.message);
    }
}

export default connectDB;