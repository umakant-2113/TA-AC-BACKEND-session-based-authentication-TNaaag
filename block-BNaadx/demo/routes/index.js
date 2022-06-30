var express = require('express');
var router = express.Router();
let User= require("../models/User")

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render("register")
});

// capture the users data 
router.post("/",(req,res,next)=>{
User.create(req.body,(err,users)=>{
  res.redirect("/login")
})
})

// login page 
router.get("/login",(req,res,next)=>{
  res.render("login")
})

// post data to login
router.post("/login",(req,res,next)=>{
  let {email,password}=req.body;
if(!email && !password){
  return res.redirect("/login");
}
User.findOne({email},(err,users)=>{
  if(err) return next(err);
  if(!users){
    return res.redirect("/login");
  }
  users.verifypassword(password,(err,result)=>{
    if(err) return next(err);
    if(!result){
      return res.redirect("/login");
    }
    req.session.userId=users.id;
    res.redirect("/users/productlist")
  })
})

})

module.exports = router;
