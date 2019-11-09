const router = require('express').Router();
const POST = require("../models/Post");
const bcryt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const flash = require('connect-flash')

router.post("/", async (req,res)=>{
    const result =  await POST.findOne({
        email:req.body.email,
    })

    if (!result) {
        req.flash('err_msg','Email does not match any account' )
    return res.redirect(".")}
    var valid = await bcryt.compare(req.body.password,result.password)
    if(!valid){
        req.flash('err_msg','Invalid Username or Password' )
        return res.redirect(".")}
    

    var token =  jwt.sign({_id:result._id},process.env.TOKEN_SECRET);
    res.header({"xxx-token":token});
    res.render('myAccount',{
        account:result.email,
        audioSrc: "/AudioSrc/summer.mp3"
    })
} )

router.get("/",async (req,res)=>{
    const result = await POST.find()
    res.json(result)
})


module.exports = router