import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        minLength:[2,"title is too short"],
        trim: true,
    },
    email:{
        type:String,
        required: true,
        trim: true,
        unique:true
    },
    password: {
        type:String,
        required: true,
    }, 
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },

},{
    timestamps:true
})

userSchema.pre('save',function(){
    this.password= bcrypt.hashSync(this.password,parseInt(process.env.ROUND))
})
const userModel = mongoose.model("User",userSchema)
export default userModel