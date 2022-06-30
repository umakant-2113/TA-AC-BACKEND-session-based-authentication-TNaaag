var express = require('express');
var router = express.Router();
let Admin=require("../models/Admin")

/* GET users listing. */
router.get('/new', function(req, res, next) {
  console.log(req.session)
  res.render("admin")
});

// post data of admin

router.post("/new",(req,res,next)=>{
  Admin.create(req.body,(err,admins)=>{
    if(err) return next(err);
    res.redirect("/users/login")
  })
})

// login admin form 

router.get("/login",(req,res,next)=>{
  res.render("admin-login")
})

// capture the data of login to admin

router.post("/login",(req,res,next)=>{
  let {email,password}=req.body;
  if(!email && !password){
    return     res.redirect("/users/login")
  }
  Admin.findOne({email},(err,admins)=>{
    if (err) return next(err);
    if(!admins){
      return  res.redirect("/users/login")
    }
    admins.verrifyPassword(password,(err,result)=>{
      if(err) return next(err);
      if(!result){
        return     res.redirect("/users/login")
      }
      req.session.adminId=admins.id;
      res.redirect("/users/productlist")
    })
  })
})

module.exports = router;
