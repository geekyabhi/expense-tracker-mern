const router=require('express').Router()
const { protect } = require('../middleware/authMiddleware')
const {getTransactions,addTransactions,deleteTransactions}=require('../controller/transactions')

router.route('/').get(protect,getTransactions)
router.route('/').post(protect,addTransactions)
router.route('/:id').delete(protect,deleteTransactions)

module.exports=router