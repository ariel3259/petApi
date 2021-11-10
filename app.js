const express=require("express");
const cors=require("cors");
const app=express();
const pets=require("./routes/pets");
const owner=require("./routes/owner");

app.use(express.json());
app.use(cors());
app.use("/api/petsImages",express.static(__dirname+"/public"));

app.use("/api", pets);
app.use("/api",owner);

app.get("/",(req,res)=>res.send("Hi word"));
app.listen("3000",err=>{
    if(err)throw err;
    console.log("server online at port 3000");
});