import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js"
import ErrorHandler from "../middlewares/error.js"
import {Message} from '../models/messageSchema.js'

export const sendMessage = catchAsyncErrors(async(req,resp,next)=>{
    const {senderName,subject,message} = req.body;
    if(!senderName || !subject || !message)
    {
        return next(new ErrorHandler("Please fill full form",400));
    }
    const data = await Message.create({senderName,subject,message});
    resp.status(200).json({
        success:true,
        message:"Message Sent",
        data,
    })
})

export const getAllMessages = catchAsyncErrors(async(req,resp,next)=>{
    const messages = await Message.find();
    resp.status(200).json({
        success:true,
        messages,
    })
})

export const deleteMessage = catchAsyncErrors(async(req,resp,next)=>{
    const {id} = req.params;
    const message = await Message.findById(id);
    if(!message){
        return next(new ErrorHandler("Message already deleted.",400))
    }
    await message.deleteOne();
    resp.status(200).json({
        success:true,
        message:"Message Deleted",
    })
})