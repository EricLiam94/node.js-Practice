const router = require('express').Router()
const POST = require("../models/Post")

const bcryt = require("bcryptjs")

router.post("/", async (req,res)=>{
    console.log(req.body)
    const result =  await POST.findOne({
        email:req.body.email,
    })

    if (!result) return res.render("error" , {Error:"Email does not match any account"})
    var valid = await bcryt.compare(req.body.password,result.password)
    if(!valid) return res.render("error" , {Error:"Invalid Username or Password"})
    res.render('myAccount',{account:result.email})
} )

router.get("/",async (req,res)=>{
    const result = await POST.find()
    res.json(result)
})


module.exports = router