import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide a nmae"],
        minlength:3,
        maxlength:50
    },
    email:{
        type:String,
        required:[true,"Please provide a email"],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'please provide a valid email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please provide a password"],
        minlength:6,
        maxlength:12
    }
},{
    collection:'users',
    versionKey:false
})
// hash the password
userSchema.pre('save', async function (){
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password,salt)  
})

// genrate the token
userSchema.methods.createJWT = function () {
    return jwt.sign({userId:this._id,name:this.name},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})
}

// compare the password

userSchema.methods.comparePassword = async function (candidatePassword){
    const match = await bcrypt.compare(candidatePassword,this.password)
    return match
}


const userModel = mongoose.model('users',userSchema);

export default userModel;