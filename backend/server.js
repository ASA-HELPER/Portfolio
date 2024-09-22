import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import dbConnection from './database/dbConnection.js';
import cloudinary from 'cloudinary';
import {errorMiddleware} from './middlewares/error.js'
import messageRouter from "./router/messageRoutes.js"
import userRouter from "./router/userRoutes.js"

const app = express();
dotenv.config({path:"./config/config.env"});

// middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: [process.env.PORTFOLIO_URL,process.env.DASHBOARD_URL],
    methods:["GET","POST","DELETE","PUT"],
    credentials: true
}))
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}))

// Routers
app.use("/api/v1/message",messageRouter);
app.use("/api/v1/user",userRouter);

// Database Connection
dbConnection();

// custom middlewares
app.use(errorMiddleware)

// cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.listen(process.env.PORT,()=>{
    console.log(`Server listening at port ${process.env.PORT}.`.bgCyan.white);
})

export default app;