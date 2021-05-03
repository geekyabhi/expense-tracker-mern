const express=require('express')
const dotenv=require('dotenv')
const colors=require('colors')
const morgan=require('morgan')
const cors=require('cors')

const connectDB=require('./src/db/mongoose')
dotenv.config({path:'./config/dev.env'})

connectDB()
const PORT=process.env.PORT||5000


const app=express()
app.use(cors())
app.use(express.json())

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

const transactionRoutes=require('./src/routes/transactionRoutes')
const userRoutes=require('./src/routes/userRoutes')
app.use('/api/users',userRoutes)
app.use('/api/transactions',transactionRoutes)

app.listen(PORT,()=>{console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)})