const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    image:String
})

module.exports = mongoose.model('user',userSchema)