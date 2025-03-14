const mongoose = require("mongoose");

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGOURL);
        console.log("mongoDB connected");
    }catch(error){
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;