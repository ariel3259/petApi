const {Router}=require("express");
const route=Router();
const mysql=require("mysql2/promise");
const sqlSentences=require("../db/sqlSentences");
const database=require("../db/database.json");

route.post("/owner",async (req,res)=>{
    const name=req.body.name; 
    try{
        const con =await  mysql.createConnection(database);
        const [rows] = await con.query(sqlSentences.insertOwner,[name]);
        return res.send(rows);
    }
    catch(err){
        return res.status(405).send("An error has been happened");
    }  
});

//get owners without pets
route.get("/owner",async (req,res)=>{
    try{
        const con =await  mysql.createConnection(database);
        const [rows] = await con.query(sqlSentences.selectOwners);
        return res.send(rows);
    }
    catch(err){
        return res.status(405).send("An error has been happened");
    }
});

route.post("/adopted/pet",async (req,res)=>{
    const data=[
        req.headers.owner_id,
        req.headers.id
    ];

    try{
        const con =await  mysql.createConnection(database);
        await con.query(sqlSentences.adoptPet,data);
        return res.send("Some one has been adopted a pet");
    }
    catch(err){
        console.log(err);
        return res.status(405).send("Some mistake has been happened");
    }
});

route.get("/owner/pets",async (req,res)=>{
    const id=req.headers.id;
    try{
        const con =await  mysql.createConnection(database);
        const [rows]=await con.query(sqlSentences.selectByOwner,[id]);
        return res.send(rows);
    }
    catch(err){
        console.log(err);
        return res.status(405).send("Some mistake has been happened");
    }
});

module.exports=route;