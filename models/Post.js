const mongodb = require('mongoose')


var schema = mongodb.Schema({
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    }
})


module.exports = mongodb.model("user",schema)