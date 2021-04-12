const router=require('express').Router()

const {getTransactions,addTransactions,deleteTransactions}=require('../controller/transactions')

router.route('/transactions').get(getTransactions)
router.route('/add').post(addTransactions)
router.route('/delete/:id').delete(deleteTransactions)

module.exports=router