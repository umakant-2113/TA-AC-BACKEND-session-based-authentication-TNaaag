var express = require('express');
var router = express.Router();

let User=require("../models/User")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// register form

router.get("/register",(req,res,next)=>{
  res.render("register")
})

router.post("/register",(req,res,next)=>{
  User.create(req.body,(err,user)=>{
    console.log(user)
    if(err) return next(err)
    res.redirect("/users/login")
  })
})

router.get("/login",(req,res,next)=>{
  res.render("login")
})

router.post("/login",(req,res,next)=>{

  let {email,password}=req.body;

  console.log(email,password)

  if(!email&& !password){
    return  res.redirect("/users/login")
  }

  User.findOne({email},(err,user)=>{
    console.log(user)

    if (err) return next(err)
    if(!user){
      return  res.redirect("/users/login")
    }
    user.varifyPassword(password,(err,result)=>{
      if(err) return next(err);
      console.log(result)
      if(!result){
         return  res.redirect("/")
      }
      req.session.userId=user.id;
      res.redirect("/users/dashboard")
    })
  })
})

// dash board
router.get("/dashboard",(req,res,next)=>{
  console.log(req.session)
  res.render("dashboard")
})


module.exports = router;
