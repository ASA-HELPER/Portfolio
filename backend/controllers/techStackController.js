import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"
import ErrorHandler from "../middlewares/error.js";
import {TechStack} from '../models/techStackSchema.js'
import {v2 as cloudinary} from "cloudinary";

export const addNewApplication = catchAsyncErrors(async(req,resp,next)=>{
    if(!req.files || Object.keys(req.files).length===0){
        return next(new ErrorHandler("Tech Stack image is required!",400));
    }
    
    const {image} = req.files;
    const {name} = req.body;
    
    if(!name){
        return next(new ErrorHandler("Tech Stack name is required!",400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        image.tempFilePath,
        {folder:"PORTFOLIO_TECH_STACK"}
    )
    
    if(!cloudinaryResponse || cloudinaryResponse.error)
    {
        console.error(
            "Cloudinary Error:",
            cloudinaryResponse.error ||"Unknown Cloudinary Error"
        )
    }

    const techStack = await TechStack.create({
        name,
        image:{
            public_id:cloudinaryResponse.public_id,
            url:cloudinaryResponse.secure_url
        }
    })
    resp.status(201).json({
        success:true,
        techStack,
        message:"New Tech Stack is added"
    })
})


export const getAllApplications = catchAsyncErrors(async(req,resp,next)=>{
    const techStacks = await TechStack.find();
    resp.status(200).json({
        success:true,
        techStacks,
    })
})


export const deleteApplications = catchAsyncErrors(async(req,resp,next)=>{
    const {id} = req.params;
    const techStack = await TechStack.findById(id);

    if(!techStack)
    {
        return next(new ErrorHandler("Tech Stack not found!",404))
    }
    
    const techStackImageId = techStack.image.public_id;
    await cloudinary.uploader.destroy(techStackImageId);
    await techStack.remove();
    resp.status(200).json({
        success:true,
        message:"Tech Stack is deleted",
    })
})