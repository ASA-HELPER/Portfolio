import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js"
import ErrorHandler from "../middlewares/error.js";
import {Timeline} from '../models/timelineSchema.js'

export const postTimeline = catchAsyncErrors(async (req, resp, next) => {
    const {title,decription,from,to} = req.body;
    const newTimeline = await Timeline.create({
        title,
        decription,
        timeline:{from,to}
    });
    resp.status(200).json({
        success:true,
        message:"Timeline Added",
        newTimeline,
    })
})

export const deleteTimeline = catchAsyncErrors(async (req, resp, next) => {
    const {id} = req.params;
    const timeline = await Timeline.findById(id);
    if(!timeline){
        return next(new ErrorHandler("Timeline not found!",404));
    }
    await timeline.deleteOne();
    resp.status(200).json({
        success:true,
        message:"Timeline Deleted!",
    })
})

export const getAllTimelines = catchAsyncErrors(async (req, resp, next) => {
    const timelines = await Timeline.find();
    resp.status(200).json({
        success:true,
        timelines,
    })
})
