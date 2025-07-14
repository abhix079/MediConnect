import mongoose from "mongoose";
import express from "express";

import User from "../models/User.js";




const userLogin =async(req,res)=>{
    const {userId, password} = req.body;
    try{
        const user = await User.findOne({userId});
        if(!user){
            res.status(404).json({
                message:"No user exists"
            })

        }

        //If user exists then compare the password stored in the database and then login

        if (user.password!==password){
            res.status(401).json({
                message:"Invalid credentials"
            })

        }
        res.status(200).json({
            message:"Login successfull"
        })
    }


    catch(err){
        console.log("Login error",err.message);
       res.status(500).json({
                message:"Internal server error"
            })

    }

}

export default userLogin;