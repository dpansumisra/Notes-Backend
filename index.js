const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const noteModel = require('./Models/notes.js')


const dotenv = require('dotenv')
dotenv.config()
const password = process.env.MONGO_PASSWORD

const app = express()
app.use(cors())
app.use(express.json())


mongoose.connect(`mongodb+srv://dpansumisra:${password}@cluster0.olcse.mongodb.net/notescrud?retryWrites=true&w=majority&appName=Cluster0`)
.then(()=>console.log("database connect hain")).catch((error)=>console.log(error.message))

app.get("/get", (req, res)=>{
    noteModel.find()
    .then(result => res.json(result))
    .catch(err=> res.json(err))
})

app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    const {text} = req.body;
    noteModel.findByIdAndUpdate(id, {task:text},{new:true})
    .then(result => res.json(result))
    .catch(err=> res.json(err))
})



app.delete('/delete/:id',(req, res) => {
    const {id} = req.params;
    noteModel.findByIdAndDelete({_id:id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})



app.post("/add", (req, res)=>{
    try {
        const {noteText} = req.body
        noteModel.create({
        task: noteText
    })
    } catch (error) {
        console.log(error.message)
    }
})


app.listen(3001, ()=>{
    console.log("Server is Running")
})