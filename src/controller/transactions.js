const Transaction=require('../models/TransactionsModel')

const getTransactions=async(req,res,next)=>{
    try{
        const user=req.user._id
        const transactions=await Transaction.find({user})

        res.status(200).json({
            success:true,
            count:transactions.length,
            data:transactions
        })
    }catch(e){
        console.log(`Error occured ${e}`)
        return res.status(500).json({
            success:false,
            error:e
        })
    }
}

const addTransactions=async(req,res,next)=>{
    try{
        const {text,amount} = req.body
        const user=req.user._id
        const transaction=await Transaction.create({text,amount,user})

        return res.status(201).json({
            success:true,
            data:transaction
        })

    }catch(e){
        if(e.name==='ValidationError'){
            console.log(e)
            const messages=Object.values(e.errors).map(val=>val.message)
            res.status(400).json({
                success:false,
                error:messages
            })

        }else{        
            console.log(`Error occured ${e}`)
            return res.status(500).json({
                success:false,
                error:e
            })
        }
    }
}

const deleteTransactions=async(req,res,next)=>{
    try{
        const user=req.user._id
        const transaction=await Transaction.find({user,_id:req.params.id})
        if(!transaction){
            return res.status(404).json({
                success:false,
                error:'No transaction found'
            })
        }
        await Transaction.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success:true,
            data:transaction
        })
    }catch(e){
        console.log(`Error occured ${e}`)
            return res.status(500).json({
                success:false,
                error:e
            })
    }
}

module.exports={getTransactions,addTransactions,deleteTransactions}