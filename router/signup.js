const router = require('express').Router()
const bcryt = require("bcryptjs")
const joi = require("joi")
const POST = require("../models/Post")
const flash = require('connect-flash')
var schema = {
email:   joi.string().email().min(5).required(),
password:  joi.string().min(6).max(15).required()
}
router.use((req,res,next)=>{
    res.locals.suc_msg = req.flash('suc_msg')
    res.locals.err_msg = req.flash('err_msg')
    next()
})
router.get("/",(req,res)=>{
    res.render("signUp")
})

router.post("/", async (req,res)=>{
    const {error} = joi.validate(req.body,schema)
    if (error) 
    {
    req.flash('err_msg',error.details[0].message)
    return res.redirect('/signUp')
    }
    const exist = await POST.findOne({email:req.body.email})
    if (exist) {
        console.log(exist)
        req.flash('err_msg','email has already been used')
        return res.redirect('/signUp')}

    var salt = await bcryt.genSalt(10)
    var hashVal = await bcryt.hash(req.body.password,salt)

    var postValue = new POST({
        email: req.body.email,
        password: hashVal
    })
    console.log(postValue.password)
    postValue.save().then( ()=>{
    
    req.flash('suc_msg',"register successfully")
    req.flash('email',req.body.email)
    res.redirect('/')})
})

module.exports = router