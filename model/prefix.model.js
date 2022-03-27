const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    author: mongoose.Schema.ObjectId,
    guild: String,
    prefix: String
},
{
    versionKey: false 
})

mongoose.model("Prefix", Schema)