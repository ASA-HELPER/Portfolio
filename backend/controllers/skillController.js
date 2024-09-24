import { catchAsyncErrors } from './../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/error.js';
import {Skill} from "../models/skillSchema.js";
import {v2 as cloudinary} from "cloudinary";

export const addNewSkill = catchAsyncErrors(async(req,resp,next)=>{
    if(!req.files || Object.keys(req.files).length===0){
        return next(new ErrorHandler("Skill image is required!",400));
    }
    
    const {image} = req.files;
    const {title,proficiency} = req.body;
    
    if(!title || !proficiency){
        return next(new ErrorHandler("Please fill all fields values!",400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        image.tempFilePath,
        {folder:"PORTFOLIO_SKILL"}
    )
    
    if(!cloudinaryResponse || cloudinaryResponse.error)
    {
        console.error(
            "Cloudinary Error:",
            cloudinaryResponse.error ||"Unknown Cloudinary Error"
        )
    }

    const skill = await Skill.create({
        title,
        proficiency,
        image:{
            public_id:cloudinaryResponse.public_id,
            url:cloudinaryResponse.secure_url
        }
    })
    resp.status(201).json({
        success:true,
        skill,
        message:"New skill is added"
    })
})


export const getAllSkills = catchAsyncErrors(async(req,resp,next)=>{
    const skills = await Skill.find();
    resp.status(200).json({
        success:true,
        skills,
    })
})


export const deleteSkill = catchAsyncErrors(async(req,resp,next)=>{
    const {id} = req.params;
    const skill = await Skill.findById(id);

    if(!skill)
    {
        return next(new ErrorHandler("Skill not found!",404))
    }
    
    const skillImageId = techStack.image.public_id;
    await cloudinary.uploader.destroy(skillImageId);
    await skill.deleteOne();
    resp.status(200).json({
        success:true,
        message:"Skill is deleted",
    })
})


export const updateSkill = catchAsyncErrors(async(req,resp,next)=>{
    const {id} = req.params;
    let skill = await Skill.findById(id);

    if(!skill)
    {
        return next(new ErrorHandler("Skill not found!",404))
    }

    const {proficiency} = req.body;
    skill = await Skill.findByIdAndUpdate(id,{proficiency},{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })

    resp.status(200).json({
        success:true,
        skill,
        message:"Skill is updated",
    })
})