const {Router} = require("express");
const route = Router();
const mysql = require("mysql2/promise");
const sqlSentences = require("../db/sqlSentences");
const database = require("../db/database.json");

//storages an owner
route.post("/owner", async (req, res) => {
    const name = req.body.name; 
    try{
        const con = await  mysql.createConnection(database);
        const [ rows ] = await con.query(sqlSentences.insertOwner,[ name ]);
        return res.send(rows);
    }
    catch(err){
        return res.status(500).send("An error has been happened");
    }  
});

//get owners without pets
route.get("/owner", async (req, res) => {
    try{
        const con = await  mysql.createConnection(database);
        const [ rows ] = await con.query(sqlSentences.selectOwners);
        return res.send(rows);
    }
    catch(err){
        return res.status(500).send("An error has been happened");
    }
});

route.post("/owner/adopt/pet", async (req, res) => {
    const data=[
        req.headers.owner_id,
        req.headers.id
    ];

    try{
        const con = await  mysql.createConnection(database);
        await con.query(sqlSentences.adoptPet,data);
        return res.send("Some pet has been adopted by someone");
    }
    catch(err){
        console.log(err);
        return res.status(500).send("A mistake happened");
    }
});

route.get("/owner/pets", async (req, res) => {
    const id=req.headers.id;
    try{
        const con = await  mysql.createConnection(database);
        const [ rows ] = await con.query(sqlSentences.selectByOwner,[id]);
        return res.send(rows);
    }
    catch(err){
        console.log(err);
        return res.status(500).send("a mistake happened");
    }
});

module.exports=route;