const {Router} = require("express");
const route = Router();
const fs = require("fs");
const database=require("../db/database.json");
const sqlSentences=require("../db/sqlSentences");
const mysql=require("mysql2/promise");
//get all pets if it has an owner or not
route.get("/pets",async (req,res)=>{
    const  withOwner = req.headers.flag==1?sqlSentences.selectWithOwners:sqlSentences.selectWithoutOwners;
    try{
        const con = await mysql.createConnection(database);
        const [rows] = await con.query(withOwner);
        return  res.status(200).send(rows);
    }catch(err){
        console.log(err);
        return res.status(500).send("An error has been happened");
    }
});

//Add a new pet 
route.post("/pets",async (req,res)=>{
    if( !req.body.name || !req.body.age || !req.body.animal)throw res.status(500).send("First, insert the data");
    const data=[
        req.body.name,
        req.body.age,
        req.body.animal
    ];
    try{
        const  con = await mysql.createConnection(database);
        await con.query(sqlSentences.insertPet,data);
        return res.status(200).send("A new pet has been added");
    }catch(err){
        return res.status(500).send("An error has been happened");
    }
});

//Modify a pet
route.put("/pets",async (req,res)=>{
    if(!req.body.name || !req.body.age || !req.body.animal)throw res.status(500).send("First, insert the data");
    const data = [
        req.body.name,
        req.body.age,
        req.body.animal,
        req.body.id
    ];

    try{
        const con = await mysql.createConnection(database);
        await con.query(sqlSentences.updatePet,data);
        return res.status(200).send("A pet has been modified");
    }
    catch(err){
        return res.status(500).send("An error has been happened");
    }
});

//Delete a pet
route.delete("/pets",async (req,res)=>{
    const id = req.headers.id;
    
    try{
        const con=await mysql.createConnection(database);
        await con.query(sqlSentences.deletePet,[id]);
        return res.status(200).send("Some one has been adopted a pet");
    }
    catch(err){
        return res.status(500).send("An error has been happened");
    }
});

//pets descriptions
route.get("/pet/description",async (req,res)=>{
    try{
        const data=await fs.readFile("./pets.txt","utf-8");
        return res.send(data);
    }catch(err){
        return res.status(500).send("there are no description");
    }
});

module.exports=route;