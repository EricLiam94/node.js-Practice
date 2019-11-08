const express = require("express")
const fs = require('fs');
const mongodb = require("mongoose")
const bodyParser = require("body-parser")
require("dotenv/config")
const app = express()
const signUpRouter = require('./router/signup')
const myAccountRouter = require('./router/myAccount')
const POST = require("./models/Post")
const bcryt = require("bcryptjs")
const joi = require("joi")
var schema = {
email:   joi.string().email().min(5).required(),
password:  joi.string().min(6).max(15).required()
}

//middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use("/signUp",signUpRouter)
app.use("/myAccount",myAccountRouter)

// connect to mongodb
mongodb.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true ,
        useUnifiedTopology: true}
    ,()=>{
    console.log("mongodb is connected")
})

//home page
app.get("/",(req,res)=>{
    var home = fs.createReadStream("./html/index.html")
    home.pipe(res)
})


app.post("/",async (req,res)=>{
    const {error} = joi.validate(req.body,schema)
    if (error) return res.status(400).send(error.details[0].message)

    const exist = await POST.findOne({email:req.body.email})
    if (exist) return res.status(400).send("email has already been used")

    var salt = await bcryt.genSalt(10)
    var hashVal = await bcryt.hash(req.body.password,salt)

    var postValue = new POST({
        email: req.body.email,
        password: hashVal
    })
    console.log(postValue.password)
    var returnValue = await postValue.save()
    res.send(returnValue)
})



//port
app.listen(3000,()=>{
    console.log("port 3000 is connected")
})