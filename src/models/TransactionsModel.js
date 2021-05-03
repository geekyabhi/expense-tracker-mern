const mongoose=require('mongoose')
const User=require('./UsersModel')
const TransactionSchema =new mongoose.Schema({
    text:{type:String,trim:true,required:[true,'Please add some text']},
    amount:{type:Number,required:[true,'Please add a positive or negative number']},
    created:{type:Date,default:Date.now},
    user:{type:mongoose.Schema.Types.ObjectId,required: true,ref: 'User'}
})

const Transaction=mongoose.model('Transaction',TransactionSchema)
module.exports=Transaction