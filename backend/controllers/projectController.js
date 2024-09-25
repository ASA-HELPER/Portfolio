import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"
import ErrorHandler from "../middlewares/error.js"
import {Project} from "../models/projectSchema.js"

export const addNewProject = catchAsyncErrors(async (req, resp, next) => {
    if(!req.files || Object.keys(req.files).length===0){
        return next(new ErrorHandler("Project image is required!",400));
    }
    
    const {image} = req.files;
    const {title,description,gitRepoLink,projectLink,technologies,stack,deployed} = req.body;
    
    if(!title || !description || !gitRepoLink || !projectLink || !technologies || !stack || !deployed){
        return next(new ErrorHandler("Please fill all fields values!",400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        image.tempFilePath,
        {folder:"PORTFOLIO_PROJECT"}
    )
    
    if(!cloudinaryResponse || cloudinaryResponse.error)
    {
        console.error(
            "Cloudinary Error:",
            cloudinaryResponse.error ||"Unknown Cloudinary Error"
        )
        return next(new ErrorHandler("Failed to upload project image to cloudinary.",400));
    }

    const project = await Project.create({
        title,description,gitRepoLink,projectLink,technologies,stack,deployed,
        image:{
            public_id:cloudinaryResponse.public_id,
            url:cloudinaryResponse.secure_url
        }
    })
    resp.status(201).json({
        success:true,
        project,
        message:"New project is added"
    })
})


export const getAllProjects = catchAsyncErrors(async (req, resp, next) => {
    const projects = await Project.find();
    resp.status(200).json({
        success:true,
        projects
    })
})


export const deleteProject = catchAsyncErrors(async (req, resp, next) => {
    const {id} = req.params;
    const project = await Project.findById(id);
    if(!project){
        return next(new ErrorHandler("Project not found!",404))
    }
    await project.deleteOne();
    resp.status(200).json({
        success:true,
        message:"Project is deleted"
    })
})


export const updateProject = catchAsyncErrors(async (req, resp, next) => {
    const newProjectData = {
        title: req.body.title,
        description: req.body.description,
        gitRepoLink: req.body.gitRepoLink,
        projectLink: req.body.projectLink,
        technologies: req.body.technologies,
        stack: req.body.stack,
        deployed: req.body.deployed,
    }

    if(!title || !description || !gitRepoLink || !projectLink || !technologies || !stack || !deployed){
        return next(new ErrorHandler("Please fill all fields values!",400));
    }

    if(req.files && req.files.image)
    {
        const image = req.files.image;
        const project = await Project.findById(req.params.id);
        const projectImageId = project.image.public_id;
        await cloudinary.uploader.destroy(projectImageId);
        const newProjectImage = await cloudinary.uploader.upload(
            image.tempFilePath,
            {
                folder: "PORTFOLIO_PROJECT",
            }
        );
        newProjectData.image = {
            public_id: newProjectImage.public_id,
            url: newProjectImage.secure_url,
        };
    }

    const project = await Project.findByIdAndUpdate(req.params.id,newProjectData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    resp.status(200).json({
        success:true,
        message:"Project is updated",
        project,
    })
})


export const getSingleProject = catchAsyncErrors(async (req, resp, next) => {
    const {id} = req.params;
    const project = await Project.findById(id);
    if(!project){
        return next(new ErrorHandler("Project not found!",404))
    }
    resp.send(200).json({
        success:true,
        project,
    })
})
