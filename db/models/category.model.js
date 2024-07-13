import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        minLength:[2,"title is too short"],
        trim: true,
        unique:true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required:true
    }


},{
    timestamps:true
})

const categoryModel = mongoose.model("Category",categorySchema)
export default categoryModel