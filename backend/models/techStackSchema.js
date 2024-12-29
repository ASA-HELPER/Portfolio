import mongoose from "mongoose";

const techStackSchema = new mongoose.Schema({
    name:String,
    image:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    }
})

export const TechStack = mongoose.model("TechStack",techStackSchema)