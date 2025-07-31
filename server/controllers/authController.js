import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const generateToken=(user)=>{
    return jwt.sign(
        {id:user._id,role:user.role},
        process.env.JWT_SECRET || "mysecretkey",
        {expiresIn:"1d"}
    );
};

 //controller for user login based on the role

const loginUser=(roleSelected)=>async(req,res) =>{
    const {userId,password} = req.body;

    try{

        const user = await User.findOne({userId,role:roleSelected});
        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(404).json({
                message:"Invalid Credentials"
            });
        }

        //Generating json token on successful login

        const token = generateToken(user);
        user.token =token;
        await user.save();

        res.status(200).json({
            message:`${roleSelected} login successful`,
            name:user.firstName,
            token, 
        });
       



    }
    catch(err){
        console.log("Login error",err.message);

        res.status(500).json({
            message:"Internal server error"
        })

    }
};

const doctorLogin = loginUser("Doctor");
const staffLogin =  loginUser("Staff");
const adminLogin = loginUser("Admin");

export {doctorLogin,staffLogin,adminLogin};

