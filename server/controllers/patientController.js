import Patient from "../models/Patient.js";

export const registerPatient =async(req,res)=>{
    try{

       const { name, age, gender, mobile, reason, referredBy, address } = req.body;

       const patient = new Patient({
        name, age, gender, mobile, reason, referredBy, address
       })

       await patient.save();
       res.status(201).json({
        message:"Patient registered successfully"
       })
       

    }
    catch(err){
        console.log("Patient register error",err);
        res.status(500).json({
            message:"Error registering patient"
        })


    }
}