
import express from "express";
import dotenv from "dotenv";


dotenv.config(); //configuring dotenv to use in the app;
const app = express();
const PORT = process.env.PORT || 4001;

app.get("/",(req,res)=>{
    res.send("hello from server");

})
.listen(PORT,()=>{
    console.log(`Server is running on PORT:${PORT}`);
})