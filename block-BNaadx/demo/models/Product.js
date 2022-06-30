let mongoose=require("mongoose");
let Schema=mongoose.Schema;


let productSchema = new Schema({
product:{type:String,required:true},
quantity:Number,
price:Number,
image:String,
likes:{type:Number,default:0},
comment:[{type:Schema.Types.ObjectId, ref: "Comment"}]
})

module.exports=mongoose.model("Product",productSchema);