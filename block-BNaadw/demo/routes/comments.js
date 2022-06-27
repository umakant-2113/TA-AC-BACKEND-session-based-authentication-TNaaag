let express=require("express");
let router=express.Router();
let Comment=require("../models/Comment");
const { findById } = require("../models/User");

router.get("/:id/edit",(req,res,next)=>{
let id=req.params.id;
Comment.findById(id,(err,comment)=>{
    if(err) return next(err);
    res.render("updateComment",{comment})
})
})

router.post("/:id/edit",(req,res,next)=>{
    let id=req.params.id;
    Comment.findByIdAndUpdate(id,req.body,(err,comment)=>{
        if(err) return next(err);
        res.redirect("/articles/"+comment.articleId)
    })
})

router.get("/:id/delete",(req,res,next)=>{
    let id=req.params.id;
    Comment.findByIdAndDelete(id,(err,comment)=>{
        if(err) return next(err);
        res.redirect("/articles/"+comment.articleId)   
    })
})
// likes comments
router.get("/:id/likes",(req,res,next)=>{
    let id=req.params.id;
    Comment.findByIdAndUpdate(id,{$inc:{likes:+1}},(err,comment)=>{
        if(err) return next(err);
        res.redirect("/articles/"+comment.articleId)  
    })
})

// dislikes

router.get("/:id/dislikes",(req,res,next)=>{
    let id=req.params.id;
    Comment.findById(id,(err,comment)=>{
        if(comment.likes>0){
Comment.findByIdAndUpdate(id,{$inc:{likes:-1}},(err,comment)=>{
    if(err) return next(err);
    res.redirect("/articles/"+comment.articleId)  
})
        }
    })
})

module.exports=router;