const mongoose = require('mongoose')
require('dotenv').config()

const connectionDB = async ()=>{
    mongoose.connect(process.env.DB_URL)
}

module.exports = connectionDB