const router = require('express').Router()
const fs = require('fs')
const path = require('path')



router.get("/",(req,res)=>{
    var p = path.join(__dirname,'..','html',"signUp.html")
    var value = fs.createReadStream(p)
    value.pipe(res)
})

module.exports = router