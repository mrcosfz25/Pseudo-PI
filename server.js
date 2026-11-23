const express = require("express")
const api = express()
const {mongoClient} = require("mongodb")
const dotenv = require("dotenv")
dotenv.config()
const url = process.env.DATABASE_URL
const ObjectId = require("mongodb").ObjectId
const client = new mongoClient(url)
let collection

api.set("view engine","ejs")
api.use(express.urlencoded({extend:true}))
api.get("index",(req,res)=>{
    res.render(index.ejs)
})

//cadastrar um novo usuario

api.post("/show", async (req, res)=>{
    await collection.insertOne({
        nome:req.body.nome,
        email:req.body.email,
    })
    res.redirect("/show")
})

api.get("/show", async (req, res)=>{
    const registro = await collection.find().toArray()
    // visualizar o registro no Show.ejs
    res.render("show.ejs", {registro})
})

api.post("/edit/:id", async (req, res)=>{
    await collection.updateOne({_id: new ObjectId(req.params.id)}, 
    {$set:{
        nome:req.body.nome, 
        email:req.body.email}})
         res.redirect("/show")
})
 

 async function iniciar() {
    await client.connect()
    const db  = client.db("Infoaula")
    collection  = db.collection('crud')
    console.log("banco conectado com sucesso")
    api.listen(3000, function(){
        console.log("meu servidor está rodando na porta 3000")
    })
 }
iniciar().catch(function (erro) {
    console.error("erro ao iniciar a aplicação" + erro)
})