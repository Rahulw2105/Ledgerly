const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const {Schema} = mongoose ;

const userSchema = Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,lowercase:true,trim:true},
    password:{type:String,minLength:8},
    businessName:{type:String},
    gstIn:{type:String},
    profilePhoto:{type:String},
    plan:{type:String , enum:['free','solo','pro'],default:'free'},
    isEmailverified:{type:Boolean,default:false},
    refreshToken:{type:String},
} ,{timestamps:true})

userSchema.pre('save', async function() {
    if(!this.isModified("password") ) return ;
     const saltRounds = 10;


     return this.password = await bcrypt.hash(this.password,saltRounds);
     
})


userSchema.methods.comparePassword = async function(enteredPassword) {
      return  await bcrypt.compare(enteredPassword,this.password);
    
}

module.exports = mongoose.model("User",userSchema);
