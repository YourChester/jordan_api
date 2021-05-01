const Router = require('express')
const router = new Router()

const SellerController = require('../controller/SellerController')

router.get('/', SellerController.adminIndex)
router.post('/', SellerController.adminCreate)
router.get('/:id', SellerController.adminShow)
router.put('/:id', SellerController.adminUpdate)
router.delete('/:id', SellerController.adminDelete)

module.exports = router