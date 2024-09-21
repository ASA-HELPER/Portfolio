import mongoose from "mongoose"

const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"PORTFOLIO"
    }).then(()=>{
        console.log("Database connection successful.".bgGreen.white);
    }).catch((error)=>{
        console.log(`Some Error occurred while connecting to ${error} database`.bgRed.white);
    });
}

export default dbConnection;