const Router = require('express')
const router = new Router()
const roleMiddleware = require('../middleware/ruleMiddleware')

const SellerController = require('../controller/SellerController')

router.get('/', roleMiddleware(['admin', 'manager']), SellerController.adminIndex)
router.post('/', roleMiddleware(['admin']), SellerController.adminCreate)
router.get('/:id', roleMiddleware(['admin']), SellerController.adminShow)
router.put('/:id', roleMiddleware(['admin']), SellerController.adminUpdate)
router.delete('/:id', roleMiddleware(['admin']), SellerController.adminDelete)

module.exports = router