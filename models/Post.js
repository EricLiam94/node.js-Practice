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


var noteSchema = mongodb.Schema({
    email:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default: new Date()
    }
})


module.exports.user = mongodb.model("user",schema)
module.exports.note = mongodb.model("note",noteSchema)