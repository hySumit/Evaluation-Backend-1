const express = require('express')
const bookRouter = express.Router()
const auth = require('../middleware/auth')
const bookModel = require('../model/book.model')


bookRouter.post('/create',auth,async(req,res)=>{
    const {username,userID,title,author,description,status,year} = req.body
    try {
        const book = new bookModel({username,userID,title,author,description,status,year})
        await book.save()
        res.status(201).send("Book created successfully")
    } catch (error) {
        res.status(500).send("Error while adding book please")
    }
})

bookRouter.get("/",async(req,res)=>{
    try {
        let query = {}
        if(req.query.title){
            query.title = {$regex: req.query.title, $options: "i"}
        }
        const book = await bookModel.find(query)
        res.status(200).json({message:"Found the book",book})
    } catch (error) {
        
    }
})

bookRouter.get('/',async(req,res)=>{
    try {
        const book = await bookModel.find()
        res.status(200).json({
            message:"Fetched all books",book
        })
    } catch (error) {
        res.status(500).json({
            message:"Error while Fetching books "
        })
    }
})

bookRouter.patch("/update",auth,async(req,res)=>{
    const {id} = req.params
    try {
        const updateBook = await bookModel.findByIdAndUpdate(id,req.body)
        res.status(200).send("Book Updated Successfully")
    } catch (error) {
        res.status(500).send("Error while updating the book")
    }
})

bookRouter.delete("/update",auth,async(req,res)=>{
    const {id} = req.params
    try {
        const deleteBook = await bookModel.findByIdAndDelete(id,req.body)
        res.status(200).send("Book Deleted Successfully")
    } catch (error) {
        res.status(500).send("Error while deleting the book")
    }
})

module.exports = bookRouter