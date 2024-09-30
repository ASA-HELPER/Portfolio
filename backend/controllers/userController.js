import { catchAsyncErrors } from './../middlewares/catchAsyncErrors.js';
import ErrorHandler from '../middlewares/error.js';
import {User} from "../models/userSchema.js";
import {v2 as cloudinary} from "cloudinary";
import { generateToken } from '../utils/jwtToken.js';
import { sendEmail } from '../utils/sendEmail.js';
import crypto from 'crypto';

export const register = catchAsyncErrors(async(req,resp,next)=>{
    if(!req.files || Object.keys(req.files).length===0){
        return next(new ErrorHandler("Avatar and Resume are required!",400));
    }
    const {avatar,resume} = req.files;
    const cloudinaryResponseForAvatar = await cloudinary.uploader.upload(
        avatar.tempFilePath,
        {folder:"AVATARS"}
    )
    if(!cloudinaryResponseForAvatar || cloudinaryResponseForAvatar.error)
    {
        console.error(
            "Cloudinary Error:",
            cloudinaryResponseForAvatar.error ||"Unknown Cloudinary Error"
        )
    }
    const cloudinaryResponseForResume = await cloudinary.uploader.upload(
        resume.tempFilePath,
        {folder:"MY_RESUME"}
    )
    if(!cloudinaryResponseForResume || cloudinaryResponseForResume.error)
    {
        console.error(
            "Cloudinary Error:",
            cloudinaryResponseForResume.error ||"Unknown Cloudinary Error"
        )
    }
    const {fullName,email,phone,aboutMe,password,portfolioURL,githubURL,facebookURL,instagramURL,twitterURL,linkedInURL} = req.body;
    const user = await User.create({fullName,email,phone,aboutMe,password,portfolioURL,githubURL,facebookURL,instagramURL,twitterURL,linkedInURL,
        avatar:{
            public_id:cloudinaryResponseForAvatar.public_id,
            url:cloudinaryResponseForAvatar.secure_url,
        },
        resume:{
            public_id:cloudinaryResponseForResume.public_id,
            url:cloudinaryResponseForResume.secure_url,
        },
    });
    generateToken(user,"User Registered!",201,resp);
})

export const login = catchAsyncErrors(async(req,resp,next)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return next(new ErrorHandler("Email and Password are required!",400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user)
    {
        return next(new ErrorHandler("Invalid Email or Password!",401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched)
    {
        return next(new ErrorHandler("Invalid Email or Password!",401));
    }
    generateToken(user,"User logged in!",200,resp);
})


export const logout = catchAsyncErrors(async(req,resp,next)=>{
    resp.status(200).cookie("token","",{
        expires:new Date(Date.now()),
    }).json({
        success:true,
        message:"Logged out successfully",
    })
})

export const getUser = catchAsyncErrors(async(req,resp,next)=>{
    const user = await User.findById(req.user.id);
    resp.status(200).json({
        success:true,
        user,
    })
});

export const updateProfile = catchAsyncErrors(async(req,resp,next)=>{
    const newUserData = {
        fullName:req.body.fullName,
        email:req.body.email,
        phone:req.body.phone,
        aboutMe:req.body.aboutMe,
        portfolioURL:req.body.portfolioURL,
        githubURL:req.body.githubURL,
        facebookURL:req.body.facebookURL,
        instagramURL:req.body.instagramURL,
        twitterURL:req.body.twitterURL,
        linkedInURL:req.body.linkedInURL,
    };
    if(req.files && req.files.avatar)
    {
        const avatar = req.files.avatar;
        const user = await User.findById(req.body.id);
        const profileImageId = user.avatar.public_id;
        await cloudinary.uploader.destroy(profileImageId);
        const newProfileImage = await cloudinary.uploader.upload(
            avatar.tempFilePath,
            {
              folder: "AVATARS",
            }
          );
        newUserData.avatar = {
            public_id: newProfileImage.public_id,
            url: newProfileImage.secure_url,
        };
    }
      
    if (req.files && req.files.resume) {
        const resume = req.files.resume;
        const user = await User.findById(req.user.id);
        const resumeFileId = user.resume.public_id;
        if (resumeFileId) {
            await cloudinary.uploader.destroy(resumeFileId);
        }
        const newResume = await cloudinary.uploader.upload(resume.tempFilePath, {
            folder: "MY_RESUME",
        });
        newUserData.resume = {
            public_id: newResume.public_id,
            url: newResume.secure_url,
        };
    }
    const user = await User.findByIdAndUpdate(req.body.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify:false,
    });
    resp.status(200).json({
        success:true,
        message:"Profile Updated!",
        user
    })
})

export const updatePassword = catchAsyncErrors(async(req,resp,next)=>{
    const {currentPassword,newPassword,confirmNewPassword} = req.body;
    if(!currentPassword || !newPassword || !confirmNewPassword){
        return next(new ErrorHandler("Please fill all fields!"))
    }
    const user = await User.findById(req.body.id).select("+password");
    const isPasswordMatched = await User.comparePassword(currentPassword);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Current password is incorrect!"))
    }
    if(newPassword !== confirmNewPassword){
        return next(new ErrorHandler("New password and confirm new password does not match!"))
    }
    user.password = newPassword;
    await user.save();
    resp.status(200).json({
        success:true,
        message:"Password updated!"
    })
})

export const getUserForPortfolio = catchAsyncErrors(async(req,resp,next)=>{
    const id = `${process.env.USER_MONGO_ID}`;
    const user = await User.findById(id);
    resp.status(200).json({
        success:true,
        user,
    })
})

export const forgotPassword = catchAsyncErrors(async(req,resp,next)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHandler("user not found",404));
    }
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});
    const resetPasswordUrl = `${process.env.DASHBOARD_URL}/password/rest/${resetToken}`;
    const message = `Your reset password token is: \n\n ${resetPasswordUrl} \n\n If you have not requested for this, please ignore it.`
    try {
        await sendEmail({
            email:user.email,
            subject:"Personal Portfolio Dashboard Recovery Password",
            message,
        })
        resp.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
        })
    } catch (error) {
        user.resetPasswordExpire = undefined
        user.resetPasswordToken = undefined
        await user.save();
        return next(new ErrorHandler(error.message,500));
    }
})

export const resetPassword = catchAsyncErrors(async(req,resp,next)=>{
    const {token} = req.params;
    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},
    })
    if(!user)
    {
        return next(new ErrorHandler("Reset password token in invalid or has been expired",400))
    }
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password and confirm password does not match",400))
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    generateToken(user,"Reset password successfully!",200,resp);
})