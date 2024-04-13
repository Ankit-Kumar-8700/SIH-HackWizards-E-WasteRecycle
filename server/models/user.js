import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    address:{
        type:String,
    },
    isVerified: {
        type:Boolean,
        default:false
    },
    verificationToken : {
        type : String
    },
    role:{
        type:String,
        required : true
    },
    credits:{
        type:Number,
        default:0
    },
    city:{
        type:String,
        required:true
    },
    latitude:String,
    longitude:String,
    phone : {
        type:String,
    }
})



UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })



UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, role: this.role, name : this.name,city : this.city, lat : this.latitude, lon:this.longitude }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch;
  }




const User = new mongoose.model('User',UserSchema);
export default User;