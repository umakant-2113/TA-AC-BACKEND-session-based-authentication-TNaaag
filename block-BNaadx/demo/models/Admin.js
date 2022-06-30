let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let Schema = mongoose.Schema;

let adminSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String },
});

adminSchema.pre('save', function (next) {
  if (this.password && this.isModified('password')) {
    bcrypt.hash(this.password, 10, (err, result) => {
      if (err) return next(err);
      this.password = result;
      return next();
    });
  } else {
    next();
  }
});

adminSchema.methods.verrifyPassword=function(password,cb){
    bcrypt.compare(password,this.password,(err,result)=>{
        return cb(err,result);
    })
}

module.exports = mongoose.model('Admin', adminSchema);
