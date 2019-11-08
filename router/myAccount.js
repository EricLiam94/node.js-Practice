const router = require('express').Router()
const POST = require("../models/Post")

const bcryt = require("bcryptjs")

router.post("/", async (req,res)=>{
    console.log(req.body)
    const result =  await POST.findOne({
        email:req.body.email,
    })

    var valid = await bcryt.compare(req.body.password,result.password)
    if(!valid) return res.status(400).send("Invalid Username or Password")
    res.json(result)

} )

router.get("/",async (req,res)=>{

    
})


module.exports = router