const mongoose=require('mongoose')
require('dotenv').config({path: './config/dev.env'})

const connectDB=async ()=>{
    try{            
        const conn=await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser:true,
            useCreateIndex:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        })
        console.log(`MongoDB connected at ${conn.connection.host}`.cyan.underline.bold)
    }catch(e){
        console.log(`Cannot connect MongoDB ${e}`.red.bold)
    }
}
module.exports= connectDB