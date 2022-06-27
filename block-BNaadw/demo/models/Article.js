let mongoose=require("mongoose");
let slugger = require("slugger");
var print = console.log.bind(console)

const { schema } = require("./User");
let Schema=mongoose.Schema;


let articleSchema=new Schema({
title:{type:String,required:true},
description:String,
likes:{type:Number,default:0},
author:String,
slug:String,
comment: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
userId:[{type:Schema.Types.ObjectId , ref: "User"}]
})

articleSchema.pre("save",  function(next){
this.slug = slugger(this.title);
next()
})

module.exports=mongoose.model("Article",articleSchema);

