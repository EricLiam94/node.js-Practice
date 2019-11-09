const express = require("express")
const fs = require('fs');
const mongodb = require("mongoose")
const bodyParser = require("body-parser")
require("dotenv/config")
const app = express()
const signUpRouter = require('./router/signup')
const myAccountRouter = require('./router/myAccount')
const POST = require("./models/Post")


const flash = require('connect-flash')
const session = require("express-session")



//middleware
app.set('view engine', 'ejs');
app.use(flash());
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  }))
app.use(express.static(__dirname + "/public" ))  //Specify where the static file is
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(express.json())
app.use("/signUp",signUpRouter)
app.use("/myAccount",myAccountRouter)

app.use((req,res,next)=>{
    res.locals.suc_msg = req.flash('suc_msg')
    res.locals.err_msg = req.flash('err_msg')
    next()
})

// connect to mongodb
mongodb.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true ,
        useUnifiedTopology: true}
    ,()=>{
    console.log("mongodb is connected")
})

//home page
app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/myNote",(req,res)=>{
    res.render("myNote", {account:"user"
    }
    )
})

app.get("/about",(req,res)=>{
    res.render("about",{
        account:"user"
    })
})

app.post("/",async (req,res)=>{
   
})

//port
app.listen(3000,()=>{
    console.log("port 3000 is connected")
})