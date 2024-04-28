const express = require('express')
require('dotenv').config()
const PORT = process.env.PORT || 5500
const connectionDB = require('./src/config/db')

const app = express()

app.use(express.json())


app.get('/',(req,res)=>{
    res.send("Welcome to personal library app")
})


app.listen(PORT,()=>{
    try {
        connectionDB()
        console.log(`Server is Running on Port : ${PORT}`);
    } catch (error) {
        console.log(error);
    }
})