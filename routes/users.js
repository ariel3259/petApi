const {Router} = require("express");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const database = require("../db/database.json");
const sqlSentences = require("../db/sqlSentences");
const fs = require("fs");
const route = Router();


//register a user
route.post("/users/register", async (req, res) => {
   
    const passwordHashed = await bcrypt.hash(req.body.password,10);
    const data = [
        req.body.email,
        passwordHashed,
        req.body.nickname
    ];
    try{
        let con = await mysql.createConnection(database);
        await con.query(sqlSentences.registerUser, data);
        return res.send("A new user has been registered");
    }
    catch(err){
        console.log(err);
        return res.status(500).send("An error has been happened");
    }
});

//login
route.post("/users/auth", async (req, res) => {
    const userData =  [
        req.body.email,
        req.body.password
    ];
    try{
        let con = await mysql.createConnection(database);
        const [rows] = await con.query(sqlSentences.authUser, [userData[0]]);
        if(rows.length < 0 || ! await bcrypt.compare(userData[1],rows[0].password)){
            return res.status(401).send("Wrong email or password!");
        }
        const nickname = rows[0].nickname;
        res.send(`Welcome ${nickname}`);
    }catch(err){
        console.log(err);
        return res.status(500).send("An error has been happened");
    }
});

//get random greetings
route.get("/users/messages", (req, res) => {
    const greetings = [
        `welcome `,
        `good day `,
        `good morgning `,
        `good night `,
        `hello`
    ];
    return res.send(greetings[Math.round(Math.random()* 4)]);
});

//storages text
route.post("/users/text", async (req, res) => {
    fs.writeFile("./txt/tips.txt", req.body.text+"\n", err => {
        if(err){
            console.log(err);
            return res.status(500).send("An error has been happened");
        }
        res.send("message has been saved");
    });

});

module.exports = route;