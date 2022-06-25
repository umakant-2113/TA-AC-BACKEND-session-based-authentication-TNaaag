var express = require('express');
var router = express.Router();

let User=require("../models/User")
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// register page
router.get("/register",(req,res,next)=>{
  res.render("register-form")
})

// capture register data 

router.post("/register",(req,res,next)=>{
User.create(req.body,(err,user)=>{
  if(err) return next(err);
  res.redirect("/users/login")
})
})

// ligin page render

router.get("/login",(req,res,next)=>{
  var error = req.flash("error")

  res.render("login",{error})
})

// how to login 

router.post("/login",(req,res,next)=>{
  let {email,password}=req.body;
  if(!email && !password){
    req.flash("error","email/password is required")
    return res.redirect("/users/login")
  }
User.findOne({email},(err,user)=>{
  if(err) return next(err);
  if(!user){
    req.flash("error","email is worng")
    return res.redirect("/users/login")
  }
user.verifyPassword(password,(err,result)=>{
  if(err) return next(err);
  if(!result){
    req.flash("error","password is worng")
return res.redirect("/users/login")
  }
  req.session.userId=user.id;
  res.redirect("/users/dashboard")
})

})

})


// 
router.get("/dashboard",(req,res,next)=>{
  res.render("dashboard");
})

module.exports = router;
