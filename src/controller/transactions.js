const Transaction=require('../models/Transactions')

const getTransactions=async(req,res,next)=>{
    try{
        const transactions=await Transaction.find()

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
        const transaction=await Transaction.create(req.body)

        return res.status(201).json({
            success:true,
            data:transaction
        })

    }catch(e){
        if(e.name==='ValidationError'){
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
        const transaction=await Transaction.findById(req.params.id)
        if(!transaction){
            return res.status(404).json({
                success:false,
                error:'No transaction found'
            })
        }
        await transaction.remove()
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