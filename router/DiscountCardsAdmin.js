const Router = require('express')
const router = new Router()
const roleMiddleware = require('../middleware/ruleMiddleware')

const DiscountCardController = require('../controller/DiscountCardController')

router.get('/', roleMiddleware(['admin', 'manager']), DiscountCardController.adminIndex)
router.get('/new-code', roleMiddleware(['admin', 'manager']), DiscountCardController.adminGenerateNewCode)
router.post('/', roleMiddleware(['admin', 'manager']), DiscountCardController.adminCreate)
router.get('/:id', roleMiddleware(['admin', 'manager']), DiscountCardController.adminShow)
router.put('/:id', roleMiddleware(['admin', 'manager']), DiscountCardController.adminUpdate)
router.delete('/:id', roleMiddleware(['admin', 'manager']), DiscountCardController.adminDelete)

module.exports = router