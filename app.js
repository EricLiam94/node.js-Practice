const express = require("express")
const fs = require('fs');
const mongodb = require("mongoose")
const bodyParser = require("body-parser")
require("dotenv/config")
const app = express()
const signUpRouter = require('./router/signup')
const myAccountRouter = require('./router/myAccount')
const POST = require("./models/Post").user
const notePost = require("./models/Post").note
const flash = require('connect-flash')
const session = require("express-session")
var sessionVarify = require("./models/verification")
const noteRouter = require("./router/myNotes")



//middleware
app.set('view engine', 'ejs');
app.use(flash());
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}))
app.use(express.static(__dirname + "/public")) //Specify where the static file is
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.json())
app.use("/signUp", signUpRouter)
app.use("/myAccount", myAccountRouter)

app.use((req, res, next) => {
    res.locals.suc_msg = req.flash('suc_msg')
    res.locals.err_msg = req.flash('err_msg')
    res.locals.email = req.flash('email')
    next()
})

app.use('/myNote', noteRouter)

// connect to mongodb
mongodb.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("mongodb is connected")
})

//home page
app.get("/", (req, res) => {
    if (req.session && req.session.token) return res.redirect('/myAccount')
    res.render("index")
})

// app.get("/myNote",sessionVarify,async (req,res)=>{
//     var getResult = await notePost.find ({email:req.session.email})
//     console.log(getResult)
//     console.log(req.session.email)
//     res.render("myNote", {account:"user",
//     notes:getResult
//     }
//     )
// })

// app.post("/myNote",sessionVarify,(req,res)=>{
//     var postValue = new notePost({
//         email : req.session.email,
//         title: req.body.title,
//         content: req.body.content
//     })
//     postValue.save()
//     .then(
//         console.log("note saved")
//     )

//     res.redirect("/myNote")

// })

app.get("/about", sessionVarify, (req, res) => {
    res.render("about", {
        account: "user"
    })
})

app.post("/", async (req, res) => {

})

//port
app.listen(3000, () => {
    console.log("port 3000 is connected")
})