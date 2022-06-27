const { default: mongoose } = require("mongoose");
let express=require("mongoose");
let Schema=mongoose.Schema;

let commentSchema= new Schema({
    text:{type:String},
    author:String,
    likes:{type:Number,default:0},
    articleId : {type : Schema.Types.ObjectId, ref: "Article" }
})
module.exports=mongoose.model("Comment", commentSchema)
