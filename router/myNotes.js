const router = require("express").Router();
const notePost  = require("../models/Post").note;
const sessionVerify = require("../models/verification");


router.use(sessionVerify)
router.get("/",async (req,res)=>{
    var getResult = await notePost.find ({email:req.session.email})
    res.render("myNote", {account:req.session.email,
    notes:getResult
    }
    )
})

router.post("/delete", async (req,res)=>{
    console.log(req.body.id)
    notePost.findByIdAndRemove(req.body.id)
    .then()
    .catch()
    res.redirect("/myNote")
    // res.redirect("/myNote")
   
})

router.post("/",(req,res)=>{
    var postValue = new notePost({
        email : req.session.email,
        title: req.body.title,
        content: req.body.content
    })
    postValue.save()
    .then(
        console.log("note saved")
    )
    res.redirect("/myNote")
})


module.exports = router