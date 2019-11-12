const router = require('express').Router();
const POST = require("../models/Post").user;
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
    req.session.token = token
    req.session.email = result.email
    res.render('myAccount',{
        account:result.email,
        audioSrc: "/AudioSrc/summer.mp3"
    })
} )

router.get("/",async (req,res)=>{
    if(req.session && req.session.token)
    {
       jwt.verify(req.session.token,process.env.TOKEN_SECRET,(err,decoded)=>{
        if(err) return res.redirect('/')
        else return res.render('myAccount',{
            account:req.session.email,
            audioSrc: "/AudioSrc/summer.mp3"
        })
       })
    }
    else{
       res.redirect('/')}
})

router.get("/signOff",(req,res)=>{
    if(req.session){
        req.session.destroy((err)=>{
            if(err) console.log(err)
            return res.redirect('/')
        })
    }
})


module.exports = router