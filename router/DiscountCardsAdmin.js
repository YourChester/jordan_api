const Router = require('express')
const router = new Router()

const DiscountCardController = require('../controller/DiscountCardController')

router.get('/', DiscountCardController.adminIndex)
router.post('/', DiscountCardController.adminCreate)
router.get('/:id', DiscountCardController.adminShow)
router.put('/:id', DiscountCardController.adminUpdate)
router.delete('/:id', DiscountCardController.adminDelete)

module.exports = router