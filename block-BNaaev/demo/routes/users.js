var express = require('express');
var router = express.Router();
let User=require("../modells/User")
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// render register page 
router.get("/register",(req,res,next)=>{
  res.render("register")
})

router.post("/register",(req,res,next)=>{
User.create(req.body,(err,users)=>{
  console.log(users)
})
})

module.exports = router;
