let mongoose=require("mongoose");
let Schema=mongoose.Schema;

let CommentSchema=new Schema({
    content:{type:String,required:true},
    author:String,
    likes:{type:Number,default:0},
    productId:{type:Schema.Types.ObjectId}
})


module.exports=mongoose.model("Comment",CommentSchema)