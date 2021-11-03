const {Router}=require("express")
const route =Router()
const mysql=require("mysql2/promise")
const fs=require("fs")
//get all pets if it has an owner or not
route.get("/pets",async (req,res)=>{
  const  onlyWithOwner=req.headers.flag==1?1:0
    try{
        const con=await mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"1234",
            database:"pets_db"
        })
        const [rows]=await con.query("select bin_to_uuid(id) id,name,age,animal from pets where flag like ?",[onlyWithOwner])
      return  res.status(200).send(rows);
    }catch(err){
       return res.status(405).send("An error has been happened")
    }
})

//Add a new pet 
route.post("/pets",async (req,res)=>{
    if( !req.body.name || !req.body.age || !req.body.animal)throw res.status(405).send("First, insert the data");
    

    const data=[
        req.body.name,
        req.body.age,
        req.body.animal,
        0
    ]
    try{
        const con=await mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"1234",
            database:"pets_db"
        })
        await con.query("insert into pets(id,name,age,animal,flag) values(uuid_to_bin(uuid()),?,?,?,?)",data)
       return res.status(200).send("A new pet has been added")
    }catch(err){
       return res.status(405).send("An error has been happened")
    }
})

//Modify a pet
route.put("/pets",async (req,res)=>{
    if(!req.body.name || !req.body.age || !req.body.animal)throw res.status(405).send("First, insert the data");
    const data=[
        req.body.name,
        req.body.age,
        req.body.animal,
        req.body.id
    ]

    try{
        const con=await mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"1234",
            database:"pets_db"
        })
        const [rows]=await con.query("update pets set name=?,age=?,animal=? where id like uuid_to_bin(?)",data)
        return res.status(200).send("A pet has been modified")
    }
    catch(err){
        return res.status(405).send("An error has been happened")
    }
})

//Adopt a pet
route.delete("/pets",async (req,res)=>{
    const id=req.headers.id;
    
    try{
        const con=await mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"1234",
            database:"pets_db"
        })
        const [rows]=await con.query("update pets set flag=1 where id like uuid_to_bin(?)",[id])
        return res.status(200).send("Some one has been adopted a pet")
    }
    catch(err){
        return res.status(405).send("An error has been happened")
    }
})

//pets descriptions
route.get("/petDescription",(req,res)=>{
    try{
       return res.send( fs.readFileSync("./pets.txt"))
    }catch(err){
        return res.status(405).send("there are no description")
    }
})

module.exports=route